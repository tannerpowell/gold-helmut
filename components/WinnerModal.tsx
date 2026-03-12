"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import { Winner } from "@/lib/constants";
import { getWinnerImage } from "@/lib/image-manifest";
import { getInitials, addUtmParams } from "@/lib/utils";
import { WINNER_PROFILES } from "@/lib/winner-profiles";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

interface WinnerModalProps {
  winner: Winner | null;
  onClose: () => void;
}

// Extended bio for the 2025 winner
const OLIVA_2025 = {
  headline: "First DPS Gold Helmet winner since 1999",
  bio: `Elian Oliva, an 18-year-old, 6\u20191\u201D, 190-pound linebacker from Northfield High School, became the first Denver Public Schools player to win the Gold Helmet Award since Thomas Jefferson\u2019s Marcus Houston in 1999, and the first winner in Northfield history.`,
  stats: [
    { label: "Tackles", value: "114" },
    { label: "TFL", value: "14" },
    { label: "Sacks", value: "6" },
    { label: "INTs", value: "3" },
    { label: "Forced Fumbles", value: "2" },
    { label: "40-Yard Dash", value: "4.48s" },
  ],
  careerStats: "250 career tackles (31.5 TFL), 16.5 career sacks",
  gpa: "5.02 weighted GPA (AP and IB courses)",
  trackAndField: "2nd place, Class 5A state meet, 300m hurdles",
  academics: {
    title: "Academics",
    weightedGpa: "5.02",
    label: "Weighted GPA (AP & IB)",
  },
  track: {
    title: "Track & Field",
    rank: "2nd",
    description: "Class 5A State, 300m Hurdles",
  },
  community: [
    "Co-founded Northfield\u2019s UNICEF chapter",
    "Math tutor for struggling peers",
    "Youth flag football coach",
    "Four-year summer camp counselor",
  ],
  quote: {
    text: "I\u2019ve never wanted to be too focused on one area of my life, because expanding myself allows for personal fulfillment and helping others.",
    attribution: "Elian Oliva",
  },
  coachQuote: {
    text: "We\u2019re going to stay away from 15. He\u2019s almost unblockable at the high school level.",
    attribution: "Coach Clint Buderus",
  },
  future: "Combat medicine in the Air Force",
};

