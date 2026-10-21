import type { Metadata } from "next";
import { requireRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function Admin() {
  await requireRole(["admin"], "/admin");           // server-side RBAC (RLS enforces it again at the database)
  const sb = await createClient();
  const count = async (t: string, f?: (q: any) => any) => { const q = sb.from(t).select("*", { count: "exact", head: true }); const { count } = await (f ? f(q) : q); return count ?? 0; };
  const [users, txns, deletions] = await Promise.all([
    count("profiles"), count("payment_transactions", q => q.eq("status", "pending")), count("account_deletion_requests", q => q.eq("status", "pending"))
  ]);
  const cards = [["Registered users", users], ["Pending payments", txns], ["Pending deletion requests", deletions]];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Admin overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">{cards.map(([l, n]) => <div key={l as string} className="card"><p className="text-3xl font-extrabold">{n}</p><p className="text-sm text-brand-grey">{l}</p></div>)}</div>
      <p className="mt-6 text-sm text-brand-grey">Verification queue, moderation, refunds, payouts, pricing and content management are not built yet (see docs/STATUS.md).</p>
    </div>
  );
}
