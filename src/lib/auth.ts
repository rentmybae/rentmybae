import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient, supabaseConfigured } from "./supabase/server";

export type Role = "customer" | "companion" | "moderator" | "support" | "admin";
export type Session = { id: string; email: string | null; name: string | null; roles: Role[] };

export async function getSession(): Promise<Session | null> {
  // Always render per-request: otherwise a build made without Supabase env vars freezes every page as "logged out".
  await connection();
  if (!supabaseConfigured()) return null;
  try {
    const sb = await createClient();
    const { data: { user } } = await sb.auth.getUser();   // validates the JWT with Supabase, not just the cookie
    if (!user) return null;
    const { data } = await sb.from("user_roles").select("role").eq("user_id", user.id);
    return { id: user.id, email: user.email ?? null, name: (user.user_metadata?.full_name as string) ?? null,
             roles: (data ?? []).map(r => r.role as Role) };
  } catch { return null; }
}

export async function requireSession(next = "/dashboard"): Promise<Session> {
  const s = await getSession();
  if (!s) redirect(`/login?next=${encodeURIComponent(next)}`);
  return s;
}

/** Server-side RBAC. Unauthorised users get a 404-style redirect to the dashboard, never the page. */
export async function requireRole(roles: Role[], next: string): Promise<Session> {
  const s = await requireSession(next);
  if (!s.roles.some(r => roles.includes(r))) redirect("/dashboard");
  return s;
}
