import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyHmacSignature } from "@/lib/webhook";

export const runtime = "nodejs";

/**
 * Provider-agnostic skeleton. Adapt `x-signature` and the payload shape ({ id, status, reference, amount_paise })
 * to the chosen gateway's documented webhook format before going live.
 */
export async function POST(req: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const raw = await req.text();                                  // signature is over the RAW body
  if (!verifyHmacSignature(raw, req.headers.get("x-signature"), secret)) return NextResponse.json({ error: "bad signature" }, { status: 401 });

  let evt: { id?: string; status?: string; reference?: string; amount_paise?: number };
  try { evt = JSON.parse(raw); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }
  if (!evt.id || !evt.reference || !evt.status) return NextResponse.json({ error: "bad payload" }, { status: 400 });

  const sb = createAdminClient();
  const provider = process.env.PAYMENT_PROVIDER ?? "unknown";
  const { error: dup } = await sb.from("webhook_events").insert({ provider, event_id: evt.id, payload: evt });
  if (dup?.code === "23505") return NextResponse.json({ ok: true, duplicate: true });   // idempotent: already processed
  if (dup) return NextResponse.json({ error: "store failed" }, { status: 500 });          // let the gateway retry

  if (evt.status === "paid") {
    const { data, error } = await sb.rpc("apply_payment_success", { p_txn: evt.reference, p_amount_paise: evt.amount_paise });
    if (error) {   // un-record the event so the gateway's retry is processed instead of treated as a duplicate
      await sb.from("webhook_events").delete().match({ provider, event_id: evt.id });
      return NextResponse.json({ error: "apply failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, result: data });
  }
  if (evt.status === "failed") await sb.from("payment_transactions").update({ status: "failed" }).eq("id", evt.reference).eq("status", "pending");
  return NextResponse.json({ ok: true });
}
