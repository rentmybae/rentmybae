"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Globe, Lock, Mail } from "lucide-react";
import { login } from "@/app/(site)/(auth)/actions";
import { COUNTRIES } from "@/lib/countries";
import { initialState } from "@/lib/form-state";
import { Field, FormMessage, PasswordField, SelectField } from "../Field";

export default function LoginForm({ next }: { next?: string }) {
  const [s, action, pending] = useActionState(login, initialState);
  const v = s.values ?? {};
  const [method, setMethod] = useState<"mobile" | "email">((v.method as "mobile" | "email") ?? "mobile");
  const [cc, setCc] = useState(v.countryCode ?? "+91");
  const pill = (on: boolean) => `flex-1 rounded-lg py-2 text-sm font-semibold ${on ? "bg-white text-brand-purple shadow" : "text-brand-grey hover:text-brand-navy"}`;

  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="next" value={next ?? ""} />
      <input type="hidden" name="method" value={method} />
      <FormMessage message={s.message} />

      <div className="flex gap-1 rounded-xl bg-gray-100 p-1" role="radiogroup" aria-label="Log in with">
        <button type="button" role="radio" aria-checked={method === "mobile"} className={pill(method === "mobile")} onClick={() => setMethod("mobile")}>Mobile number</button>
        <button type="button" role="radio" aria-checked={method === "email"} className={pill(method === "email")} onClick={() => setMethod("email")}>Email</button>
      </div>

      {method === "mobile" ? (
        <>
          <SelectField label="Country" name="countryCode" value={cc} onChange={e => setCc(e.target.value)} icon={<Globe size={18} />} required>
            {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
          </SelectField>
          <Field key="m" label="Mobile number" name="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" prefix={cc}
            placeholder="Enter mobile number" defaultValue={v.mobile} required error={s.errors?.mobile}
            hint={cc === "+91" ? "India: 10-digit number only" : undefined} />
        </>
      ) : (
        <Field key="e" label="Email" name="email" type="email" autoComplete="email" icon={<Mail size={18} />}
          placeholder="your@email.com" defaultValue={v.email} required error={s.errors?.email} />
      )}

      <PasswordField label="Password" name="password" autoComplete="current-password" icon={<Lock size={18} />}
        placeholder="Enter your password" required error={s.errors?.password} />

      <div className="text-right text-sm"><Link href="/forgot-password" className="font-semibold text-brand-purple hover:underline">Forgot password?</Link></div>

      <button type="submit" disabled={pending} className="btn-primary btn w-full !rounded-xl !py-3.5 text-base">{pending ? "Logging in…" : "Login"}</button>

      <p className="text-center text-sm text-brand-grey">New to RentMyBae? <Link href="/signup" className="font-semibold text-brand-purple hover:underline">Create an account</Link></p>
      <p className="text-center text-xs text-brand-grey">By continuing, you agree to our <Link href="/terms-and-conditions" className="font-medium text-brand-purple hover:underline">Terms</Link> and <Link href="/privacy-policy" className="font-medium text-brand-purple hover:underline">Privacy Policy</Link>.</p>
    </form>
  );
}
