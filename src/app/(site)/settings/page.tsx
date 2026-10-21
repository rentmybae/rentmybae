import type { Metadata } from "next";
import Link from "next/link";
import DeleteAccountForm from "@/components/DeleteAccountForm";
import { requireSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
export const metadata: Metadata = { title: "Account Settings", robots: { index: false, follow: false } };

export default async function Settings() {
  const s = await requireSession("/settings");
  const sb = await createClient();
  const { data: p } = await sb.from("profiles").select("full_name,mobile_e164,city,pin_code").eq("id", s.id).maybeSingle();
  const rows: [string, string | null | undefined][] = [["Name", p?.full_name], ["Email", s.email], ["Mobile", p?.mobile_e164], ["City", p?.city], ["PIN code", p?.pin_code]];
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <section className="card mt-6"><h2 className="font-semibold">Profile</h2>
        <dl className="mt-3 space-y-1 text-sm">{rows.map(([k, v]) => <div key={k} className="flex justify-between"><dt className="text-brand-grey">{k}</dt><dd className="capitalize">{v ?? "—"}</dd></div>)}</dl>
        <p className="mt-3 text-xs text-brand-grey">To change your name or contact details, contact support so we can re-verify. <Link href="/contact" className="underline">Contact</Link></p></section>
      <section className="card mt-6"><h2 className="font-semibold">Privacy</h2>
        <p className="mt-1 text-sm text-brand-grey">See how we use and protect your data in the <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.</p></section>
      <section className="card mt-6 border border-red-200"><h2 className="font-semibold text-red-700">Delete account</h2>
        <p className="mt-1 mb-3 text-sm text-brand-grey">This starts permanent deletion. Open bookings or payments may need to complete first, and some records are kept where the law requires.</p>
        <DeleteAccountForm /></section>
    </div>
  );
}
