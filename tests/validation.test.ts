import { describe, expect, it } from "vitest";
import { parseIdentifier, safeNext, signupSchema } from "@/lib/validation";
import { toE164 } from "@/lib/countries";
const ok = { countryCode: "+91", mobile: "9876543210", email: "A@B.com", password: "Str0ngPassw0rd", confirmPassword: "Str0ngPassw0rd",
  fullName: "Test User", dob: "1990-01-01", city: "delhi", pinCode: "110001", accountIntent: "customer", acceptTerms: "on" };
describe("signup validation", () => {
  it("accepts valid", () => expect(signupSchema.safeParse(ok).success).toBe(true));
  it("rejects minors", () => expect(signupSchema.safeParse({ ...ok, dob: new Date().toISOString().slice(0, 10) }).success).toBe(false));
  it("rejects mismatched / weak passwords", () => {
    expect(signupSchema.safeParse({ ...ok, confirmPassword: "different" }).success).toBe(false);
    expect(signupSchema.safeParse({ ...ok, password: "short", confirmPassword: "short" }).success).toBe(false);
  });
  it("rejects bad Indian mobile, bad PIN, unsupported city, missing consent", () => {
    expect(signupSchema.safeParse({ ...ok, mobile: "1234567890" }).success).toBe(false);
    expect(signupSchema.safeParse({ ...ok, pinCode: "123" }).success).toBe(false);
    expect(signupSchema.safeParse({ ...ok, city: "mumbai" }).success).toBe(false);
    expect(signupSchema.safeParse({ ...ok, acceptTerms: undefined }).success).toBe(false);
  });
});
describe("helpers", () => {
  it("E.164", () => { expect(toE164("+91", "98765 43210")).toBe("+919876543210"); expect(toE164("+91", "5876543210")).toBeNull(); });
  it("identifier parsing", () => { expect(parseIdentifier("a@b.com")).toEqual({ email: "a@b.com" }); expect(parseIdentifier("9876543210")).toEqual({ phone: "+919876543210" }); expect(parseIdentifier("junk")).toBeNull(); });
  it("safeNext blocks open redirects", () => { expect(safeNext("//evil.com")).toBe("/dashboard"); expect(safeNext("https://evil.com")).toBe("/dashboard"); expect(safeNext("/bookings")).toBe("/bookings"); });
});
