"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/ratelimit";
import { emailSchema, fieldErrors, parseIdentifier, resetSchema, safeNext, signupSchema } from "@/lib/validation";
import { toE164 } from "@/lib/countries";
import { siteConfig } from "@/lib/config";
import type { FormState } from "@/lib/form-state";

const NOT_CONFIGURED: FormState = { message: "Accounts are not available yet: the authentication service is not configured." };
const TOO_MANY: FormState = { message: "Too many attempts. Please wait a minute and try again." };

async function ip() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  if (!supabaseConfigured()) return NOT_CONFIGURED;
  const identifier = String(fd.get("identifier") ?? "");
  const password = String(fd.get("password") ?? "");
  const cred = parseIdentifier(identifier);
  const who = await ip();
  if (!rateLimit(`login:ip:${who}`, 10, 60_000).ok || !rateLimit(`login:id:${identifier.toLowerCase()}`, 5, 60_000).ok) return TOO_MANY;
  if (!cred || !password) return { errors: { identifier: "Enter a valid email or mobile number", ...(password ? {} : { password: "Enter your password" }) } };
  const sb = await createClient();
  const { error } = await sb.auth.signInWithPassword({ ...cred, password });
  // One generic message: never reveal whether the account exists.
  if (error) return { message: "Incorrect email/mobile or password." };
  redirect(safeNext(fd.get("next")));
}

export async function signup(_: FormState, fd: FormData): Promise<FormState> {
  if (!supabaseConfigured()) return NOT_CONFIGURED;
  if (!rateLimit(`signup:ip:${await ip()}`, 5, 10 * 60_000).ok) return TOO_MANY;
  const parsed = signupSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };
  const v = parsed.data;
  const sb = await createClient();
  const { error } = await sb.auth.signUp({
    email: v.email, password: v.password,
    options: {
      emailRedirectTo: `${siteConfig.url}/auth/callback?next=/dashboard`,
      // The DB trigger re-validates age and only ever grants customer/companion roles.
      data: { full_name: v.fullName, dob: v.dob, mobile_e164: toE164(v.countryCode, v.mobile), city: v.city,
              pin_code: v.pinCode, gender: v.gender ?? null, account_intent: v.accountIntent }
    }
  });
  if (error && !/registered|exists/i.test(error.message)) {
    return { message: /age|18/i.test(error.message) ? "You must be 18 or older to register." : "We couldn't create your account. Please check your details and try again." };
  }
  // Same response whether or not the email already existed (prevents account enumeration).
  return { ok: true, message: "If this email can be registered, we've sent a confirmation link. Open it to verify your email, then log in. Mobile and identity verification are completed from your dashboard." };
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
