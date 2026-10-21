import "server-only";
import { createClient } from "@supabase/supabase-js";
/** Service-role client. Server-only: bypasses RLS. Use ONLY in webhooks / audited admin actions. */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role not configured");
  return createClient(url, key, { auth: { persistSession: false } });
}
