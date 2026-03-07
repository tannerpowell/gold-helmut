"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TimelineScrubberProps {
  years: number[];
  activeYear: number | null;
  onYearClick: (year: number) => void;
}

// Singleton ref to the TimelineScrubber root element.
// Read imperatively by getStickyOffset() in app/hall-of-champions/page.tsx.
// Only one TimelineScrubber instance may be mounted at a time — a second
// instance would overwrite this ref and break the offset calculation.
export const scrubberRef = { current: null as HTMLDivElement | null };

export function TimelineScrubber({
  years,
  activeYear,
  onYearClick,
}: TimelineScrubberProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const draggedRef = useRef(false);
  const DRAG_THRESHOLD = 5;

  // Track scroll edges
  const updateScrollEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollEdges();
    el.addEventListener("scroll", updateScrollEdges, { passive: true });
    window.addEventListener("resize", updateScrollEdges);
    return () => {
      el.removeEventListener("scroll", updateScrollEdges);
      window.removeEventListener("resize", updateScrollEdges);
    };
  }, [updateScrollEdges]);

  // Scroll the active year notch into view
  useEffect(() => {
    if (!activeYear || !scrollRef.current) return;
    const el = scrollRef.current.querySelector(
      `[data-year="${activeYear}"]`
    ) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeYear]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > DRAG_THRESHOLD) draggedRef.current = true;
      scrollRef.current.scrollLeft = scrollStartLeft.current - dx;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Reset after the click event fires (mouseup → click → rAF)
    requestAnimationFrame(() => { draggedRef.current = false; });
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    dragStartX.current = e.touches[0].clientX;
    scrollStartLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - dragStartX.current;
    if (Math.abs(dx) > DRAG_THRESHOLD) draggedRef.current = true;
    scrollRef.current.scrollLeft = scrollStartLeft.current - dx;
  }, []);

  const handleTouchEnd = useCallback(() => {
    requestAnimationFrame(() => { draggedRef.current = false; });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = activeYear != null ? years.indexOf(activeYear) : 0;
      let nextIndex = currentIndex;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          // Decrease year (older); years array is newest-first
          nextIndex = Math.min(currentIndex + 1, years.length - 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          // Increase year (newer)
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = years.length - 1;
          break;
        case "PageDown":
          nextIndex = Math.min(currentIndex + 10, years.length - 1);
          break;
        case "PageUp":
          nextIndex = Math.max(currentIndex - 10, 0);
          break;
        default:
          return;
      }

      e.preventDefault();
      if (nextIndex !== currentIndex) {
        onYearClick(years[nextIndex]);
      }
    },
    [years, activeYear, onYearClick]
  );

  return (
    <div ref={(el) => { scrubberRef.current = el; }} className="sticky z-40 chrome-bar border-b border-white/10" style={{ top: "var(--header-h, 65px)" }}>
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Edge fade: left */}
        <div
          className={`absolute left-0 top-0 bottom-0 z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1a1a1a] to-transparent" />
        </div>

        {/* Edge fade: right (always visible for depth) */}
        <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none">
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1a1a1a] via-[#1a1a1a]/70 to-transparent" />
        </div>

        <div
          ref={scrollRef}
          role="group"
          tabIndex={0}
          aria-label="Year selector"
          className="overflow-x-auto scrollbar-hide py-5 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
        >
          <div className="relative flex items-center min-w-max pb-7 pt-8">
            {/* The horizontal line - centered on notches */}
            <div className="absolute top-[calc(50%+2px)] left-0 right-0 h-[2px] bg-white/30" />

            {years.map((year) => {
              const isDecadeStart = year % 10 === 0 || year === years[0];
              const isFiveYear = year % 5 === 0;
              const isActive = activeYear === year;

              return (
                <button
                  key={year}
                  type="button"
                  data-year={year}
                  onClick={() => { if (!draggedRef.current) onYearClick(year); }}
                  aria-label={`Year ${year}`}
                  className="group relative flex flex-col items-center min-w-[44px] min-h-[44px] justify-center"
                  title={String(year)}
                >
                  {/* Year label above */}
                  {(isDecadeStart || isFiveYear) && (
                    <span
                      className={`absolute -top-6 text-xs font-medium transition-colors whitespace-nowrap ${
                        isActive ? "text-gold" : isDecadeStart ? "text-white/70 group-hover:text-white/90" : "text-white/50 group-hover:text-white/70"
                      }`}
                    >
                      {year === years[0] ? year : isDecadeStart ? `${year}s` : year}
                    </span>
                  )}

                  {/* Notch */}
                  {isActive ? (
                    <div className="w-5 h-5 rounded-full bg-gold shadow-[0_0_12px_rgba(184,149,62,0.6)] z-10" />
                  ) : isDecadeStart ? (
                    <div className="w-4 h-4 rounded-full bg-[#888] group-hover:bg-gold/80 group-hover:scale-110 transition-all z-10" />
                  ) : (
                    <div className="w-[2px] h-4 rounded-full bg-white/40 group-hover:w-[3px] group-hover:h-6 group-hover:bg-white/60 transition-all" />
                  )}

                  {/* Year label below active */}
                  {isActive && (
                    <span className="absolute -bottom-6 text-xs font-medium text-gold whitespace-nowrap">
                      {year}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
