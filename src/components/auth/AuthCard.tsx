import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { supabaseConfigured } from "@/lib/supabase/server";

export default function AuthCard({ active, title, subtitle, children, wide }: {
  active?: "login" | "signup"; title: string; subtitle?: string; children: React.ReactNode; wide?: boolean;
}) {
  const tab = (on: boolean) =>
    `flex-1 rounded-xl py-3 text-center text-base font-semibold transition ${on ? "bg-brand-purple text-white shadow-card" : "bg-gray-100 text-brand-navy/80 hover:bg-gray-200"}`;
  return (
    <div className="bg-brand-gradient-soft px-4 py-10 sm:py-14">
      <div className={`mx-auto overflow-hidden rounded-card bg-white shadow-card ${wide ? "max-w-xl" : "max-w-md"}`}>
        <div className="bg-brand-gradient px-6 py-6 text-white sm:px-8">
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-white/90 sm:text-base">{subtitle}</p>}
        </div>
        <div className="px-6 py-6 sm:px-8">
          {active && (
            <div className="mb-6 flex gap-3" role="tablist" aria-label="Login or Register">
              <Link href="/login" role="tab" aria-selected={active === "login"} className={tab(active === "login")}>Login</Link>
              <Link href="/signup" role="tab" aria-selected={active === "signup"} className={tab(active === "signup")}>Register</Link>
            </div>
          )}
          {!supabaseConfigured() && (
            <div role="alert" className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              <p className="font-semibold">Accounts are temporarily unavailable. Please try again later.</p>
              {process.env.NODE_ENV !== "production" && (
                <p className="mt-1">Developer note: add <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code> and restart. See docs/SETUP.md.</p>
              )}
            </div>
          )}
          {children}
          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-brand-grey">
            <ShieldCheck size={14} aria-hidden="true" /> {siteConfig.name} is for adults aged 18 and over.
          </p>
        </div>
      </div>
    </div>
  );
}
