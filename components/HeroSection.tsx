"use client";

import Image from "next/image";
import Link from "next/link";
import { getWinnerImage } from "@/lib/image-manifest";
import { AWARD_INFO, WINNERS } from "@/lib/constants";

export function HeroSection() {
  const spotlight = WINNERS.length ? WINNERS[0] : null;
  const image = spotlight ? getWinnerImage(spotlight.year, "web") : null;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image (always visible) */}
      <div className="absolute inset-0 z-0">
        {image && spotlight && (
          <Image
            src={image.jpg}
            alt={`${spotlight.name} - ${spotlight.year} Gold Helmet Award Winner`}
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
          {/* Logo */}
          <Image
            src="/images/logo-256.png"
            alt="Gold Helmet Award trophy"
            width={256}
            height={256}
            className="w-40 md:w-56 h-auto mb-8 drop-shadow-[0_4px_16px_rgba(184,149,62,0.3)]"
            priority
          />

          {/* Gold accent line */}
          <div className="mb-8 h-px w-16 bg-gold" />

          {/* Eyebrow */}
          <p className="text-gold text-base md:text-xl font-medium uppercase tracking-[0.2em] mb-4">
            The Colorado
          </p>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium italic leading-tight text-white mb-6">
            Gold Helmet Award
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-xl">
            Honoring {AWARD_INFO.yearsOfHistory} years of excellence, character,
            and leadership in Colorado high school football.
          </p>

          {/* Current Winner Spotlight */}
          {spotlight && (
            <div className="mb-10 bg-black/30 backdrop-blur-sm border border-white/15 p-8 max-w-xl">
              <div className="flex items-center gap-4 border-b border-gold/30 pb-4 mb-4">
                <h2 className="font-display italic text-3xl font-medium text-white">
                  {spotlight.name}
                </h2>
                <p className="text-gold text-xs font-medium uppercase tracking-[0.2em]">
                  {spotlight.year} Winner
                </p>
              </div>
              <p className="text-white/80 mb-1">{spotlight.school}</p>
              {(spotlight.position || spotlight.college) && (
                <p className="text-gold font-medium">
                  {[spotlight.position, spotlight.college].filter(Boolean).join(" \u2022 ")}
                </p>
              )}
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mb-10 flex flex-wrap gap-10">
            <div>
              <div className="font-display text-4xl font-medium text-gold">
                {AWARD_INFO.yearsOfHistory}
              </div>
              <div className="mt-1 text-sm text-white/60">Years of History</div>
            </div>
            <div>
              <div className="font-display text-4xl font-medium text-gold">
                ${AWARD_INFO.scholarshipAmount.toLocaleString()}
              </div>
              <div className="mt-1 text-sm text-white/60">Scholarships</div>
            </div>
            <div>
              <div className="font-display text-4xl font-medium text-gold">
                501(c)(3)
              </div>
              <div className="mt-1 text-sm text-white/60">Non-Profit</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/winners-timeline"
              className="inline-flex items-center justify-center px-8 py-3 bg-gold text-[#1a1a1a] font-medium hover:brightness-110 transition-all"
            >
              Hall of Champions
            </Link>
            <Link
              href="/#nominate"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Nominate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
