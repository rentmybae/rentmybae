import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalDocView from "@/components/LegalDoc";
import { legalDocs } from "@/lib/legal-content";
import { LEGAL_SLUGS } from "@/lib/nav";

export const dynamicParams = false;
export const generateStaticParams = () => LEGAL_SLUGS.map(slug => ({ slug }));
const get = (slug: string) => (LEGAL_SLUGS as readonly string[]).includes(slug) ? legalDocs[slug as keyof typeof legalDocs] : null;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const d = get(slug);
  if (!d) return {};
  return { title: d.title, description: d.description, alternates: { canonical: `/${slug}` }, openGraph: { title: d.title, description: d.description, url: `/${slug}` } };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const d = get(slug);
  if (!d) notFound();
  return <LegalDocView doc={d} updated="21 October 2026" />;
}
