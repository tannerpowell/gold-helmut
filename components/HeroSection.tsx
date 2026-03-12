"use client";

import Image from "next/image";
import Link from "next/link";
import { getWinnerImage } from "@/lib/image-manifest";
import { AWARD_INFO, WINNERS } from "@/lib/constants";

export function HeroSection() {
  const spotlight = WINNERS.length ? WINNERS[0] : null;
  const webImage = spotlight ? getWinnerImage(spotlight.year, "web") : null;
  const heroImage = spotlight ? getWinnerImage(spotlight.year, "hero") : null;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image: art-directed by viewport */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: portrait crop (taller viewport reveals full body naturally) */}
        {webImage && spotlight && (
          <Image
            src={webImage.jpg}
            alt={`${spotlight.name} - ${spotlight.year} Gold Helmet Award Winner`}
            fill
            className="object-cover object-[center_35%] scale-125 md:hidden"
            priority
            quality={85}
            sizes="(min-width: 768px) 0px, 100vw"
          />
        )}
        {/* Desktop: wide landscape from the original shoot (2560px, retina-ready) */}
        {heroImage && spotlight && (
          <Image
            src={heroImage.jpg}
            alt={`${spotlight.name} - ${spotlight.year} Gold Helmet Award Winner`}
            fill
            className="object-cover object-[65%_40%] scale-125 hidden md:block"
            priority
            quality={85}
            sizes="(min-width: 768px) 100vw, 0px"
          />
        )}
        {/* Fallback: if no hero variant exists, use web image on desktop too */}
        {!heroImage && webImage && spotlight && (
          <Image
            src={webImage.jpg}
            alt={`${spotlight.name} - ${spotlight.year} Gold Helmet Award Winner`}
            fill
            className="object-cover object-[center_30%] hidden md:block"
            priority
            quality={85}
            sizes="(min-width: 768px) 100vw, 0px"
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-6xl px-6 lg:px-8 py-12 md:py-14">
        <div className="max-w-2xl">
          {/* Logo */}
          <Image
            src="/images/logo-256.png"
            alt="Gold Helmet Award trophy"
            width={256}
            height={256}
            className="w-32 md:w-44 h-auto mb-6 drop-shadow-[0_4px_16px_rgba(184,149,62,0.3)]"
            priority
          />

          {/* Gold accent line */}
          <div className="mb-6 h-px w-16 bg-gold" />

          {/* Eyebrow */}
          <p className="text-gold text-base md:text-lg font-medium uppercase tracking-[0.2em] mb-3">
            The Colorado
          </p>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium italic leading-tight text-white mb-4">
            Gold Helmet Award
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
            Honoring {AWARD_INFO.yearsOfHistory} years of excellence, character,
            and leadership in Colorado high school football.
          </p>

          {/* Card + indicators + buttons: shared width from button row */}
          <div className="w-fit">
            {/* Current Winner Spotlight */}
            {spotlight && (
              <div className="mb-8 bg-black/30 backdrop-blur-sm border border-white/15 p-6 md:p-8">
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
            <div className="mb-8 flex flex-wrap gap-8 sm:justify-between">
              <div>
                <div className="text-4xl font-light text-[#fafafa] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {AWARD_INFO.yearsOfHistory}
                </div>
                <div className="mt-1 text-sm text-white/70">Years of History</div>
              </div>
              <div>
                <div className="text-4xl font-light text-[#fafafa] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  <span className="text-2xl align-baseline">$</span>{AWARD_INFO.scholarshipAmount.toLocaleString()}
                </div>
                <div className="mt-1 text-sm text-white/70">Scholarships</div>
              </div>
              <div>
                <div className="text-4xl font-light text-[#fafafa] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  501<span className="text-2xl">(c)(3)</span>
                </div>
                <div className="mt-1 text-sm text-white/70">Non-Profit</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/hall-of-champions"
                className="whitespace-nowrap inline-flex items-center justify-center gap-2 px-7 py-3 bg-gold/20 backdrop-blur-sm border border-gold/30 text-[#fafafa] hover:text-white font-medium uppercase tracking-widest text-sm hover:bg-gold/30 transition-all"
              >
                Past Champions
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/nominate"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-black/30 backdrop-blur-sm border border-white/15 text-[#fafafa] hover:text-white font-medium uppercase tracking-widest text-sm hover:bg-black/40 transition-all"
              >
                Nominate
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