export function WinnerModal({ winner, onClose }: WinnerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const focusableRef = useRef<HTMLElement[]>([]);
  const prevFocusRef = useRef<Element | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Focus trap: cycle focus within the modal
      if (e.key === "Tab") {
        const els = focusableRef.current;
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!winner) return;
    // Capture previously focused element for restoration
    prevFocusRef.current = document.activeElement;
    // Cache focusable elements once on open
    if (modalRef.current) {
      focusableRef.current = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
    }
    document.addEventListener("keydown", handleKey);
    lockScroll();
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      unlockScroll();
      focusableRef.current = [];
      // Restore focus to the element that opened the modal
      if (prevFocusRef.current instanceof HTMLElement) {
        prevFocusRef.current.focus();
      }
      prevFocusRef.current = null;
    };
  }, [winner, handleKey]);

  useEffect(() => {
    if (!winner) { setShowScrollHint(false); return; }
    const el = modalRef.current;
    if (!el) return;
    const check = () => {
      const scrollable = el.scrollHeight > el.clientHeight + 10;
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
      setShowScrollHint(scrollable && !nearBottom);
    };
    requestAnimationFrame(check);
    el.addEventListener("scroll", check, { passive: true });

    const resizeObserver = new ResizeObserver(check);
    resizeObserver.observe(el);

    const images = Array.from(el.querySelectorAll("img"));
    images.forEach((img) => img.addEventListener("load", check));

    return () => {
      el.removeEventListener("scroll", check);
      resizeObserver.disconnect();
      images.forEach((img) => img.removeEventListener("load", check));
    };
  }, [winner]);

  if (!winner) return null;

  const image = getWinnerImage(winner.year, "modal") || getWinnerImage(winner.year, "portrait");
  const is2025 = winner.year === 2025;
  const profile = !is2025 ? WINNER_PROFILES[winner.year] : undefined;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop: clicking this closes the modal */}
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={winner.name}
        className={`
          relative animate-[modalIn_300ms_ease-out]
          ${is2025 || profile ? "max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide" : "max-w-lg w-full"}
          bg-[#1a1a1a] rounded-lg
          shadow-[0_25px_60px_rgba(0,0,0,0.5),0_8px_20px_rgba(0,0,0,0.3)]
          border border-[#2e2e2e]
        `}
      >

        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="sticky top-4 float-right mr-4 mt-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white/60 hover:text-white hover:bg-black/70 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Image + overlaid text as a single unit */}
        <div className="relative w-full overflow-hidden rounded-lg">
          {image ? (
            <Image
              src={image.jpg}
              alt={winner.name}
              width={1536}
              height={1536}
              className="w-full h-auto max-h-[85vh] object-contain rounded-t-lg bg-[#111]"
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-gold/10 rounded-t-lg">
              <span className="font-display text-6xl font-medium text-gold/40">
                {getInitials(winner.name)}
              </span>
            </div>
          )}
          {/* Bottom gradient for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent rounded-b-lg" />

          {/* Overlaid text */}
          <div className="absolute inset-x-0 bottom-0 px-8 pb-6">
            {is2025 ? (
              <div className="mb-3">
                <span className="text-gold font-display text-5xl sm:text-6xl font-bold italic tracking-tight">
                  2025
                </span>
                <span className="text-gold/50 text-sm font-medium uppercase tracking-[0.2em] ml-3 relative top-[-4px]">
                  Gold Helmet Award
                </span>
              </div>
            ) : (
              <p className="inline-block bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-2">
                {winner.year} Gold Helmet Award
              </p>
            )}
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-1">
                  {winner.name}
                </h2>
                <p className="text-[#c0c0c0] text-lg mb-0.5">{winner.school}</p>
                {(winner.position || winner.college) && (
                  <p className="text-white text-lg font-medium">
                    {winner.position && <span>{winner.position}</span>}
                    {winner.position && winner.college && " \u00b7 "}
                    {winner.college}
                  </p>
                )}
              </div>
              {winner.storyUrl && (
                <a
                  href={addUtmParams(winner.storyUrl, "winner_profile", winner.year)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 text-gold text-sm font-medium hover:underline"
                >
                  Read full story
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Extended 2025 content */}
        {is2025 && (
          <div className="px-8 pb-8 space-y-7">
              {/* Divider: gold gradient line */}
              <div className="h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />

              {/* Headline */}
              <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold">
                {OLIVA_2025.headline}
              </p>

              {/* Bio */}
              <p className="text-[#d0d0d0] text-[17px] leading-[1.65]">
                {OLIVA_2025.bio}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {OLIVA_2025.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/[0.06] border border-white/[0.12] rounded-md px-3 py-4 text-center"
                  >
                    <div className="text-white font-display font-bold text-2xl sm:text-4xl leading-none tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-gold text-[11px] uppercase tracking-[0.12em] font-semibold mt-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Career stats */}
              <div className="bg-white/[0.06] border border-white/[0.12] rounded-md px-5 py-4">
                <div className="text-[11px] uppercase tracking-[0.12em] text-gold/70 mb-1.5 font-semibold">
                  Career Totals
                </div>
                <div className="text-white text-lg font-medium">
                  {OLIVA_2025.careerStats}
                </div>
              </div>

              {/* Academics + Track */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/[0.06] border border-white/[0.12] rounded-md px-5 py-4">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-gold/70 mb-1.5 font-semibold">
                    {OLIVA_2025.academics.title}
                  </div>
                  <div className="text-white text-2xl sm:text-4xl font-display font-bold leading-tight">{OLIVA_2025.academics.weightedGpa}</div>
                  <div className="text-[#a0a0a0] text-sm mt-0.5">{OLIVA_2025.academics.label}</div>
                </div>
                <div className="bg-white/[0.06] border border-white/[0.12] rounded-md px-5 py-4">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-gold/70 mb-1.5 font-semibold">
                    {OLIVA_2025.track.title}
                  </div>
                  <div className="text-white text-2xl sm:text-4xl font-display font-bold leading-tight">{OLIVA_2025.track.rank}</div>
                  <div className="text-[#a0a0a0] text-sm mt-0.5">{OLIVA_2025.track.description}</div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="border-l-[3px] border-gold/50 pl-5 py-2">
                <p className="text-white/90 text-lg italic leading-relaxed font-display">
                  &ldquo;{OLIVA_2025.quote.text}&rdquo;
                </p>
                <cite className="text-gold/60 text-sm not-italic mt-2 block font-medium">
                  {OLIVA_2025.quote.attribution}
                </cite>
              </blockquote>

              {/* Community */}
              <div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-gold/70 mb-3 font-semibold">
                  Community & Leadership
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {OLIVA_2025.community.map((item) => (
                    <div
                      key={item}
                      className="bg-white/[0.03] border border-white/[0.06] rounded-md px-4 py-3 text-[#c8c8c8] text-[15px]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach quote */}
              <blockquote className="border-l-[3px] border-gold/50 pl-5 py-2">
                <p className="text-white/90 text-lg italic leading-relaxed font-display">
                  &ldquo;{OLIVA_2025.coachQuote.text}&rdquo;
                </p>
                <cite className="text-gold/60 text-sm not-italic mt-2 block font-medium">
                  {OLIVA_2025.coachQuote.attribution}
                </cite>
              </blockquote>

              {/* Future */}
              <div className="bg-gradient-to-r from-gold/[0.08] to-transparent border border-gold/15 rounded-md px-5 py-5">
                <div className="text-[11px] uppercase tracking-[0.12em] text-gold/60 mb-1.5 font-semibold">
                  Next Chapter
                </div>
                <div className="text-white text-xl font-semibold">
                  {OLIVA_2025.future}
                </div>
                <div className="text-[#a0a0a0] text-sm mt-1">United States Air Force</div>
              </div>
          </div>
        )}

        {/* Extended profile content (non-2025 winners) */}
        {profile && (
          <div className="px-8 pb-8 space-y-7">
            <div className="h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />

            <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold">
              {profile.headline}
            </p>

            <p className="text-[#d0d0d0] text-[17px] leading-[1.65]">
              {profile.bio}
            </p>

            {profile.actionImage && (
              <div className="rounded-md overflow-hidden">
                <Image
                  src={profile.actionImage}
                  alt={`${winner.name} in action`}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  sizes="(min-width: 768px) 768px, 100vw"
                />
              </div>
            )}

            {profile.stats && profile.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {profile.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/[0.06] border border-white/[0.12] rounded-md px-3 py-4 text-center"
                  >
                    <div className="text-white font-display font-bold text-2xl sm:text-4xl leading-none tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-gold text-[11px] uppercase tracking-[0.12em] font-semibold mt-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {profile.careerHighlight && (
              <div className="bg-white/[0.06] border border-white/[0.12] rounded-md px-5 py-4">
                <div className="text-[11px] uppercase tracking-[0.12em] text-gold/70 mb-1.5 font-semibold">
                  Career Totals
                </div>
                <div className="text-white text-lg font-medium">
                  {profile.careerHighlight}
                </div>
              </div>
            )}

            {profile.highlights && profile.highlights.length > 0 && (
              <div className={`grid gap-3 ${profile.highlights.length > 1 ? "grid-cols-1 sm:grid-cols-2" : ""}`}>
                {profile.highlights.map((h) => (
                  <div
                    key={h.title}
                    className="bg-white/[0.06] border border-white/[0.12] rounded-md px-5 py-4"
                  >
                    <div className="text-[11px] uppercase tracking-[0.12em] text-gold/70 mb-1.5 font-semibold">
                      {h.title}
                    </div>
                    <div className="text-white text-2xl sm:text-4xl font-display font-bold leading-tight">
                      {h.value}
                    </div>
                    <div className="text-[#a0a0a0] text-sm mt-0.5">{h.description}</div>
                  </div>
                ))}
              </div>
            )}

            {profile.quote && (
              <blockquote className="border-l-[3px] border-gold/50 pl-5 py-2">
                <p className="text-white/90 text-lg italic leading-relaxed font-display text-balance">
                  &ldquo;{profile.quote.text}&rdquo;
                </p>
                <cite className="text-gold/60 text-sm not-italic mt-2 block font-medium">
                  {profile.quote.attribution}
                </cite>
              </blockquote>
            )}

            {profile.community && profile.community.length > 0 && (
              <div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-gold/70 mb-3 font-semibold">
                  Community & Leadership
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {profile.community.map((item) => (
                    <div
                      key={item}
                      className="bg-white/[0.03] border border-white/[0.06] rounded-md px-4 py-3 text-[#c8c8c8] text-[15px]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.coachQuote && (
              <blockquote className="border-l-[3px] border-gold/50 pl-5 py-2">
                <p className="text-white/90 text-lg italic leading-relaxed font-display text-balance">
                  &ldquo;{profile.coachQuote.text}&rdquo;
                </p>
                <cite className="text-gold/60 text-sm not-italic mt-2 block font-medium">
                  {profile.coachQuote.attribution}
                </cite>
              </blockquote>
            )}

            {profile.closingImage && (
              <div className="rounded-md overflow-hidden">
                <Image
                  src={profile.closingImage}
                  alt={`${winner.name}`}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  sizes="(min-width: 768px) 768px, 100vw"
                />
              </div>
            )}

            {profile.future && (
              <div className="bg-gradient-to-r from-gold/[0.08] to-transparent border border-gold/15 rounded-md px-5 py-5">
                <div className="text-[11px] uppercase tracking-[0.12em] text-gold/60 mb-1.5 font-semibold">
                  Next Chapter
                </div>
                <div className="text-white text-xl font-semibold">
                  {profile.future.title}
                </div>
                {profile.future.subtitle && (
                  <div className="text-[#a0a0a0] text-sm mt-1">{profile.future.subtitle}</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Scroll hint */}
        {showScrollHint && (
          <div className="sticky bottom-0 inset-x-0 h-16 -mt-16 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none flex items-end justify-center pb-2 z-10">
            <ChevronDown size={20} className="text-gold/50 animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
}
