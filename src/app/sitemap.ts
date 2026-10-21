import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { publicRoutes } from "@/lib/nav";
export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map(p => ({ url: p === "/" ? siteConfig.url : `${siteConfig.url}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.6 }));
}
