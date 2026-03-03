"use client";

import { WINNERS_BY_YEAR, COLORS } from "@/lib/constants";
import { WinnerCard } from "@/components/WinnerCard";

export default function WinnersTimeline() {
  return (
    <div style={{ backgroundColor: COLORS.light, minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1
          className="text-5xl font-bold mb-4 text-center"
          style={{ color: COLORS.primary }}
        >
          Winners Timeline
        </h1>
        <p
          className="text-lg text-center mb-16"
          style={{ color: COLORS.textMuted }}
        >
          75 years of excellence. Chronological view of all Gold Helmet Award winners.
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 md:w-1 md:transform md:-translate-x-1/2"
            style={{ backgroundColor: COLORS.accent }}
          />

          {/* Winners */}
          <div className="space-y-12">
            {WINNERS_BY_YEAR.map((winner, index) => (
              <div
                key={winner.year}
                className={`md:flex gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:flex absolute left-1/2 top-8 w-6 h-6 rounded-full transform -translate-x-1/2 border-4 items-center justify-center"
                  style={{
                    backgroundColor: COLORS.light,
                    borderColor: COLORS.accent,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS.accent }}
                  />
                </div>

                {/* Content */}
                <div className="md:w-1/2 pl-8 md:pl-0">
                  <div className="mb-4">
                    <p
                      className="text-xs font-semibold uppercase"
                      style={{ color: COLORS.accent }}
                    >
                      {winner.year}
                    </p>
                  </div>
                  <WinnerCard winner={winner} showYear={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
