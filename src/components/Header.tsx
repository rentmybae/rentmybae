import Image from "next/image";
import Link from "next/link";
import NavMenu from "./NavMenu";
import { getSession } from "@/lib/auth";
import { accountNav, authNav, mainNav } from "@/lib/nav";
import { siteConfig } from "@/lib/config";

export default async function Header() {
  const s = await getSession();
  const links = s ? accountNav.filter(l => l.href !== "/membership" || s.roles.includes("companion")) : [];
  if (s?.roles.includes("admin")) links.push({ href: "/admin", label: "Admin" });
  return (
    <header className="sticky top-0 z-20 bg-white shadow-[0_1px_0_rgba(0,0,0,.06)]">
      <div className="bg-brand-gradient px-4 py-2 text-center text-xs font-medium text-white">
        Adults only (18+) · Delhi NCR · Companionship only — consent always comes first
      </div>
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link href="/" aria-label="RentMyBae home">
          <Image src="/brand/rentmybae-logo.png" alt="RentMyBae – Your Perfect Plus One" width={72} height={48} priority className="h-12 w-auto" />
        </Link>
        <NavMenu links={mainNav} authLinks={authNav}
          appUrl={siteConfig.playStoreUrl ?? siteConfig.appStoreUrl}
          account={s ? { label: s.name?.split(" ")[0] ?? "Account", links } : null} />
      </div>
    </header>
  );
}
