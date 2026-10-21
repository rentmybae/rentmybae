import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";
export const metadata: Metadata = { title: "Sign Up", description: "Create a RentMyBae account. Adults only (18+).", robots: { index: false, follow: true } };

export default function SignupPage() {
  return (
    <AuthCard active="signup" wide title="Create your account" subtitle="Adults only (18+). We verify contact details, age and identity before profiles go live.">
      <SignupForm />
    </AuthCard>
  );
}
