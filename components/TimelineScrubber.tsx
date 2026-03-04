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
          className="overflow-x-auto scrollbar-hide py-3 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative flex items-center gap-0 min-w-max">
            {/* The horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />

            {years.map((year) => {
              const isDecadeStart = year % 10 === 0 || year === years[0];
              const isActive = activeYear === year;

              return (
                <button
                  key={year}
                  data-year={year}
                  onClick={() => onYearClick(year)}
                  className={`group relative flex flex-col items-center ${
                    isDecadeStart ? "px-3 md:px-4" : "px-2 md:px-2.5"
                  }`}
                  title={String(year)}
                >
                  {/* Decade label */}
                  {isDecadeStart && (
                    <span
                      className={`text-[10px] font-medium mb-1.5 transition-colors ${
                        isActive ? "text-gold" : "text-white/50"
                      }`}
                    >
                      {year === years[0] ? year : `${year}s`}
                    </span>
                  )}
                  {!isDecadeStart && <span className="h-[22px]" />}

                  {/* Notch: active = gold circle, decade = circle, others = dash that becomes circle on hover */}
                  {isActive ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-gold shadow-[0_0_8px_rgba(184,149,62,0.5)]" />
                  ) : isDecadeStart ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-white/40 group-hover:bg-gold/60 transition-all" />
                  ) : (
                    <div className="w-3 h-[3px] rounded-full bg-white/20 group-hover:w-2.5 group-hover:h-2.5 group-hover:rounded-full group-hover:bg-white/40 transition-all" />
                  )}

                  {/* Year label on active (non-decade) */}
                  {isActive && !isDecadeStart && (
                    <span className="absolute -bottom-5 text-[10px] font-medium text-gold whitespace-nowrap">
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
