"use client";
import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Common = { label: string; name: string; error?: string; hint?: string; icon?: React.ReactNode; required?: boolean };

const Label = ({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-brand-navy">
    {label}{required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
  </label>
);

const Msg = ({ id, error, hint }: { id: string; error?: string; hint?: React.ReactNode }) => (
  <>
    {hint && !error && <p id={`${id}-h`} className="mt-1 text-xs text-brand-grey">{hint}</p>}
    {error && <p id={`${id}-e`} role="alert" className="mt-1 text-xs font-medium text-red-600">{error}</p>}
  </>
);

/** Text input with optional leading icon or fixed prefix (e.g. "+91"). */
export function Field({ label, name, error, hint, icon, prefix, required, ...rest }:
  Common & { prefix?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix">) {
  const id = useId();
  const pad = prefix ? "pl-16" : icon ? "pl-11" : "";
  return (
    <div>
      <Label htmlFor={id} label={label} required={required} />
      <div className="relative">
        {icon && !prefix && <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brand-grey" aria-hidden="true">{icon}</span>}
        {prefix && <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center border-r border-gray-200 pr-3 text-sm font-medium text-brand-grey" aria-hidden="true">{prefix}</span>}
        <input id={id} name={name} required={required} className={`input ${pad} ${error ? "!border-red-400" : ""}`} aria-invalid={!!error}
          aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} {...rest} />
      </div>
      <Msg id={id} error={error} hint={hint} />
    </div>
  );
}

export function PasswordField({ label, name, error, hint, icon, required, onChange, ...rest }:
  Common & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId(); const [show, setShow] = useState(false);
  return (
    <div>
      <Label htmlFor={id} label={label} required={required} />
      <div className="relative">
        {icon && <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brand-grey" aria-hidden="true">{icon}</span>}
        <input id={id} name={name} required={required} type={show ? "text" : "password"} onChange={onChange}
          className={`input pr-12 ${icon ? "pl-11" : ""} ${error ? "!border-red-400" : ""}`} aria-invalid={!!error}
          aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} {...rest} />
        <button type="button" onClick={() => setShow(s => !s)} aria-pressed={show} aria-label={show ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-2 flex items-center rounded-md px-2 text-brand-grey hover:text-brand-purple">
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <Msg id={id} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({ label, name, error, hint, icon, required, children, ...rest }:
  Common & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} label={label} required={required} />
      <div className="relative">
        {icon && <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brand-grey" aria-hidden="true">{icon}</span>}
        <select id={id} name={name} required={required} className={`input ${icon ? "pl-11" : ""} ${error ? "!border-red-400" : ""}`} aria-invalid={!!error}
          aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} {...rest}>{children}</select>
      </div>
      <Msg id={id} error={error} hint={hint} />
    </div>
  );
}

export function FormMessage({ ok, message }: { ok?: boolean; message?: string }) {
  if (!message) return null;
  return <p role={ok ? "status" : "alert"} className={`rounded-xl p-3 text-sm ${ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>{message}</p>;
}
