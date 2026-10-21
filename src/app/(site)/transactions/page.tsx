import type { Metadata } from "next";
import Empty from "@/components/Empty";
import { requireSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/money";
export const metadata: Metadata = { title: "Transactions", robots: { index: false, follow: false } };

export default async function Transactions() {
  const s = await requireSession("/transactions");
  const sb = await createClient();
  const { data } = await sb.from("payment_transactions").select("id,purpose,amount_paise,status,created_at").eq("user_id", s.id).order("created_at", { ascending: false }).limit(100);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <div className="mt-6 space-y-3">
        {data?.length ? data.map(t => (
          <div key={t.id} className="card flex justify-between text-sm">
            <div><p className="font-semibold capitalize">{t.purpose}</p><p className="text-brand-grey">{new Date(t.created_at).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium" })}</p></div>
            <div className="text-right"><p>{formatINR(t.amount_paise)}</p><p className="capitalize text-brand-grey">{t.status}</p></div>
          </div>)) : <Empty title="No transactions yet">Payments and refunds will be listed here.</Empty>}
      </div>
    </div>
  );
}
