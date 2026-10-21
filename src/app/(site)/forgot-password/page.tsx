import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import { ForgotForm } from "@/components/auth/RecoveryForms";
export const metadata: Metadata = { title: "Forgot password", robots: { index: false, follow: true } };
export default function ForgotPage() {
  return <AuthCard title="Forgot your password?" subtitle="Enter your email and we’ll send a one-time reset link if an account exists."><ForgotForm /></AuthCard>;
}
