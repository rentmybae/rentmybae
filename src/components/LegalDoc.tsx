import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { legalDetailsComplete, type Block, type LegalDoc } from "@/lib/legal-content";

/** Renders [[owner-supplied detail]] as a highlight so missing business details are obvious before launch. */
function Marked({ text }: { text: string }) {
  const parts = text.split(/\[\[(.+?)\]\]/g);
  return <>{parts.map((p, i) => i % 2
    ? <mark key={i} className="rounded bg-yellow-100 px-1 text-yellow-900" title="Business detail to be filled in by the owner">[{p}]</mark>
    : p)}</>;
}

function BlockView({ b }: { b: Block }) {
  if (typeof b === "string") return <p className="mt-3 leading-7 text-brand-navy/90"><Marked text={b} /></p>;
  if ("sub" in b) return <h3 className="mt-6 text-base font-semibold text-brand-navy">{b.sub}</h3>;
  return (
    <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-brand-navy/90 marker:text-brand-purple">
      {b.list.map((li, i) => <li key={i}><Marked text={li} /></li>)}
    </ul>
  );
}

export default function LegalDocView({ doc, updated }: { doc: LegalDoc; updated: string }) {
  const id = (i: number) => `s${i + 1}`;
  const hasGaps = JSON.stringify(doc).includes("[[") || !legalDetailsComplete();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-brand-grey"><Link href="/" className="hover:text-brand-purple">Home</Link> / <span>{doc.title}</span></nav>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{doc.title}</h1>
      <p className="mt-2 text-sm text-brand-grey">Last updated {updated}</p>

      {hasGaps && process.env.NODE_ENV !== "production" && (
        <p role="note" className="mt-4 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-3 text-sm text-yellow-900">
          Owner note (hidden in production): highlighted items <mark className="bg-yellow-100 px-1">[like this]</mark> are business details to fill in via NEXT_PUBLIC_LEGAL_* env vars or in src/lib/legal/. Have the final text reviewed by an Indian lawyer before launch.
        </p>
      )}

      {doc.intro && <p className="mt-6 text-lg leading-8"><Marked text={doc.intro} /></p>}

      {doc.summary && (
        <section aria-labelledby="summary" className="mt-6 rounded-card border border-brand-purple/15 bg-white p-5 shadow-card">
          <h2 id="summary" className="text-lg font-semibold">The short version</h2>
          <ul className="mt-3 space-y-2.5">
            {doc.summary.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-6"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-purple" aria-hidden="true" /><span>{s}</span></li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-brand-grey">This summary is for convenience. The full text below is what applies.</p>
        </section>
      )}

      <nav aria-label="Contents" className="mt-6 rounded-card bg-white p-5 text-sm shadow-card">
        <p className="font-semibold">Contents</p>
        <ol className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {doc.sections.map((s, i) => <li key={i}><a className="text-brand-purple hover:underline" href={`#${id(i)}`}>{s.heading}</a></li>)}
        </ol>
      </nav>

      {doc.sections.map((s, i) => (
        <section key={i} id={id(i)} className="mt-10 scroll-mt-28">
          <h2 className="border-b border-gray-200 pb-2 text-xl font-semibold">{s.heading}</h2>
          {s.body.map((b, j) => <BlockView key={j} b={b} />)}
        </section>
      ))}

      <p className="mt-12 text-sm"><a href="#main" className="font-medium text-brand-purple hover:underline">Back to top</a></p>
    </article>
  );
}
