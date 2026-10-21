import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { PRIVATE_PREFIXES } from "@/lib/nav";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: [...PRIVATE_PREFIXES.map(p => p + "/"), ...PRIVATE_PREFIXES, "/api/", "/auth/"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
