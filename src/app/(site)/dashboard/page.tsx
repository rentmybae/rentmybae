import type { Metadata } from "next";
import Link from "next/link";
import Empty from "@/components/Empty";
import { requireSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
export const metadata: Metadata = { title: "My Dashboard", robots: { index: false, follow: false } };

export default async function Dashboard() {
  const s = await requireSession("/dashboard");
  const sb = await createClient();
  const [{ data: profile }, { data: sub }, { count: upcoming }] = await Promise.all([
    sb.from("profiles").select("full_name,city,age_verified,account_intent").eq("id", s.id).maybeSingle(),
    sb.from("subscriptions").select("status,ends_at").eq("user_id", s.id).eq("status", "active").maybeSingle(),
    sb.from("bookings").select("id", { count: "exact", head: true })
      .or(`customer_id.eq.${s.id},companion_id.eq.${s.id}`).in("status", ["awaiting_confirmation", "confirmed", "in_progress"])
  ]);
  const isCompanion = s.roles.includes("companion");
  const { data: { user } } = await (await createClient()).auth.getUser();
  const steps = [
    { label: "Email verified", done: !!user?.email_confirmed_at },
    { label: "Mobile verified", done: !!user?.phone_confirmed_at, note: "Needs the OTP provider to be configured" },
    { label: "Age check", done: !!profile?.age_verified, note: "Completed through identity verification" },
    ...(isCompanion ? [
      { label: "Identity verification", done: false, note: "Provider not connected yet" },
      { label: "Membership active", done: !!sub },
      { label: "Profile approved by moderators", done: false, note: "Not yet available" }
    ] : [])
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Hello, {profile?.full_name?.split(" ")[0] ?? "there"}</h1>
      <p className="text-sm text-brand-grey">{s.roles.join(" · ")}</p>
      <section className="card mt-6"><h2 className="font-semibold">Getting started</h2>
        <ul className="mt-3 space-y-2">{steps.map(x => (
          <li key={x.label} className="flex items-start gap-2 text-sm"><span aria-hidden>{x.done ? "✅" : "⬜"}</span>
            <span><span className="font-medium">{x.label}</span>{!x.done && x.note && <span className="text-brand-grey"> — {x.note}</span>}<span className="sr-only">{x.done ? " (done)" : " (pending)"}</span></span></li>))}
        </ul>
        {isCompanion && !sub && <Link href="/membership" className="btn-primary btn mt-4">Choose a membership plan</Link>}
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div><h2 className="mb-2 font-semibold">Upcoming bookings</h2>
          {upcoming ? <p className="card">{upcoming} upcoming — <Link href="/bookings" className="font-semibold text-brand-purple underline">view</Link></p> : <Empty title="No upcoming bookings">Booking opens once companions are live in your city.</Empty>}</div>
        <div><h2 className="mb-2 font-semibold">Account</h2>
          <ul className="card space-y-1 text-sm"><li><Link className="underline" href="/transactions">Transactions</Link></li><li><Link className="underline" href="/settings">Account settings &amp; deletion</Link></li><li><Link className="underline" href="/help">Help &amp; support</Link></li></ul></div>
      </section>
    </div>
  );
}
