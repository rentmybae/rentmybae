import { z } from "zod";
import { isAdult } from "./age";
import { COUNTRIES, toE164 } from "./countries";
import { siteConfig } from "./config";

export const passwordSchema = z.string()
  .min(10, "Use at least 10 characters")
  .max(128, "Use at most 128 characters")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/\d/, "Include a number");

export const signupSchema = z.object({
  countryCode: z.enum(COUNTRIES.map(c => c.code) as [string, ...string[]], { message: "Choose a country code" }),
  mobile: z.string().trim().min(1, "Enter your mobile number"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(254),
  password: passwordSchema,
  confirmPassword: z.string(),
  fullName: z.string().trim().min(2, "Enter your full legal name").max(80),
  dob: z.string().refine(v => isAdult(v), "You must be 18 or older to register"),
  city: z.enum(siteConfig.cities.map(c => c.slug) as [string, ...string[]], { message: "Choose a supported city" }),
  pinCode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  gender: z.enum(["female", "male", "non-binary", "prefer-not-to-say"]).optional(),
  accountIntent: z.enum(["customer", "companion", "both"], { message: "Choose an account type" }),
  acceptTerms: z.literal("on", { message: "You must accept the Terms and Privacy Policy" })
}).superRefine((v, ctx) => {
  if (v.password !== v.confirmPassword) ctx.addIssue({ code: "custom", path: ["confirmPassword"], message: "Passwords do not match" });
  if (!toE164(v.countryCode, v.mobile)) ctx.addIssue({ code: "custom", path: ["mobile"], message: "Enter a valid mobile number for the selected country" });
});

export const resetSchema = z.object({ password: passwordSchema, confirmPassword: z.string() })
  .refine(v => v.password === v.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address");

/** Accepts email or mobile; returns a normalised credential or null. */
export function parseIdentifier(raw: string): { email: string } | { phone: string } | null {
  const v = raw.trim();
  if (v.includes("@")) { const e = emailSchema.safeParse(v); return e.success ? { email: e.data } : null; }
  const compact = v.replace(/[\s-]/g, "");
  if (/^\+\d{7,15}$/.test(compact)) return { phone: compact };
  const p = toE164("+91", compact.replace(/^0/, ""));
  return p ? { phone: p } : null;
}

export const safeNext = (n: unknown, fallback = "/dashboard") =>
  typeof n === "string" && n.startsWith("/") && !n.startsWith("//") && !n.includes("\\") ? n : fallback;

export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of err.issues) { const k = String(i.path[0] ?? "form"); if (!out[k]) out[k] = i.message; }
  return out;
}
