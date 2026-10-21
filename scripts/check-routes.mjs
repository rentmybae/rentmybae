// Verifies every internal link in nav/footer/sitemap resolves to a real page file. No dependencies.
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { mainNav, authNav, accountNav, footerNav, publicRoutes, LEGAL_SLUGS, PRIVATE_PREFIXES } from "../src/lib/nav.ts";

function walk(dir, segs = [], out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      const isGroup = /^\(.+\)$/.test(f);
      walk(p, isGroup ? segs : [...segs, f], out);
    } else if (f === "page.tsx") out.push("/" + segs.join("/"));
  }
  return out;
}
const pages = walk("src/app").map(p => (p === "/" ? "/" : p.replace(/\/$/, "")));
const matches = path => pages.some(p => {
  if (p === path) return true;
  const m = p.match(/^\/\[slug\]$/);                         // legal dynamic route
  return m && LEGAL_SLUGS.includes(path.slice(1));
});

const hrefs = [...mainNav, ...authNav, ...accountNav, ...Object.values(footerNav).flat()].map(l => l.href);
const bad = [...new Set([...hrefs, ...publicRoutes])].filter(h => !matches(h.split("#")[0].split("?")[0] || "/"));
const leaked = publicRoutes.filter(r => PRIVATE_PREFIXES.some(p => r === p || r.startsWith(p + "/")));
const dupes = publicRoutes.length - new Set(publicRoutes).size;
console.log(`pages found: ${pages.length}; links checked: ${new Set(hrefs).size}; sitemap routes: ${publicRoutes.length}`);
if (bad.length || leaked.length || dupes) { console.error("FAIL", { broken: bad, privateInSitemap: leaked, dupes }); process.exit(1); }
console.log("OK: no broken nav/footer/sitemap links; no private routes in sitemap");
