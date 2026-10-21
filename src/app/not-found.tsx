import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata = { title: "Page not found", robots: { index: false } };
export default function NotFound() {
  return (<><Header /><main className="mx-auto max-w-xl px-4 py-24 text-center">
    <h1 className="text-4xl font-bold">404 — Page not found</h1>
    <p className="mt-3 text-brand-grey">The page you are looking for doesn’t exist or has moved.</p>
    <Link href="/" className="btn-primary btn mt-6">Back to home</Link>
  </main><Footer /></>);
}
