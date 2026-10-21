import type { Metadata } from "next";
import Link from "next/link";
import PlanPicker from "@/components/PlanPicker";
import { getPlans } from "@/lib/plans";
import { siteConfig } from "@/lib/config";
export const metadata: Metadata = { title: "Companion Membership & Pricing", description: "RentMyBae companion membership plans with transparent pricing, taxes, duration and terms.", alternates: { canonical: "/membership" } };

export default async function Membership() {
  const plans = await getPlans();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Companion <span className="bg-brand-gradient bg-clip-text text-transparent">Membership</span></h1>
      <p className="mt-2 max-w-2xl text-brand-grey">Choose a plan to become eligible for listing. Membership does not guarantee verification or approval — your identity, age and profile are reviewed separately. Prices include no hidden fees; GST is shown separately. <Link className="underline" href="/refund-policy">Refund Policy</Link></p>
      {plans[0]?.illustrative && <p role="note" className="mt-4 rounded-xl border-l-4 border-brand-magenta bg-white p-3 text-sm text-brand-grey">Prices shown are illustrative until plans are configured by the administrator.</p>}
      <div className="mt-8"><PlanPicker plans={plans} commissionBps={siteConfig.platformCommissionBps} /></div>
    </div>
  );
}
