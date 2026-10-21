export default function Empty({ title, children }: { title: string; children?: React.ReactNode }) {
  return <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center"><p className="font-semibold">{title}</p>{children && <p className="mt-1 text-sm text-brand-grey">{children}</p>}</div>;
}
