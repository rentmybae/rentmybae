// Fixed-window limiter. In-memory => per server instance only.
// For production on serverless/multi-instance hosting, swap the store for Redis/Upstash (same interface).
const hits = new Map<string, { count: number; resetAt: number }>();
export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()) {
  const e = hits.get(key);
  if (!e || e.resetAt <= now) { hits.set(key, { count: 1, resetAt: now + windowMs }); return { ok: true, remaining: limit - 1 }; }
  e.count++;
  if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  return { ok: e.count <= limit, remaining: Math.max(0, limit - e.count) };
}
export const _resetRateLimit = () => hits.clear();
