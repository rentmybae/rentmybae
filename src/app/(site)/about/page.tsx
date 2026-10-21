import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "About Us", description: "About RentMyBae, an adults-only companionship and social lifestyle booking platform for Delhi NCR.", alternates: { canonical: "/about" } };
export default function About() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">About RentMyBae</h1>
      <p className="mt-4">RentMyBae is a verified, adults-only marketplace for social companionship and lifestyle support — a movie, a coffee, an event or a city tour — starting in Delhi, Gurugram, Noida and Ghaziabad.</p>
      <h2 className="mt-8 text-xl font-semibold">Our principles</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-brand-grey">
        <li><strong>Adults only.</strong> Everyone must be 18+ and go through verification.</li>
        <li><strong>Consent first.</strong> A paid booking never implies consent to intimacy.</li>
        <li><strong>Transparent pricing.</strong> Fees and taxes shown before you pay.</li>
        <li><strong>Safety.</strong> Reporting, blocking and support. See the <Link href="/safety" className="underline">Safety Centre</Link>.</li>
      </ul>
    </article>
  );
}
