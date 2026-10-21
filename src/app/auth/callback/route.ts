import { NextResponse, type NextRequest } from "next/server";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { safeNext } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"), "/dashboard");
  if (code && supabaseConfigured()) {
    const sb = await createClient();
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  return NextResponse.redirect(new URL("/login?error=link", url.origin));
}
