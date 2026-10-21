import Link from "next/link";
export default function AuthCard({ active, title, subtitle, children, wide }: {
  active?: "login" | "signup"; title: string; subtitle?: string; children: React.ReactNode; wide?: boolean;
}) {
  const tab = (on: boolean) => `flex-1 rounded-full py-2 text-center text-sm font-semibold ${on ? "bg-brand-gradient text-white" : "text-brand-grey hover:text-brand-purple"}`;
  return (
    <div className="bg-brand-gradient-soft px-4 py-12">
      <div className={`card mx-auto ${wide ? "max-w-2xl" : "max-w-md"}`}>
        {active && (
          <div className="mb-6 flex gap-1 rounded-full bg-brand-surface p-1" role="tablist" aria-label="Login or Sign Up">
            <Link href="/login" role="tab" aria-selected={active === "login"} className={tab(active === "login")}>Login</Link>
            <Link href="/signup" role="tab" aria-selected={active === "signup"} className={tab(active === "signup")}>Sign Up</Link>
          </div>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 mb-5 text-sm text-brand-grey">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
