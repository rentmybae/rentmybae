// Import-free on purpose: used by components, sitemap, tests and scripts/check-routes.
export type NavLink = { href: string; label: string };

export const PRIVATE_PREFIXES = ["/dashboard", "/bookings", "/transactions", "/settings", "/admin", "/checkout"] as const;

export const LEGAL_SLUGS = [
  "privacy-policy", "terms-and-conditions", "refund-policy", "cancellation-policy",
  "community-guidelines", "safety", "code-of-conduct", "cookie-policy",
  "grievance-redressal", "accessibility"
] as const;

export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/membership", label: "Pricing" },
  { href: "/safety", label: "Safety Centre" }
];

export const authNav: NavLink[] = [
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" }
];

export const accountNav: NavLink[] = [
  { href: "/dashboard", label: "My Dashboard" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/membership", label: "Membership" },
  { href: "/transactions", label: "Transactions" },
  { href: "/settings", label: "Account Settings" },
  { href: "/help", label: "Help and Support" }
];

export const footerNav: Record<string, NavLink[]> = {
  Company: [
    { href: "/about", label: "About Us" }, { href: "/#services", label: "Services" },
    { href: "/#how-it-works", label: "How It Works" }, { href: "/membership", label: "Pricing" }
  ],
  Legal: [
    { href: "/privacy-policy", label: "Privacy Policy" }, { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/refund-policy", label: "Refund Policy" }, { href: "/cancellation-policy", label: "Cancellation Policy" },
    { href: "/cookie-policy", label: "Cookie Policy" }
  ],
  Support: [
    { href: "/help", label: "Help Centre" }, { href: "/contact", label: "Contact" },
    { href: "/safety", label: "Safety Centre" }, { href: "/grievance-redressal", label: "Grievance Information" },
    { href: "/faq", label: "FAQ" }
  ],
  Policies: [
    { href: "/community-guidelines", label: "Community Guidelines" }, { href: "/code-of-conduct", label: "Code of Conduct" },
    { href: "/accessibility", label: "Accessibility" }
  ]
};

/** Public, indexable static routes (sitemap source). */
export const publicRoutes = ["/", "/about", "/membership", "/contact", "/help", "/faq", ...LEGAL_SLUGS.map(s => `/${s}`)];
