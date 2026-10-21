import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/lib/nav";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const social = Object.entries(siteConfig.social).filter(([, v]) => v) as [string, string][];
  const l = siteConfig.legal;
  return (
    <footer className="mt-16 bg-[#1d0f3a] text-[#d9cdf0]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          {/* Logo wordmark is navy, so the symbol sits on a white chip for contrast on the dark footer. */}
          <span className="inline-block rounded-xl bg-white p-1.5"><Image src="/brand/rentmybae-symbol.png" alt="RentMyBae" width={70} height={56} /></span>
          <p className="mt-3 text-sm">{siteConfig.name} — {siteConfig.tagline}<br />Verified, adults-only companionship bookings.</p>
          {social.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-3 text-sm">
              {social.map(([k, v]) => <li key={k}><a href={v} rel="noopener noreferrer me" target="_blank" className="capitalize underline">{k}</a></li>)}
            </ul>
          )}
        </div>
        {Object.entries(footerNav).map(([group, items]) => (
          <nav key={group} aria-label={group}>
            <h2 className="mb-2 text-sm font-semibold text-white">{group}</h2>
            <ul className="space-y-1.5 text-sm">
              {items.map(i => <li key={i.label}><Link href={i.href} className="hover:text-white hover:underline">{i.label}</Link></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-[#a99bc7]">
        <p>© {new Date().getFullYear()} {l.entityName ?? siteConfig.name}. All rights reserved.{l.address ? ` ${l.address}` : ""}</p>
        <p className="mt-1">{siteConfig.name} is not an emergency service. In an emergency in India, call 112.</p>
      </div>
    </footer>
  );
}
