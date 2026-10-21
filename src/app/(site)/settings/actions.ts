"use server";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/form-state";

export async function requestDeletion(_: FormState, fd: FormData): Promise<FormState> {
  const s = await getSession();
  if (!s) return { message: "Please log in again." };
  if (fd.get("confirm") !== "DELETE") return { errors: { confirm: "Type DELETE to confirm" } };
  const sb = await createClient();
  const { error } = await sb.from("account_deletion_requests").insert({ user_id: s.id, reason: String(fd.get("reason") ?? "").slice(0, 500) });
  if (error?.code === "23505") return { ok: true, message: "You already have a pending deletion request." };
  if (error) return { message: "We couldn't submit your request. Please contact support." };
  return { ok: true, message: "Deletion request received. We will process it, retaining only records the law requires, and confirm by email." };
}
