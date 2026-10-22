import { describe, expect, it } from "vitest";
import { loginSchema, signupSchema } from "@/lib/validation";
import { echo } from "@/lib/form-state";
import { legalDocs } from "@/lib/legal-content";

const base = { countryCode: "+91", mobile: "9876543210", email: "a@b.com", password: "Abcdefgh12", confirmPassword: "Abcdefgh12",
  fullName: "Asha Verma", dob: "1995-04-10", city: "delhi", pinCode: "110001", accountIntent: "customer", acceptTerms: "on" };

describe("auth forms", () => {
  it("signup accepts 'Prefer not to say' (empty gender) and optional marketing", () => {
    expect(signupSchema.safeParse({ ...base, gender: "" }).success).toBe(true);
    expect(signupSchema.safeParse({ ...base, gender: "", marketingOptIn: "on" }).success).toBe(true);
  });
  it("signup rejects under-18 and bad mobile", () => {
    expect(signupSchema.safeParse({ ...base, dob: new Date().toISOString().slice(0, 10) }).success).toBe(false);
    expect(signupSchema.safeParse({ ...base, mobile: "12345" }).success).toBe(false);
  });
  it("login by email or mobile", () => {
    expect(loginSchema.safeParse({ method: "email", email: "A@B.com ", password: "x" }).success).toBe(true);
    expect(loginSchema.safeParse({ method: "mobile", countryCode: "+91", mobile: "9876543210", password: "x" }).success).toBe(true);
    expect(loginSchema.safeParse({ method: "mobile", countryCode: "+91", mobile: "1234", password: "x" }).success).toBe(false);
    expect(loginSchema.safeParse({ method: "email", email: "a@b.com", password: "" }).success).toBe(false);
  });
  it("form echo never returns passwords", () => {
    const fd = new FormData(); fd.set("email", "a@b.com"); fd.set("password", "secret"); fd.set("confirmPassword", "secret");
    expect(echo(fd)).toEqual({ email: "a@b.com" });
  });
  it("privacy policy and terms are detailed", () => {
    expect(legalDocs["privacy-policy"].sections.length).toBeGreaterThanOrEqual(15);
    expect(legalDocs["terms-and-conditions"].sections.length).toBeGreaterThanOrEqual(25);
  });
});
