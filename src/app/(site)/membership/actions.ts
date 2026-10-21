"use server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { membershipBreakdown } from "@/lib/money";
import { getPlanByCode, paymentsConfigured } from "@/lib/plans";
import { rateLimit } from "@/lib/ratelimit";
import type { FormState } from "@/lib/form-state";
import { redirect } from "next/navigation";

export async function startCheckout(_: FormState, fd: FormData): Promise<FormState> {
  const s = await getSession();
  if (!s) redirect("/login?next=%2Fmembership");
  if (!s.roles.includes("companion")) return { message: "Membership is for companion accounts. Choose “Become a Companion” or “Both” when registering." };
  if (!rateLimit(`checkout:${s.id}`, 10, 60_000).ok) return { message: "Too many attempts. Please wait a minute." };

  const code = z.string().max(32).safeParse(fd.get("planCode"));
  if (!code.success) return { message: "Please select a plan." };
  const plan = await getPlanByCode(code.data);                  // price comes from the server, never the client
  if (!plan) return { message: "That plan is not available." };
  const b = membershipBreakdown(plan.basePaise, plan.gstBps);

  if (!paymentsConfigured()) {
    return { message: "Online payments are not enabled yet, so nothing has been charged. You will be able to buy a plan here once the payment gateway is connected." };
  }
  // Gateway adapter (create order -> payment_transactions row -> redirect/checkout) is provider-specific and not built yet.
  void b;
  return { message: "Payment gateway integration is not yet implemented for the configured provider. Nothing has been charged." };
}
