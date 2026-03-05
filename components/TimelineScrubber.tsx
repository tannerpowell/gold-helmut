"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TimelineScrubberProps {
  years: number[];
  activeYear: number | null;
  onYearClick: (year: number) => void;
}

export function TimelineScrubber({
  years,
  activeYear,
  onYearClick,
}: TimelineScrubberProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const draggedRef = useRef(false);
  const DRAG_THRESHOLD = 5;

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

  return (
    <div className="sticky z-40 chrome-bar border-b border-white/10" style={{ top: "var(--header-h, 65px)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide py-5 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative flex items-center min-w-max pb-7 pt-8">
            {/* The horizontal line - centered on notches */}
            <div className="absolute top-[calc(50%+2px)] left-0 right-0 h-[2px] bg-white/15" />

            {years.map((year) => {
              const isDecadeStart = year % 10 === 0 || year === years[0];
              const isActive = activeYear === year;

              return (
                <button
                  key={year}
                  data-year={year}
                  onClick={() => { if (!draggedRef.current) onYearClick(year); }}
                  className="group relative flex flex-col items-center min-w-[44px] min-h-[44px] justify-center"
                  title={String(year)}
                >
                  {/* Decade label above */}
                  {isDecadeStart && (
                    <span
                      className={`absolute -top-6 text-xs font-medium transition-colors whitespace-nowrap ${
                        isActive ? "text-gold" : "text-white/50 group-hover:text-white/70"
                      }`}
                    >
                      {year === years[0] ? year : `${year}s`}
                    </span>
                  )}

                  {/* Notch */}
                  {isActive ? (
                    <div className="w-5 h-5 rounded-full bg-gold shadow-[0_0_12px_rgba(184,149,62,0.6)] z-10" />
                  ) : isDecadeStart ? (
                    <div className="w-4 h-4 rounded-full bg-white/35 group-hover:bg-gold/50 group-hover:scale-110 transition-all" />
                  ) : (
                    <div className="w-[2px] h-4 rounded-full bg-white/25 group-hover:w-[3px] group-hover:h-6 group-hover:bg-white/40 transition-all" />
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
