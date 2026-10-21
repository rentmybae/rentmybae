"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/app/(site)/(auth)/actions";
import type { NavLink } from "@/lib/nav";

type Props = {
  links: NavLink[];
  authLinks: NavLink[];                       // shown when signed out
  account: { label: string; links: NavLink[] } | null;
  appUrl: string | null;
};

export default function NavMenu({ links, authLinks, account, appUrl }: Props) {
  const [mobile, setMobile] = useState(false);
  const [dd, setDd] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMobile(false); setDd(false); } };
    const onClick = (e: MouseEvent) => { if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDd(false); };
    document.addEventListener("keydown", onKey); document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);

  const link = "rounded-md px-2 py-1 text-sm font-medium text-brand-navy hover:text-brand-purple";
  const logoutForm = (
    <form action={logout}><button type="submit" className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50">Logout</button></form>
  );

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-5 md:flex">
        {links.map(l => <Link key={l.label} href={l.href} className={link}>{l.label}</Link>)}
        {appUrl && <a href={appUrl} className={link} rel="noopener noreferrer">Get the App</a>}
        {account ? (
          <div className="relative" ref={ddRef}>
            <button type="button" aria-haspopup="menu" aria-expanded={dd} onClick={() => setDd(v => !v)}
              className="btn-secondary btn !px-4 !py-2">{account.label} ▾</button>
            {dd && (
              <div role="menu" className="absolute right-0 z-30 mt-2 w-56 rounded-xl bg-white p-2 shadow-card ring-1 ring-black/5">
                {account.links.map(l => (
                  <Link key={l.label} role="menuitem" href={l.href} onClick={() => setDd(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-brand-surface">{l.label}</Link>
                ))}
                <div role="menuitem">{logoutForm}</div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href={authLinks[0].href} className={link}>{authLinks[0].label}</Link>
            <Link href={authLinks[1].href} className="btn-primary btn !px-5 !py-2">{authLinks[1].label}</Link>
          </>
        )}
      </nav>

      <button type="button" className="rounded-md border border-gray-300 px-3 py-2 md:hidden" aria-label="Toggle menu"
        aria-expanded={mobile} aria-controls="mobile-menu" onClick={() => setMobile(v => !v)}>{mobile ? "✕" : "☰"}</button>

      {mobile && (
        <nav id="mobile-menu" aria-label="Mobile" className="absolute inset-x-0 top-full z-30 flex flex-col gap-1 bg-white p-4 shadow-lg md:hidden">
          {links.map(l => <Link key={l.label} href={l.href} onClick={() => setMobile(false)} className="rounded-md px-3 py-2 font-medium hover:bg-brand-surface">{l.label}</Link>)}
          {appUrl && <a href={appUrl} className="rounded-md px-3 py-2 font-medium hover:bg-brand-surface" rel="noopener noreferrer">Get the App</a>}
          <hr className="my-2" />
          {account ? (
            <>
              {account.links.map(l => <Link key={l.label} href={l.href} onClick={() => setMobile(false)} className="rounded-md px-3 py-2 font-medium hover:bg-brand-surface">{l.label}</Link>)}
              {logoutForm}
            </>
          ) : (
            <div className="flex gap-3">
              <Link href={authLinks[0].href} onClick={() => setMobile(false)} className="btn-secondary btn flex-1">{authLinks[0].label}</Link>
              <Link href={authLinks[1].href} onClick={() => setMobile(false)} className="btn-primary btn flex-1">{authLinks[1].label}</Link>
            </div>
          )}
        </nav>
      )}
    </>
  );
}
