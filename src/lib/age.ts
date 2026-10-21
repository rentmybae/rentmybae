export function ageOn(dobIso: string, today: Date = new Date()): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dobIso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  let age = today.getUTCFullYear() - y;
  const before = today.getUTCMonth() < mo - 1 || (today.getUTCMonth() === mo - 1 && today.getUTCDate() < d);
  if (before) age--;
  return age;
}
export const MIN_AGE = 18;
export const isAdult = (dobIso: string, today?: Date) => { const a = ageOn(dobIso, today); return a !== null && a >= MIN_AGE; };
