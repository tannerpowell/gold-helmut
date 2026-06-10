// Canonical production origin; also hardcoded as metadataBase in app/layout.tsx.
const CANONICAL_ORIGIN = "https://goldhelmetaward.com";

/**
 * Origin for building absolute URLs (Stripe redirects, email links).
 * NEXT_PUBLIC_SITE_URL wins when set (trailing slashes stripped). Outside
 * production a caller-provided fallback (e.g. the request origin) is used so
 * localhost ports keep working. In production the canonical domain is the
 * fallback — never the request origin, since that comes from the Host header,
 * which a client can set.
 */
export function getSiteOrigin(devFallback?: string): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (configured) return configured;
  if (process.env.NODE_ENV !== "production" && devFallback) return devFallback;
  return CANONICAL_ORIGIN;
}
