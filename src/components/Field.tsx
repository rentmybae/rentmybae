"use client";
import { useId, useState } from "react";

type Common = { label: string; name: string; error?: string; hint?: string };

export function Field({ label, name, error, hint, ...rest }: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>
      <input id={id} name={name} className="input" aria-invalid={!!error} aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} {...rest} />
      {hint && !error && <p id={`${id}-h`} className="mt-1 text-xs text-brand-grey">{hint}</p>}
      {error && <p id={`${id}-e`} role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function PasswordField({ label, name, error, hint, ...rest }: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId(); const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>
      <div className="relative">
        <input id={id} name={name} type={show ? "text" : "password"} className="input pr-16" aria-invalid={!!error}
          aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} {...rest} />
        <button type="button" onClick={() => setShow(s => !s)} aria-pressed={show}
          className="absolute inset-y-0 right-3 text-xs font-semibold text-brand-purple">{show ? "Hide" : "Show"}</button>
      </div>
      {hint && !error && <p id={`${id}-h`} className="mt-1 text-xs text-brand-grey">{hint}</p>}
      {error && <p id={`${id}-e`} role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function SelectField({ label, name, error, children, ...rest }: Common & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>
      <select id={id} name={name} className="input" aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} {...rest}>{children}</select>
      {error && <p id={`${id}-e`} role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function FormMessage({ ok, message }: { ok?: boolean; message?: string }) {
  if (!message) return null;
  return <p role={ok ? "status" : "alert"} className={`rounded-xl p-3 text-sm ${ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>{message}</p>;
}
