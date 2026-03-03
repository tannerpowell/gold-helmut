"use client";

import { WINNERS_BY_YEAR } from "@/lib/constants";
import { WinnerCard } from "@/components/WinnerCard";

export default function WinnersTimeline() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="py-24 px-6 chrome-bar">
        <div className="max-w-6xl mx-auto">
          <div className="h-px w-16 bg-gold mb-6" />
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Year by Year
          </p>
          <h1 className="font-display italic text-5xl font-medium text-white mb-4">
            Winners Timeline
          </h1>
          <p className="text-lg chrome-bar-text max-w-2xl">
            Seventy-five years of award recipients, from 2025 back to 1951.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto relative">
          {/* Gold vertical timeline line */}
          <div className="absolute left-0 md:left-12 top-0 bottom-0 w-px bg-gold/20" />

          <div className="space-y-10 pl-8 md:pl-24">
            {WINNERS_BY_YEAR.map((winner, i) => (
              <div key={winner.year} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-8 md:-left-24 top-3 w-3 h-3 rounded-full bg-gold border-2 border-background" />

                {/* Decade marker */}
                {(i === 0 || Math.floor(winner.year / 10) !== Math.floor(WINNERS_BY_YEAR[i - 1].year / 10)) && (
                  <div className="mb-4">
                    <span className="font-display text-2xl font-medium text-gold">
                      {Math.floor(winner.year / 10) * 10}s
                    </span>
                  </div>
                )}

                <WinnerCard winner={winner} variant="timeline" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
