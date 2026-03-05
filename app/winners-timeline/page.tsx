"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Winner, WINNERS_BY_YEAR } from "@/lib/constants";
import { WinnerCard } from "@/components/WinnerCard";
import { WinnerModal } from "@/components/WinnerModal";
import { TimelineScrubber } from "@/components/TimelineScrubber";
import { SchoolLeaderboard } from "@/components/SchoolLeaderboard";

const allYears = WINNERS_BY_YEAR.map((w) => w.year);

// Header height + scrubber height = total sticky offset
const STICKY_OFFSET = 140; // 65px header + ~75px scrubber

export default function WinnersTimeline() {
  const [activeYear, setActiveYear] = useState<number | null>(allYears[0]);
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);
  const handleModalClose = useCallback(() => setSelectedWinner(null), []);
  const [scrollDirection, setScrollDirection] = useState<"top" | "bottom">("bottom");
  const yearRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const isScrollingTo = useRef(false);

  // Track whether we're near the top or bottom to toggle the FAB direction
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Show "go to bottom" when near top (first 20%), "go to top" otherwise
      setScrollDirection(scrollY < docHeight * 0.2 ? "bottom" : "top");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which year is visible via a single shared IntersectionObserver.
  // Safe with empty deps because WINNERS_BY_YEAR is static and all refs
  // are populated during the commit phase before this effect runs.
  // If the list ever becomes dynamic (pagination/filtering), refactor to
  // re-run the observer when yearRefs changes.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingTo.current) return;
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          const year = Number((best.target as HTMLElement).dataset.year);
          if (year) setActiveYear(year);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    yearRefs.current.forEach((el) => { observer.observe(el); });

    return () => observer.disconnect();
  }, []);

  const handleYearClick = useCallback((year: number) => {
    const el = yearRefs.current.get(year);
    if (!el) return;

    isScrollingTo.current = true;
    setActiveYear(year);

    const top = el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });

    // Release scroll lock when smooth scroll finishes
    const onScrollEnd = () => {
      isScrollingTo.current = false;
      window.removeEventListener("scrollend", onScrollEnd);
    };
    window.addEventListener("scrollend", onScrollEnd);
    // Fallback for browsers without scrollend support
    setTimeout(() => {
      isScrollingTo.current = false;
      window.removeEventListener("scrollend", onScrollEnd);
    }, 2000);
  }, []);

  const yearRefCallbacks = useRef<Map<number, (el: HTMLDivElement | null) => void>>(new Map());
  const setYearRef = useCallback((year: number) => {
    if (!yearRefCallbacks.current.has(year)) {
      yearRefCallbacks.current.set(year, (el: HTMLDivElement | null) => {
        if (el) yearRefs.current.set(year, el);
      });
    }
    return yearRefCallbacks.current.get(year)!;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="py-6 md:py-8 px-6 chrome-bar">
        <div className="max-w-6xl mx-auto flex items-center gap-8">
          <Image
            src="/images/logo-256.png"
            alt="Gold Helmet Award trophy"
            width={256}
            height={256}
            className="hidden md:block w-28 lg:w-36 h-auto drop-shadow-[0_4px_16px_rgba(184,149,62,0.3)]"
            priority
          />
          <div>
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
      </div>

      {/* Horizontal Scrubber */}
      <TimelineScrubber
        years={allYears}
        activeYear={activeYear}
        onYearClick={handleYearClick}
      />

      {/* Vertical Timeline + Sidebar */}
      <div className="py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto flex gap-12">
          {/* Timeline */}
          <div className="flex-1 max-w-4xl relative">
            {/* Gold vertical line */}
            <div className="absolute left-5 md:left-[4.5rem] top-0 bottom-0 w-px bg-gold/20" />

            <div className="space-y-8 pl-12 md:pl-28">
              {WINNERS_BY_YEAR.map((winner, i) => {
                const isNewDecade =
                  i === 0 ||
                  Math.floor(winner.year / 10) !==
                    Math.floor(WINNERS_BY_YEAR[i - 1].year / 10);

                return (
                  <div key={winner.year} ref={setYearRef(winner.year)} data-year={winner.year} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-12 md:-left-28 top-4 md:top-6 w-3 h-3 rounded-full bg-gold border-2 border-background" />

                    {/* Decade marker */}
                    {isNewDecade && (
                      <div className="mb-6">
                        <span className="font-display text-2xl font-medium text-gold">
                          {Math.floor(winner.year / 10) * 10}<span className="text-lg">s</span>
                        </span>
                      </div>
                    )}

                    <WinnerCard winner={winner} variant="timeline" onClick={() => setSelectedWinner(winner)} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar: School Leaderboard */}
          <div className="hidden xl:block w-[540px] flex-shrink-0 sticky top-[160px] max-h-[calc(100vh-180px)] overflow-y-auto pr-4">
            <SchoolLeaderboard onYearClick={handleYearClick} />
          </div>
        </div>
      </div>

      {/* Floating scroll button */}
      <button
        type="button"
        onClick={() => {
          if (scrollDirection === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
          }
        }}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full border border-gold/40 text-gold/40 hover:border-gold hover:text-gold active:scale-95 transition-all flex items-center justify-center"
        aria-label={scrollDirection === "top" ? "Scroll to top" : "Scroll to bottom"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          className={`transition-transform duration-300 ${scrollDirection === "top" ? "rotate-180" : ""}`}
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </button>

      <WinnerModal winner={selectedWinner} onClose={handleModalClose} />
    </div>
  );
}
