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
      scrollRef.current.scrollLeft = scrollStartLeft.current - dx;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="sticky top-[65px] z-40 chrome-bar border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide py-5 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative flex items-end min-w-max pb-7">
            {/* The horizontal line */}
            <div className="absolute bottom-7 left-0 right-0 h-[2px] bg-white/15" />

            {years.map((year) => {
              const isDecadeStart = year % 10 === 0 || year === years[0];
              const isActive = activeYear === year;

              return (
                <button
                  key={year}
                  data-year={year}
                  onClick={() => onYearClick(year)}
                  className="group relative flex flex-col items-center min-w-[44px] min-h-[44px] justify-end"
                  title={String(year)}
                >
                  {/* Decade label above */}
                  {isDecadeStart && (
                    <span
                      className={`text-xs font-medium mb-3 transition-colors ${
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
                    <div className="w-[3px] h-4 rounded-sm bg-white/25 group-hover:w-4 group-hover:h-4 group-hover:rounded-full group-hover:bg-white/40 transition-all" />
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
