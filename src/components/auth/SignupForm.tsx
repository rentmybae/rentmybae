"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Calendar, Check, Globe, Lock, Mail, MapPin, User } from "lucide-react";
import { signup } from "@/app/(site)/(auth)/actions";
import { COUNTRIES } from "@/lib/countries";
import { siteConfig } from "@/lib/config";
import { initialState } from "@/lib/form-state";
import { Field, FormMessage, PasswordField, SelectField } from "../Field";

const INTENTS = [
  { value: "customer", label: "Find a Companion" },
  { value: "companion", label: "Become a Companion" },
  { value: "both", label: "Both" }
] as const;

const RULES = [
  { test: (p: string) => p.length >= 10, label: "10+ characters" },
  { test: (p: string) => /[A-Z]/.test(p), label: "An uppercase letter" },
  { test: (p: string) => /[a-z]/.test(p), label: "A lowercase letter" },
  { test: (p: string) => /\d/.test(p), label: "A number" }
];

export default function SignupForm() {
  const [s, action, pending] = useActionState(signup, initialState);
  const e = s.errors ?? {};
  const v = s.values ?? {};
  const [cc, setCc] = useState(v.countryCode ?? "+91");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [intent, setIntent] = useState(v.accountIntent ?? "customer");

  if (s.ok) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700"><Mail size={26} aria-hidden="true" /></div>
        <h2 className="text-xl font-bold">Check your email</h2>
        <p className="text-sm text-brand-grey">{s.message}</p>
        <Link href="/login" className="btn-primary btn w-full !rounded-xl">Go to login</Link>
      </div>
    );
  }

  const maxDob = new Date(Date.now() - 18 * 365.25 * 864e5).toISOString().slice(0, 10);
  const mismatch = pw2.length > 0 && pw !== pw2;

  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage message={s.message} />

      <SelectField label="Country" name="countryCode" value={cc} onChange={ev => setCc(ev.target.value)} icon={<Globe size={18} />} required error={e.countryCode}>
        {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
      </SelectField>

      <Field label="Mobile number" name="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" prefix={cc}
        placeholder="Enter mobile number" defaultValue={v.mobile} required error={e.mobile}
        hint={cc === "+91" ? "India: 10-digit number only" : "Number without the country code"} />

      <Field label="Email" name="email" type="email" autoComplete="email" icon={<Mail size={18} />}
        placeholder="your@email.com" defaultValue={v.email} required error={e.email} />

      <div>
        <PasswordField label="Password" name="password" autoComplete="new-password" icon={<Lock size={18} />}
          placeholder="Create a strong password" required error={e.password} value={pw} onChange={ev => setPw(ev.target.value)} />
        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs" aria-label="Password requirements">
          {RULES.map(r => {
            const ok = r.test(pw);
            return <li key={r.label} className={`flex items-center gap-1 ${ok ? "text-green-700" : "text-brand-grey"}`}>
              <Check size={13} aria-hidden="true" className={ok ? "" : "opacity-30"} />{r.label}<span className="sr-only">{ok ? " (met)" : " (not met)"}</span>
            </li>;
          })}
        </ul>
      </div>

      <PasswordField label="Confirm password" name="confirmPassword" autoComplete="new-password" icon={<Lock size={18} />}
        placeholder="Re-enter password" required value={pw2} onChange={ev => setPw2(ev.target.value)}
        error={e.confirmPassword ?? (mismatch ? "Passwords do not match" : undefined)} />

      <Field label="Full name" name="fullName" autoComplete="name" icon={<User size={18} />}
        placeholder="As on your government ID" defaultValue={v.fullName} required error={e.fullName} />

      <Field label="Date of birth" name="dob" type="date" max={maxDob} icon={<Calendar size={18} />}
        defaultValue={v.dob} required error={e.dob} hint="You must be 18 or older. Age is re-checked during ID verification." />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="City" name="city" defaultValue={v.city ?? ""} icon={<MapPin size={18} />} required error={e.city}>
          <option value="" disabled>Select city</option>
          {siteConfig.cities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </SelectField>
        <Field label="PIN code" name="pinCode" inputMode="numeric" maxLength={6} autoComplete="postal-code"
          placeholder="6-digit" defaultValue={v.pinCode} required error={e.pinCode} />
      </div>

      <SelectField label="Gender" name="gender" defaultValue={v.gender ?? ""} error={e.gender}>
        <option value="">Prefer not to say</option>
        <option value="female">Female</option><option value="male">Male</option><option value="non-binary">Non-binary</option>
      </SelectField>

      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold">I want to<span className="ml-0.5 text-red-500" aria-hidden="true">*</span></legend>
        <input type="hidden" name="accountIntent" value={intent} />
        <div className="grid grid-cols-3 gap-2" role="radiogroup">
          {INTENTS.map(o => {
            const on = intent === o.value;
            return (
              <button key={o.value} type="button" role="radio" aria-checked={on} onClick={() => setIntent(o.value)}
                className={`min-h-[64px] rounded-xl border-2 px-2 text-sm font-semibold leading-tight transition ${on ? "border-brand-purple bg-purple-50 text-brand-purple" : "border-gray-200 text-brand-navy/80 hover:border-brand-purple/40"}`}>
                {o.label}
              </button>
            );
          })}
        </div>
        {e.accountIntent && <p role="alert" className="mt-1 text-xs font-medium text-red-600">{e.accountIntent}</p>}
        <p className="mt-1.5 text-xs text-brand-grey">Companion profiles go live only after ID verification and review. Paying for membership does not guarantee approval.</p>
      </fieldset>

      <div>
        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" name="acceptTerms" className="mt-0.5 h-4 w-4 accent-[#8B32E8]" required defaultChecked={v.acceptTerms === "on"} aria-invalid={!!e.acceptTerms} />
          <span>I confirm I am 18 or older and I agree to the <Link href="/terms-and-conditions" target="_blank" className="font-medium text-brand-purple underline">Terms &amp; Conditions</Link> and <Link href="/privacy-policy" target="_blank" className="font-medium text-brand-purple underline">Privacy Policy</Link>.</span>
        </label>
        {e.acceptTerms && <p role="alert" className="mt-1 text-xs font-medium text-red-600">{e.acceptTerms}</p>}
      </div>

      <label className="flex items-start gap-2.5 text-sm text-brand-grey">
        <input type="checkbox" name="marketingOptIn" className="mt-0.5 h-4 w-4 accent-[#8B32E8]" defaultChecked={v.marketingOptIn === "on"} />
        <span>Send me offers and product updates (optional, you can unsubscribe any time).</span>
      </label>

      <button type="submit" disabled={pending} className="btn-primary btn w-full !rounded-xl !py-3.5 text-base">{pending ? "Creating account…" : "Create account"}</button>
      <p className="text-center text-sm text-brand-grey">Already have an account? <Link href="/login" className="font-semibold text-brand-purple hover:underline">Login</Link></p>
    </form>
  );
}
