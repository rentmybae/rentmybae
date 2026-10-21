import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyHmacSignature } from "@/lib/webhook";
const sign = (b: string, s: string) => createHmac("sha256", s).update(b).digest("hex");
describe("webhook signature", () => {
  const body = '{"id":"evt_1","status":"paid"}';
  it("accepts valid", () => expect(verifyHmacSignature(body, sign(body, "k"), "k")).toBe(true));
  it("rejects tampered body", () => expect(verifyHmacSignature(body + " ", sign(body, "k"), "k")).toBe(false));
  it("rejects wrong secret / missing / malformed", () => {
    expect(verifyHmacSignature(body, sign(body, "x"), "k")).toBe(false);
    expect(verifyHmacSignature(body, null, "k")).toBe(false);
    expect(verifyHmacSignature(body, "zz", "k")).toBe(false);
  });
});
