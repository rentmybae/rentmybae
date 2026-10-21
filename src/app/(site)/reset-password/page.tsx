import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import { ResetForm } from "@/components/auth/RecoveryForms";
import { getSession } from "@/lib/auth";
export const metadata: Metadata = { title: "Reset password", robots: { index: false, follow: true } };

export default async function ResetPage() {
  const s = await getSession();   // a valid recovery link signs the user into a short recovery session
  return (
    <AuthCard title="Choose a new password">
      {s ? <ResetForm /> : (
        <p className="text-sm">This reset link is invalid or has expired. <Link href="/forgot-password" className="font-semibold text-brand-purple underline">Request a new link</Link>.</p>
      )}
    </AuthCard>
  );
}
