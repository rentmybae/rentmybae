import { beforeEach, describe, expect, it } from "vitest";
import { _resetRateLimit, rateLimit } from "@/lib/ratelimit";
beforeEach(_resetRateLimit);
describe("rateLimit", () => {
  it("blocks after limit and resets after window", () => {
    for (let i = 0; i < 3; i++) expect(rateLimit("k", 3, 1000, 0).ok).toBe(true);
    expect(rateLimit("k", 3, 1000, 10).ok).toBe(false);
    expect(rateLimit("k", 3, 1000, 1001).ok).toBe(true);
  });
});
