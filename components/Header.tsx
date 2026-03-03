"use client";

import Link from "next/link";
import { COLORS } from "@/lib/constants";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: COLORS.light,
        borderColor: COLORS.border,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: COLORS.accent }}
          >
            🏆
          </div>
          <span
            className="font-bold text-xl hidden sm:inline"
            style={{ color: COLORS.primary }}
          >
            Gold Helmet
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/winners-timeline"
            className="text-sm font-medium transition-colors"
            style={{ color: COLORS.textMuted }}
          >
            Timeline
          </Link>
          <Link
            href="/winners-grid"
            className="text-sm font-medium transition-colors"
            style={{ color: COLORS.textMuted }}
          >
            Grid
          </Link>
          <a
            href="#apply"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: COLORS.accent,
              color: COLORS.primary,
            }}
          >
            Apply
          </a>
        </nav>
      </div>
    </header>
  );
}
