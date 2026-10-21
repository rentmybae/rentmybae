/** Central, env-driven site config. Never hardcode a domain or business details. */
const env = (k: string) => process.env[k] || null;
export const siteConfig = {
  name: "RentMyBae",
  tagline: "Your Perfect Plus One.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Discover verified, adults-only companions for social outings, events and activities in Delhi NCR. Hourly booking with transparent pricing.",
  appStoreUrl: env("NEXT_PUBLIC_APP_STORE_URL"),
  playStoreUrl: env("NEXT_PUBLIC_PLAY_STORE_URL"),
  support: { email: env("NEXT_PUBLIC_SUPPORT_EMAIL"), phone: env("NEXT_PUBLIC_SUPPORT_PHONE") },
  legal: {
    entityName: env("NEXT_PUBLIC_LEGAL_ENTITY_NAME"),
    address: env("NEXT_PUBLIC_LEGAL_ADDRESS"),
    contactEmail: env("NEXT_PUBLIC_CONTACT_EMAIL"),
    grievanceOfficer: env("NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME"),
    grievanceEmail: env("NEXT_PUBLIC_GRIEVANCE_EMAIL")
  },
  social: {
    instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM"), x: env("NEXT_PUBLIC_SOCIAL_X"),
    facebook: env("NEXT_PUBLIC_SOCIAL_FACEBOOK"), linkedin: env("NEXT_PUBLIC_SOCIAL_LINKEDIN"),
    youtube: env("NEXT_PUBLIC_SOCIAL_YOUTUBE")
  },
  // Commercial settings (server-side). Must be confirmed with a CA / legal counsel before launch.
  gstBps: Number(process.env.GST_RATE_BPS ?? 1800),
  platformCommissionBps: process.env.PLATFORM_COMMISSION_BPS ? Number(process.env.PLATFORM_COMMISSION_BPS) : null,
  cities: [
    { slug: "delhi", name: "Delhi" }, { slug: "gurugram", name: "Gurugram" },
    { slug: "noida", name: "Noida" }, { slug: "ghaziabad", name: "Ghaziabad" }
  ]
} as const;
