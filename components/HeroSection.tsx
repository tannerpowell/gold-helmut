"use client";

import Image from "next/image";
import Link from "next/link";
import { getWinnerImage } from "@/lib/image-manifest";
import { AWARD_INFO } from "@/lib/constants";

export function HeroSection() {
  const image = getWinnerImage(2025, "web");

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image (always visible) */}
      <div className="absolute inset-0 z-0">
        {image && (
          <Image
            src={image.jpg}
            alt="Elian Oliva - 2025 Gold Helmet Award Winner"
            fill
            className="object-cover object-center"
            priority
            quality={80}
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-6xl px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Gold accent line */}
          <div className="mb-8 h-px w-16 bg-gold" />

          {/* Eyebrow */}
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Colorado&apos;s Premier Award
          </p>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium italic leading-tight text-white mb-6">
            The Gold Helmet
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-xl">
            Honoring {AWARD_INFO.yearsOfHistory} years of excellence, character,
            and leadership in Colorado high school football.
          </p>

          {/* 2025 Winner Spotlight */}
          <div className="mb-12 bg-black/30 backdrop-blur-sm border border-white/15 p-8 max-w-xl">
            <div className="border-b border-gold/30 pb-4 mb-4">
              <p className="text-gold text-xs font-medium uppercase tracking-[0.2em]">
                2025 Winner
              </p>
            </div>
            <h2 className="font-display italic text-3xl font-medium text-white mb-3">
              Elian Oliva
            </h2>
            <p className="text-white/80 mb-1">Northfield High School</p>
            <p className="text-gold font-medium">
              Linebacker/Safety &bull; Air Force Academy
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mb-12 flex flex-wrap gap-8 border-t border-white/20 pt-8">
            <div>
              <div className="font-display text-3xl font-medium text-gold">
                {AWARD_INFO.yearsOfHistory}
              </div>
              <div className="mt-1 text-sm text-white/60">Years of History</div>
            </div>
            <div>
              <div className="font-display text-3xl font-medium text-gold">
                ${AWARD_INFO.scholarshipAmount.toLocaleString()}
              </div>
              <div className="mt-1 text-sm text-white/60">Scholarships</div>
            </div>
            <div>
              <div className="font-display text-3xl font-medium text-gold">
                501(c)(3)
              </div>
              <div className="mt-1 text-sm text-white/60">Non-Profit</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/winners-grid"
              className="inline-flex items-center justify-center px-8 py-3 bg-gold text-[#1a1a1a] font-medium hover:brightness-110 transition-all"
            >
              View All Winners
            </Link>
            <Link
              href="#apply"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Apply
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
