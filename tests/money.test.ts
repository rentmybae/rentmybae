import { describe, expect, it } from "vitest";
import { bookingBreakdown, formatINR, membershipBreakdown } from "@/lib/money";
describe("money", () => {
  it("membership GST in integer paise", () => expect(membershipBreakdown(49900, 1800)).toEqual({ basePaise: 49900, gstPaise: 8982, totalPaise: 58882 }));
  it("rejects bad base", () => { expect(() => membershipBreakdown(0, 1800)).toThrow(); expect(() => membershipBreakdown(10.5, 1800)).toThrow(); });
  it("booking breakdown", () => {
    const b = bookingBreakdown({ hourlyRatePaise: 150000, durationMinutes: 180, platformFeeBps: 1000, commissionBps: 2000, gstBps: 1800 });
    expect(b).toEqual({ subtotalPaise: 450000, platformFeePaise: 45000, gstPaise: 8100, totalPaise: 503100, commissionPaise: 90000, companionNetPaise: 360000 });
  });
  it("rejects invalid duration", () => expect(() => bookingBreakdown({ hourlyRatePaise: 1000, durationMinutes: 90, platformFeeBps: 0, commissionBps: 0, gstBps: 0 })).toThrow());
  it("formats", () => { expect(formatINR(19900)).toBe("₹199"); expect(formatINR(8982)).toBe("₹89.82"); });
});
