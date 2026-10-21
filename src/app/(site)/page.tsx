import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: { canonical: "/" }
};

const services = [
  ["🎬", "Movie Partner", "Company for a film at your chosen cinema."], ["☕", "Coffee Partner", "An easy conversation over coffee."],
  ["🍽️", "Cafe & Food Partner", "Share a meal or explore a restaurant."], ["🛍️", "Shopping Buddy", "A second opinion while you shop."],
  ["🎟️", "Event & Concert Partner", "A plus one for weddings, parties and concerts."], ["🗺️", "City Tour Partner", "Explore Delhi NCR together."],
  ["🤝", "Professional Networking", "A confident plus one for business events."], ["🎮", "Hanging Out & Gaming", "Casual time: games, walks, hobbies."]
];

export default function Home() {
  const ld = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/brand/icon-512.png`,
        sameAs: Object.values(siteConfig.social).filter(Boolean) },
      { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url }
    ]
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <section className="bg-brand-gradient-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <span className="mb-4 inline-block rounded-full border border-brand-purple/25 bg-white px-3 py-1 text-xs font-semibold text-brand-purple">Adults only (18+) · Delhi NCR</span>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Your <span className="bg-brand-gradient bg-clip-text text-transparent">Perfect Plus One.</span></h1>
            <p className="mt-4 max-w-xl text-lg text-brand-grey">Discover verified companions for social outings, events, activities, and lifestyle support. Choose your time, explore your options, and book with confidence.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary btn">Find a Companion</Link>
              <Link href="/signup" className="btn-secondary btn">Become a Companion</Link>
            </div>
            <p className="mt-4 text-sm text-brand-grey">Companionship only. A booking never implies consent to anything else.</p>
          </div>
          <Image src="/brand/rentmybae-symbol.png" alt="RentMyBae heart and RB monogram" width={320} height={257} priority className="mx-auto w-48 md:w-72" />
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14">
        <h2 className="text-3xl font-bold">Services</h2>
        <p className="mt-1 mb-6 max-w-2xl text-brand-grey">Social, non-intimate companionship. Availability depends on verified companions in your city once we launch. Regulated categories (elder care, medical, domestic assistance) are offered only after operational and legal review.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([i, t, d]) => <div key={t} className="card"><div className="text-3xl" aria-hidden>{i}</div><h3 className="mt-2 font-semibold">{t}</h3><p className="mt-1 text-sm text-brand-grey">{d}</p></div>)}
        </div>
      </section>

      <section id="how-it-works" className="bg-white px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="card"><h2 className="text-xl font-bold">For customers</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-brand-grey"><li>Create an account and verify</li><li>Browse verified companions</li><li>Pick service, date and duration</li><li>Review the price and pay securely</li><li>Meet, then leave a review</li></ol></div>
          <div className="card"><h2 className="text-xl font-bold">For companions</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-brand-grey"><li>Register and verify identity and age</li><li>Choose a <Link href="/membership" className="underline">membership plan</Link></li><li>Complete your profile and media</li><li>Get approved after moderation</li><li>Manage bookings and track payouts</li></ol></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold">Your time. Your schedule. Your earnings.</h2>
        <p className="mt-2 max-w-2xl text-brand-grey">Set your own hourly rate and availability, see commission and fees transparently, and track earnings and payouts in your dashboard. Earnings depend on demand and are not guaranteed. <Link href="/membership" className="font-semibold text-brand-purple underline">See membership plans</Link>.</p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14">
        <h2 className="mb-4 text-3xl font-bold">FAQ</h2>
        {faqs.slice(0, 6).map(f => <details key={f.q} className="card mb-3"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-2 text-brand-grey">{f.a}</p></details>)}
        <Link href="/faq" className="font-semibold text-brand-purple underline">All FAQs</Link>
      </section>
    </>
  );
}
