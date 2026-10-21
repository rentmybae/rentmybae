import type { Metadata } from "next";
import Empty from "@/components/Empty";
import { requireSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/money";
export const metadata: Metadata = { title: "My Bookings", robots: { index: false, follow: false } };

export default async function Bookings() {
  const s = await requireSession("/bookings");
  const sb = await createClient();                      // RLS: only rows where the user is customer or companion
  const { data } = await sb.from("bookings").select("id,service_slug,start_at,end_at,duration_minutes,total_paise,status")
    .or(`customer_id.eq.${s.id},companion_id.eq.${s.id}`).order("start_at", { ascending: false }).limit(50);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      <div className="mt-6 space-y-3">
        {data?.length ? data.map(b => (
          <div key={b.id} className="card flex flex-wrap items-center justify-between gap-2 text-sm">
            <div><p className="font-semibold capitalize">{b.service_slug.replace(/-/g, " ")}</p>
              <p className="text-brand-grey">{new Date(b.start_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} · {b.duration_minutes / 60} h</p></div>
            <div className="text-right"><p>{formatINR(b.total_paise)}</p><p className="capitalize text-brand-grey">{b.status.replace(/_/g, " ")}</p></div>
          </div>)) : <Empty title="No bookings yet">Your bookings will appear here.</Empty>}
      </div>
    </div>
  );
}
