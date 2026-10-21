"use client";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/(site)/(auth)/actions";
import { initialState } from "@/lib/form-state";
import { Field, FormMessage, PasswordField } from "../Field";

export default function LoginForm({ next }: { next?: string }) {
  const [s, action, pending] = useActionState(login, initialState);
  return (
    <form action={action} className="space-y-4" noValidate>
      <input type="hidden" name="next" value={next ?? ""} />
      <FormMessage message={s.message} />
      <Field label="Email or mobile number" name="identifier" autoComplete="username" required error={s.errors?.identifier} hint="For mobile, include the country code if not in India, e.g. +44…" />
      <PasswordField label="Password" name="password" autoComplete="current-password" required error={s.errors?.password} />
      <div className="text-right text-sm"><Link href="/forgot-password" className="font-medium text-brand-purple hover:underline">Forgot password?</Link></div>
      <button type="submit" disabled={pending} className="btn-primary btn w-full">{pending ? "Signing in…" : "Login"}</button>
      <p className="text-center text-sm text-brand-grey">New here? <Link href="/signup" className="font-semibold text-brand-purple">Create an account</Link></p>
      <p className="text-center text-xs text-brand-grey">By continuing you agree to our <Link href="/terms-and-conditions" className="underline">Terms</Link> and <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.</p>
    </form>
  );
}
