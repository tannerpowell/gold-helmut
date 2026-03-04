"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WINNERS_BY_YEAR } from "@/lib/constants";
import { WinnerCard } from "@/components/WinnerCard";
import { TimelineScrubber } from "@/components/TimelineScrubber";

const allYears = WINNERS_BY_YEAR.map((w) => w.year);

export default function WinnersTimeline() {
  const [activeYear, setActiveYear] = useState<number | null>(allYears[0]);
  const yearRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const isScrollingTo = useRef(false);

  // Track which year is visible via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    yearRefs.current.forEach((el, year) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrollingTo.current) {
            setActiveYear(year);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleYearClick = useCallback((year: number) => {
    const el = yearRefs.current.get(year);
    if (!el) return;

    isScrollingTo.current = true;
    setActiveYear(year);

    // Offset for sticky header + scrubber
    const offset = 140;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });

    // Release scroll lock after animation
    setTimeout(() => {
      isScrollingTo.current = false;
    }, 800);
  }, []);

  const setYearRef = useCallback(
    (year: number) => (el: HTMLDivElement | null) => {
      if (el) yearRefs.current.set(year, el);
    },
    []
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="py-10 md:py-14 px-6 chrome-bar">
        <div className="max-w-6xl mx-auto">
          <div className="h-px w-16 bg-gold mb-4" />
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Year by Year
          </p>
          <h1 className="font-display italic text-4xl md:text-5xl font-medium text-white mb-2">
            Winners Timeline
          </h1>
          <p className="text-base chrome-bar-text max-w-2xl">
            Seventy-five years of award recipients, from 2025 back to 1951.
          </p>
        </div>
      </div>

      {/* Horizontal Scrubber */}
      <TimelineScrubber
        years={allYears}
        activeYear={activeYear}
        onYearClick={handleYearClick}
      />

      {/* Vertical Timeline */}
      <div className="py-10 md:py-16 px-6">
        <div className="max-w-4xl mx-auto relative">
          {/* Gold vertical line */}
          <div className="absolute left-5 md:left-[4.5rem] top-0 bottom-0 w-px bg-gold/20" />

          <div className="space-y-8 pl-12 md:pl-28">
            {WINNERS_BY_YEAR.map((winner, i) => {
              const isNewDecade =
                i === 0 ||
                Math.floor(winner.year / 10) !==
                  Math.floor(WINNERS_BY_YEAR[i - 1].year / 10);

              return (
                <div key={winner.year} ref={setYearRef(winner.year)} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-12 md:-left-28 top-4 md:top-6 w-3 h-3 rounded-full bg-gold border-2 border-background" />

                  {/* Decade marker */}
                  {isNewDecade && (
                    <div className="mb-6">
                      <span className="font-display text-2xl font-medium text-gold">
                        {Math.floor(winner.year / 10) * 10}s
                      </span>
                    </div>
                  )}

                  <WinnerCard winner={winner} variant="timeline" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
