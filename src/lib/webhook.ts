import { createHmac, timingSafeEqual } from "node:crypto";
/** Verify an HMAC-SHA256 hex signature over the RAW request body. Adapt header/format to the chosen gateway. */
export function verifyHmacSignature(rawBody: string, signatureHex: string | null, secret: string): boolean {
  if (!signatureHex || !secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest();
  let given: Buffer;
  try { given = Buffer.from(signatureHex.trim(), "hex"); } catch { return false; }
  return given.length === expected.length && timingSafeEqual(given, expected);
}
