import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
export const metadata: Metadata = { title: "Contact", description: "Contact RentMyBae support, safety and grievance teams.", alternates: { canonical: "/contact" } };
export default function Contact() {
  const { support, legal } = siteConfig;
  const email = support.email ?? legal.contactEmail;
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <div className="card mt-6 space-y-3">
        {email ? <p>Email: <a className="font-semibold text-brand-purple underline" href={`mailto:${email}`}>{email}</a></p>
               : <p className="text-brand-grey">Support contact details are being set up and will be published here before launch.</p>}
        {support.phone && <p>Phone: <a className="font-semibold" href={`tel:${support.phone}`}>{support.phone}</a></p>}
        {legal.address && <p>Address: {legal.address}</p>}
      </div>
      <ul className="mt-6 list-disc space-y-1 pl-5 text-brand-grey">
        <li>Safety concern? See the <Link className="underline" href="/safety">Safety Centre</Link>. In an emergency call <strong>112</strong>.</li>
        <li>Complaint? See <Link className="underline" href="/grievance-redressal">Grievance Redressal</Link>.</li>
        <li>Quick answers: <Link className="underline" href="/faq">FAQ</Link> · <Link className="underline" href="/help">Help Centre</Link></li>
      </ul>
    </article>
  );
}
