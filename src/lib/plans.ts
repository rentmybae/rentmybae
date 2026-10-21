import { createClient, supabaseConfigured } from "./supabase/server";
import { siteConfig } from "./config";

export type Plan = {
  code: string; name: string; durationMonths: number | null; basePaise: number; gstBps: number;
  features: string[]; renewal: string; illustrative: boolean;
};

// Illustrative reference values only. The source of truth is the subscription_plans table.
const FALLBACK: Plan[] = [
  { code: "6m", name: "6 Months", durationMonths: 6, basePaise: 19900, gstBps: siteConfig.gstBps, illustrative: true,
    features: ["Listing eligibility once verified and approved", "Availability calendar and booking management", "Earnings and payout tracking"],
    renewal: "Does not auto-renew. Expires after 6 months. [[confirm]]" },
  { code: "1y", name: "1 Year", durationMonths: 12, basePaise: 49900, gstBps: siteConfig.gstBps, illustrative: true,
    features: ["Everything in 6 Months", "12 months of listing eligibility"],
    renewal: "Does not auto-renew. Expires after 12 months. [[confirm]]" },
  { code: "lifetime", name: "Lifetime", durationMonths: null, basePaise: 99900, gstBps: siteConfig.gstBps, illustrative: true,
    features: ["Everything in 1 Year", "No expiry while your account stays in good standing"],
    renewal: "One-time payment. [[Define 'lifetime' and discontinuation terms — counsel]]" }
];

export async function getPlans(): Promise<Plan[]> {
  if (supabaseConfigured()) {
    try {
      const sb = await createClient();
      const { data } = await sb.from("subscription_plans").select("code,name,duration_months,price_paise,gst_bps,features,renewal_terms").eq("active", true).order("sort");
      if (data?.length) return data.map(p => ({ code: p.code, name: p.name, durationMonths: p.duration_months, basePaise: p.price_paise,
        gstBps: p.gst_bps, features: (p.features as string[]) ?? [], renewal: p.renewal_terms ?? "", illustrative: false }));
    } catch { /* fall through */ }
  }
  return FALLBACK;
}

/** Server-side lookup used by checkout: the client only ever supplies a plan code, never a price. */
export async function getPlanByCode(code: string) { return (await getPlans()).find(p => p.code === code) ?? null; }

export function paymentsConfigured() {
  return Boolean(process.env.PAYMENT_PROVIDER && process.env.PAYMENT_KEY_ID && process.env.PAYMENT_KEY_SECRET && process.env.PAYMENT_WEBHOOK_SECRET);
}
