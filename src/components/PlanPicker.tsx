"use client";
import { useActionState, useState } from "react";
import { startCheckout } from "@/app/(site)/membership/actions";
import { initialState } from "@/lib/form-state";
import { formatINR, membershipBreakdown } from "@/lib/money";
import type { Plan } from "@/lib/plans";
import { FormMessage } from "./Field";

const Marked = ({ t }: { t: string }) => <>{t.split(/\[\[(.+?)\]\]/g).map((p, i) => i % 2 ? <mark key={i} className="bg-yellow-100 px-1">[{p}]</mark> : p)}</>;

export default function PlanPicker({ plans, commissionBps }: { plans: Plan[]; commissionBps: number | null }) {
  const [sel, setSel] = useState(plans[1]?.code ?? plans[0]?.code);
  const [s, action, pending] = useActionState(startCheckout, initialState);
  const plan = plans.find(p => p.code === sel)!;
  const b = membershipBreakdown(plan.basePaise, plan.gstBps);
  return (
    <form action={action}>
      <input type="hidden" name="planCode" value={sel} />
      <fieldset>
        <legend className="sr-only">Choose a membership plan</legend>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map(p => {
            const on = p.code === sel; const bd = membershipBreakdown(p.basePaise, p.gstBps);
            return (
              <label key={p.code} className={`card cursor-pointer border-2 transition ${on ? "border-brand-purple ring-4 ring-brand-purple/10" : "border-transparent"}`}>
                <input type="radio" name="plan" value={p.code} checked={on} onChange={() => setSel(p.code)} className="sr-only" />
                <div className="flex items-center justify-between"><h3 className="text-lg font-bold">{p.name}</h3>{on && <span className="rounded-full bg-brand-gradient px-2 py-0.5 text-xs font-semibold text-white">Selected</span>}</div>
                <p className="mt-1 text-sm text-brand-grey">{p.durationMonths ? `${p.durationMonths} months` : "One-time, no fixed expiry"}</p>
                <p className="mt-3 text-3xl font-extrabold">{formatINR(p.basePaise)}</p>
                <p className="text-xs text-brand-grey">+ {formatINR(bd.gstPaise)} GST = <strong>{formatINR(bd.totalPaise)}</strong> payable</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-brand-grey">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
                <p className="mt-3 text-xs text-brand-grey"><Marked t={p.renewal} /></p>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="card mt-6 max-w-md" aria-live="polite">
        <h3 className="font-semibold">Order summary — {plan.name}</h3>
        <dl className="mt-2 space-y-1 text-sm">
          <div className="flex justify-between"><dt>Plan price</dt><dd>{formatINR(b.basePaise)}</dd></div>
          <div className="flex justify-between"><dt>GST ({plan.gstBps / 100}%)</dt><dd>{formatINR(b.gstPaise)}</dd></div>
          <div className="flex justify-between border-t pt-1 font-bold"><dt>Total payable</dt><dd>{formatINR(b.totalPaise)}</dd></div>
        </dl>
        <p className="mt-3 text-xs text-brand-grey">Membership does not guarantee identity verification or profile approval. Booking commission: {commissionBps != null ? `${commissionBps / 100}% of the booking amount` : <mark className="bg-yellow-100 px-1">[to be configured]</mark>}. See the Refund Policy.</p>
        <div className="mt-3"><FormMessage message={s.message} /></div>
        <button type="submit" disabled={pending} className="btn-primary btn mt-4 w-full">{pending ? "Processing…" : `Pay ${formatINR(b.totalPaise)}`}</button>
      </div>
    </form>
  );
}
