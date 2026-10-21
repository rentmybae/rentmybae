import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
export const metadata: Metadata = { title: "Login", description: "Log in to your RentMyBae account.", robots: { index: false, follow: true } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; reset?: string; error?: string }> }) {
  const sp = await searchParams;
  return (
    <AuthCard active="login" title="Welcome back" subtitle="Log in to manage bookings, membership and your profile.">
      {sp.reset && <p role="status" className="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">Password updated. Please log in.</p>}
      {sp.error && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">That link is invalid or has expired. Please try again.</p>}
      <LoginForm next={sp.next} />
    </AuthCard>
  );
}
