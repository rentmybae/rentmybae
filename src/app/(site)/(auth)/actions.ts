"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/ratelimit";
import { emailSchema, fieldErrors, loginSchema, resetSchema, safeNext, signupSchema } from "@/lib/validation";
import { toE164 } from "@/lib/countries";
import { siteConfig } from "@/lib/config";
import { echo, type FormState } from "@/lib/form-state";
import { LEGAL_VERSION } from "@/lib/legal-content";

const NOT_CONFIGURED: FormState = { message: "Accounts are not available yet: the authentication service is not configured." };
const TOO_MANY: FormState = { message: "Too many attempts. Please wait a minute and try again." };

async function ip() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/** Supabase password login is keyed on email. For mobile login we resolve the email server-side (service role, never exposed). */
async function emailForMobile(e164: string): Promise<string | null> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const { data, error } = await createAdminClient().rpc("email_for_mobile", { p_mobile: e164 });
  return error ? null : ((data as string | null) ?? null);
}

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  const values = echo(fd);
  if (!supabaseConfigured()) return { ...NOT_CONFIGURED, values };
  const parsed = loginSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values };
  const v = parsed.data;
  const idKey = v.method === "email" ? v.email : toE164(v.countryCode, v.mobile)!;
  const who = await ip();
  if (!rateLimit(`login:ip:${who}`, 10, 60_000).ok || !rateLimit(`login:id:${idKey}`, 5, 60_000).ok) return { ...TOO_MANY, values };

  let email: string | null = v.method === "email" ? v.email : null;
  if (v.method === "mobile") {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return { message: "Mobile login is not available right now. Please log in with your email.", values };
    email = await emailForMobile(idKey);
  }
  // Same generic message whether the account is missing or the password is wrong (no account enumeration).
  const GENERIC: FormState = { message: `Incorrect ${v.method === "email" ? "email" : "mobile number"} or password.`, values };
  if (!email) return GENERIC;
  const sb = await createClient();
  const { error } = await sb.auth.signInWithPassword({ email, password: v.password });
  if (error) {
    if (/confirm/i.test(error.message)) return { message: "Please verify your email first. Open the confirmation link we sent when you registered.", values };
    return GENERIC;
  }
  redirect(safeNext(fd.get("next")));
}

export async function signup(_: FormState, fd: FormData): Promise<FormState> {
  const values = echo(fd);
  if (!supabaseConfigured()) return { ...NOT_CONFIGURED, values };
  if (!rateLimit(`signup:ip:${await ip()}`, 5, 10 * 60_000).ok) return { ...TOO_MANY, values };
  const parsed = signupSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values, message: "Please fix the highlighted fields." };
  const v = parsed.data;
  const sb = await createClient();
  const now = new Date().toISOString();
  const { error } = await sb.auth.signUp({
    email: v.email, password: v.password,
    options: {
      emailRedirectTo: `${siteConfig.url}/auth/callback?next=/dashboard`,
      // The DB trigger re-validates age and only ever grants customer/companion roles.
      data: { full_name: v.fullName, dob: v.dob, mobile_e164: toE164(v.countryCode, v.mobile), city: v.city,
              pin_code: v.pinCode, gender: v.gender ?? null, account_intent: v.accountIntent,
              // Consent record (DPDP Act 2023): what was agreed, which version, and when.
              terms_version: LEGAL_VERSION, privacy_version: LEGAL_VERSION, terms_accepted_at: now,
              marketing_opt_in: v.marketingOptIn === "on", marketing_opt_in_at: v.marketingOptIn === "on" ? now : null }
    }
  });
  if (error && !/registered|exists/i.test(error.message)) {
    if (/age|18/i.test(error.message)) return { errors: { dob: "You must be 18 or older to register." }, values };
    if (/mobile|duplicate|unique|database error saving/i.test(error.message)) return { errors: { mobile: "This mobile number can't be used. Try logging in instead." }, values };
    if (/password/i.test(error.message)) return { errors: { password: "Choose a stronger password." }, values };
    return { message: "We couldn't create your account. Please check your details and try again.", values };
  }
  // Same response whether or not the email already existed (prevents account enumeration).
  return { ok: true, message: `We've sent a confirmation link to ${v.email}. Open it to verify your email, then log in. If you already have an account, just log in.` };
}

export async function forgotPassword(_: FormState, fd: FormData): Promise<FormState> {
  if (!supabaseConfigured()) return NOT_CONFIGURED;
  const who = await ip();
  const email = emailSchema.safeParse(fd.get("email"));
  if (!email.success) return { errors: { email: "Enter a valid email address" } };
  if (!rateLimit(`forgot:ip:${who}`, 5, 10 * 60_000).ok || !rateLimit(`forgot:id:${email.data}`, 3, 10 * 60_000).ok) return TOO_MANY;
  const sb = await createClient();
  await sb.auth.resetPasswordForEmail(email.data, { redirectTo: `${siteConfig.url}/auth/callback?next=/reset-password` });
  return { ok: true, message: "If an account exists for that email, a reset link is on its way. The link expires and can be used only once." };
}

export async function resetPassword(_: FormState, fd: FormData): Promise<FormState> {
  if (!supabaseConfigured()) return NOT_CONFIGURED;
  const parsed = resetSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { message: "This reset link is invalid or has expired. Please request a new one." };
  const { error } = await sb.auth.updateUser({ password: parsed.data.password });
  if (error) return { message: "We couldn't update your password. Request a new reset link and try again." };
  await sb.auth.signOut();
  redirect("/login?reset=1");
}

export async function logout() {
  if (supabaseConfigured()) { const sb = await createClient(); await sb.auth.signOut(); }
  redirect("/");
}
