"use client";
import { useActionState } from "react";
import { requestDeletion } from "@/app/(site)/settings/actions";
import { initialState } from "@/lib/form-state";
import { Field, FormMessage } from "./Field";

export default function DeleteAccountForm() {
  const [s, action, pending] = useActionState(requestDeletion, initialState);
  return (
    <form action={action} className="space-y-3">
      <FormMessage ok={s.ok} message={s.message} />
      <Field label="Reason (optional)" name="reason" maxLength={500} />
      <Field label="Type DELETE to confirm" name="confirm" autoComplete="off" error={s.errors?.confirm} />
      <button type="submit" disabled={pending} className="btn rounded-full bg-red-600 text-white hover:bg-red-700">{pending ? "Submitting…" : "Request account deletion"}</button>
    </form>
  );
}
