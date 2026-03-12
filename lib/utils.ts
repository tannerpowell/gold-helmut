import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n.replace(/[^a-zA-Z]/g, ""))
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function addUtmParams(
  url: string,
  campaign: string,
  content?: string | number,
): string {
  const sep = url.includes("?") ? "&" : "?";
  const params = new URLSearchParams({
    utm_source: "goldhelmetaward.com",
    utm_medium: "referral",
    utm_campaign: campaign,
    ...(content != null && { utm_content: String(content) }),
  });
  return `${url}${sep}${params}`;
}

export function handleActivateKey(fn?: () => void) {
  if (!fn) return undefined;
  return (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };
}
