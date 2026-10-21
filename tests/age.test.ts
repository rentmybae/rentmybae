import { describe, expect, it } from "vitest";
import { ageOn, isAdult } from "@/lib/age";
const today = new Date(Date.UTC(2026, 9, 21));
describe("age", () => {
  it("18th birthday today is adult", () => expect(isAdult("2008-10-21", today)).toBe(true));
  it("day before 18th is minor", () => expect(isAdult("2008-10-22", today)).toBe(false));
  it("rejects impossible dates", () => { expect(ageOn("2000-02-30", today)).toBeNull(); expect(ageOn("nope", today)).toBeNull(); });
});
