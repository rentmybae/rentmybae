import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Help Centre", description: "Help with accounts, bookings, memberships, payments and safety on RentMyBae.", alternates: { canonical: "/help" } };
const topics = [
  ["Account & login", "Reset a password, verify your email, or close your account.", "/forgot-password", "Reset password"],
  ["Bookings", "Cancellations, extensions and no-shows.", "/cancellation-policy", "Cancellation policy"],
  ["Refunds & payments", "When refunds apply and how they are paid.", "/refund-policy", "Refund policy"],
  ["Membership", "Plans, taxes, duration and what membership includes.", "/membership", "View plans"],
  ["Safety", "Report or block someone, meet safely, emergencies.", "/safety", "Safety Centre"],
  ["Privacy & data", "Your rights and how we protect data.", "/privacy-policy", "Privacy policy"],
  ["Complaints", "Escalate an issue to our Grievance Officer.", "/grievance-redressal", "Grievance redressal"],
  ["Talk to us", "Contact support directly.", "/contact", "Contact"]
];
export default function Help() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Help Centre</h1>
      <p className="mt-2 text-brand-grey">Find answers or reach us. Also see the <Link href="/faq" className="underline">FAQ</Link>.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {topics.map(([t, d, h, l]) => <div key={t} className="card"><h2 className="font-semibold">{t}</h2><p className="mt-1 text-sm text-brand-grey">{d}</p><Link href={h} className="mt-3 inline-block text-sm font-semibold text-brand-purple underline">{l}</Link></div>)}
      </div>
    </article>
  );
}
