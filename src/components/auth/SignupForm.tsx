"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/app/(site)/(auth)/actions";
import { COUNTRIES } from "@/lib/countries";
import { siteConfig } from "@/lib/config";
import { initialState } from "@/lib/form-state";
import { Field, FormMessage, PasswordField, SelectField } from "../Field";

export default function SignupForm() {
  const [s, action, pending] = useActionState(signup, initialState);
  const e = s.errors ?? {};
  if (s.ok) return <FormMessage ok message={s.message} />;
  const maxDob = new Date(Date.now() - 18 * 365.25 * 864e5).toISOString().slice(0, 10);
  return (
    <form action={action} className="space-y-4" noValidate>
      <FormMessage message={s.message} />
      <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
        <SelectField label="Country code" name="countryCode" defaultValue="+91" error={e.countryCode}>
          {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.iso} {c.code}</option>)}
        </SelectField>
        <Field label="Mobile number" name="mobile" type="tel" inputMode="tel" autoComplete="tel-national" required error={e.mobile} />
      </div>
      <Field label="Email address" name="email" type="email" autoComplete="email" required error={e.email} />
      <div className="grid gap-4 sm:grid-cols-2">
        <PasswordField label="Password" name="password" autoComplete="new-password" required error={e.password} hint="10+ characters with upper, lower case and a number" />
        <PasswordField label="Confirm password" name="confirmPassword" autoComplete="new-password" required error={e.confirmPassword} />
      </div>
      <Field label="Full legal name" name="fullName" autoComplete="name" required error={e.fullName} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date of birth" name="dob" type="date" max={maxDob} required error={e.dob} hint="You must be 18+. Your age is checked again during identity verification." />
        <SelectField label="Gender (optional)" name="gender" defaultValue="" error={e.gender}>
          <option value="">Prefer not to say</option><option value="female">Female</option><option value="male">Male</option><option value="non-binary">Non-binary</option>
        </SelectField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="City" name="city" defaultValue="" required error={e.city}>
          <option value="" disabled>Select city</option>
          {siteConfig.cities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </SelectField>
        <Field label="PIN code" name="pinCode" inputMode="numeric" maxLength={6} autoComplete="postal-code" required error={e.pinCode} />
      </div>
      <SelectField label="I want to" name="accountIntent" defaultValue="" required error={e.accountIntent}>
        <option value="" disabled>Choose account type</option>
        <option value="customer">Find a Companion</option><option value="companion">Become a Companion</option><option value="both">Both</option>
      </SelectField>
      <p className="text-xs text-brand-grey">All account types are subject to age eligibility, identity checks, platform rules and approval. Paying for membership does not guarantee approval.</p>
      <div>
        <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="acceptTerms" className="mt-1" required aria-invalid={!!e.acceptTerms} />
          <span>I am 18 or older and accept the <Link href="/terms-and-conditions" target="_blank" className="underline">Terms &amp; Conditions</Link> and <Link href="/privacy-policy" target="_blank" className="underline">Privacy Policy</Link>.</span></label>
        {e.acceptTerms && <p role="alert" className="mt-1 text-xs text-red-600">{e.acceptTerms}</p>}
      </div>
      <button type="submit" disabled={pending} className="btn-primary btn w-full">{pending ? "Creating account…" : "Create account"}</button>
      <p className="text-center text-sm text-brand-grey">Already registered? <Link href="/login" className="font-semibold text-brand-purple">Login</Link></p>
    </form>
  );
}
