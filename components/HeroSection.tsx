"use client";

import Link from "next/link";
import { AWARD_INFO, COLORS } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: COLORS.primary }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: COLORS.light }}
          >
            The Gold Helmet Award
          </h1>
          <p
            className="text-xl md:text-2xl mb-2"
            style={{ color: COLORS.accent }}
          >
            Colorado's Most Prestigious High School Football Honor
          </p>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#cbd5e1" }} // slate-300
          >
            Celebrating {AWARD_INFO.yearsOfHistory} years of excellence, leadership, and character on and off the field.
          </p>
        </div>

        {/* 2025 Winner Spotlight */}
        <div
          className="mb-16 p-8 rounded-lg border-2"
          style={{
            backgroundColor: COLORS.light,
            borderColor: COLORS.accent,
          }}
        >
          <div className="text-center">
            <p
              className="text-sm font-semibold mb-2"
              style={{ color: COLORS.accent }}
            >
              2025 WINNER
            </p>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              Elian Oliva
            </h2>
            <p className="text-lg mb-2" style={{ color: COLORS.primary }}>
              Northfield High School
            </p>
            <p style={{ color: COLORS.textMuted }}>
              Linebacker/Safety | Committed to Air Force Academy
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/winners-timeline"
            className="block p-6 rounded-lg border-2 transition-all hover:shadow-lg text-center font-semibold"
            style={{
              backgroundColor: COLORS.light,
              borderColor: COLORS.border,
              color: COLORS.primary,
            }}
          >
            View Timeline
          </Link>
          <Link
            href="/winners-grid"
            className="block p-6 rounded-lg border-2 transition-all hover:shadow-lg text-center font-semibold"
            style={{
              backgroundColor: COLORS.light,
              borderColor: COLORS.border,
              color: COLORS.primary,
            }}
          >
            View Grid
          </Link>
          <a
            href="#apply"
            className="block p-6 rounded-lg border-2 transition-all hover:shadow-lg text-center font-semibold"
            style={{
              backgroundColor: COLORS.accent,
              borderColor: COLORS.accent,
              color: COLORS.primary,
            }}
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
