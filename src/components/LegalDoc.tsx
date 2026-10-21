import type { LegalDoc } from "@/lib/legal-content";

function Marked({ text }: { text: string }) {
  const parts = text.split(/\[\[(.+?)\]\]/g);
  return <>{parts.map((p, i) => i % 2 ? <mark key={i} className="rounded bg-yellow-100 px-1 text-yellow-900" title="To be confirmed by the business owner / legal counsel">[{p}]</mark> : p)}</>;
}

export default function LegalDocView({ doc, updated }: { doc: LegalDoc; updated: string }) {
  const id = (i: number) => `s${i + 1}`;
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{doc.title}</h1>
      <p className="mt-1 text-sm text-brand-grey">Draft v0.1 · Last updated {updated}</p>
      <p role="note" className="mt-4 rounded-xl border-l-4 border-brand-magenta bg-white p-3 text-sm text-brand-grey">
        Draft pending review by qualified Indian legal counsel. Highlighted items <mark className="bg-yellow-100 px-1">[like this]</mark> must be confirmed before launch.
      </p>
      {doc.intro && <p className="mt-6"><Marked text={doc.intro} /></p>}
      <nav aria-label="Contents" className="mt-6 rounded-xl bg-white p-4 text-sm shadow-card">
        <p className="font-semibold">Contents</p>
        <ol className="mt-2 grid gap-1 sm:grid-cols-2">{doc.sections.map((s, i) => <li key={i}><a className="text-brand-purple hover:underline" href={`#${id(i)}`}>{s.heading}</a></li>)}</ol>
      </nav>
      {doc.sections.map((s, i) => (
        <section key={i} id={id(i)} className="mt-8 scroll-mt-24">
          <h2 className="text-xl font-semibold">{s.heading}</h2>
          {s.body.map((p, j) => <p key={j} className="mt-2 leading-relaxed text-brand-navy/90"><Marked text={p} /></p>)}
        </section>
      ))}
    </article>
  );
}
