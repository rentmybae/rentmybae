"use client";
import Link from "next/link";
import { useActionState } from "react";
import { forgotPassword, resetPassword } from "@/app/(site)/(auth)/actions";
import { initialState } from "@/lib/form-state";
import { Field, FormMessage, PasswordField } from "../Field";

export function ForgotForm() {
  const [s, action, pending] = useActionState(forgotPassword, initialState);
  if (s.ok) return <FormMessage ok message={s.message} />;
  return (
    <form action={action} className="space-y-4" noValidate>
      <FormMessage message={s.message} />
      <Field label="Email address" name="email" type="email" autoComplete="email" required error={s.errors?.email} />
      <button type="submit" disabled={pending} className="btn-primary btn w-full">{pending ? "Sending…" : "Send reset link"}</button>
      <p className="text-center text-sm"><Link href="/login" className="font-semibold text-brand-purple">Back to login</Link></p>
    </form>
  );
}

export function ResetForm() {
  const [s, action, pending] = useActionState(resetPassword, initialState);
  return (
    <form action={action} className="space-y-4" noValidate>
      <FormMessage message={s.message} />
      <PasswordField label="New password" name="password" autoComplete="new-password" required error={s.errors?.password} hint="10+ characters with upper, lower case and a number" />
      <PasswordField label="Confirm new password" name="confirmPassword" autoComplete="new-password" required error={s.errors?.confirmPassword} />
      <button type="submit" disabled={pending} className="btn-primary btn w-full">{pending ? "Saving…" : "Update password"}</button>
    </form>
  );
}
