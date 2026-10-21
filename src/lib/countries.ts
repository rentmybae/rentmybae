export const COUNTRIES = [
  { code: "+91", name: "India", iso: "IN" }, { code: "+1", name: "United States / Canada", iso: "US" },
  { code: "+44", name: "United Kingdom", iso: "GB" }, { code: "+971", name: "United Arab Emirates", iso: "AE" },
  { code: "+65", name: "Singapore", iso: "SG" }, { code: "+61", name: "Australia", iso: "AU" }
] as const;

/** Returns E.164 or null. India: 10 digits starting 6-9. Others: 6-14 digits. */
export function toE164(callingCode: string, national: string): string | null {
  const digits = national.replace(/[\s-]/g, "");
  if (!/^\d+$/.test(digits)) return null;
  if (callingCode === "+91") return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
  if (!COUNTRIES.some(c => c.code === callingCode)) return null;
  return /^\d{6,14}$/.test(digits) ? `${callingCode}${digits}` : null;
}
