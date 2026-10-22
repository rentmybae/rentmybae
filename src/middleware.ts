import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { PRIVATE_PREFIXES } from "@/lib/nav";

const isPrivate = (p: string) => PRIVATE_PREFIXES.some(x => p === x || p.startsWith(x + "/"));

export async function middleware(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const path = req.nextUrl.pathname;
  const toLogin = () => {
    const u = req.nextUrl.clone(); u.pathname = "/login"; u.search = `?next=${encodeURIComponent(path)}`;
    return NextResponse.redirect(u);
  };
  if (!url || !anon) return isPrivate(path) ? toLogin() : NextResponse.next();   // fail closed

  let res = NextResponse.next({ request: req });
  const sb = createServerClient(url, anon, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll(list: { name: string; value: string; options: CookieOptions }[]) {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      }
    }
  });
  const { data: { user } } = await sb.auth.getUser();     // refreshes the session cookie
  if (!user && isPrivate(path)) return toLogin();
  if (isPrivate(path)) res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = { matcher: ["/((?!_next/static|_next/image|brand/|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)"] };
