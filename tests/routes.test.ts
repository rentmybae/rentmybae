import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
describe("routes", () => {
  it("all nav/footer/sitemap links resolve; no private routes in sitemap", () => {
    expect(() => execFileSync("node", ["--experimental-strip-types", "scripts/check-routes.mjs"], { stdio: "pipe" })).not.toThrow();
  });
});
