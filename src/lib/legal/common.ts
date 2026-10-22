import { siteConfig } from "../config";

/**
 * Text in [[double brackets]] is shown highlighted: a business detail only the owner can supply
 * (usually filled automatically from NEXT_PUBLIC_LEGAL_* env vars).
 * A block is a paragraph, a bullet list, or a sub-heading.
 */
export type Block = string | { list: string[] } | { sub: string };
export type Section = { heading: string; body: Block[] };
export type LegalDoc = { title: string; description: string; intro?: string; summary?: string[]; sections: Section[] };

/** Bump when Privacy Policy or Terms change materially. Stored with each user's consent at signup. */
export const LEGAL_VERSION = "2026-10-22";
export const EFFECTIVE_DATE = "22 October 2026";

const L = siteConfig.legal;
export const N = siteConfig.name;
export const ENT = L.entityName ?? "[[legal entity name]]";
export const MAIL = L.contactEmail ?? siteConfig.support.email ?? "[[contact email]]";
export const GRV = L.grievanceEmail ?? "[[grievance email]]";
export const OFFICER = L.grievanceOfficer ?? "[[Grievance Officer name]]";
export const ADDR = L.address ?? "[[registered address]]";
export const SITE = siteConfig.url.replace(/^https?:\/\//, "");
export const CITIES = siteConfig.cities.map(c => c.name).join(", ");

/** True when every owner-supplied legal detail is configured. */
export const legalDetailsComplete = () => Boolean(L.entityName && L.address && L.contactEmail && L.grievanceOfficer && L.grievanceEmail);
