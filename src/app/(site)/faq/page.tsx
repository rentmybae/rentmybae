import type { Metadata } from "next";
import { faqs } from "@/lib/faq";
export const metadata: Metadata = { title: "FAQ", description: "Answers about RentMyBae bookings, verification, membership, pricing, safety and payouts.", alternates: { canonical: "/faq" } };
export default function FAQ() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Frequently asked questions</h1>
      <div className="mt-6">{faqs.map(f => <details key={f.q} className="card mb-3"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-2 text-brand-grey">{f.a}</p></details>)}</div>
    </article>
  );
}
