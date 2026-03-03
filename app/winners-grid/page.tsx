"use client";

import { useState } from "react";
import { WINNERS_BY_YEAR, DECADES } from "@/lib/constants";
import { WinnerCard } from "@/components/WinnerCard";

export default function WinnersGrid() {
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWinners = WINNERS_BY_YEAR.filter((w) => {
    const matchesDecade = selectedDecade
      ? w.year >= selectedDecade && w.year < selectedDecade + 10
      : true;
    const matchesSearch = w.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesDecade && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="py-24 px-6 chrome-bar">
        <div className="max-w-6xl mx-auto">
          <div className="h-px w-16 bg-gold mb-6" />
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Hall of Champions
          </p>
          <h1 className="font-display italic text-5xl font-medium text-white mb-4">
            All Winners
          </h1>
          <p className="text-lg chrome-bar-text max-w-2xl">
            Seventy-five years of excellence. Explore by decade or search by
            name.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="py-8 px-6 bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Search by name
            </label>
            <input
              type="text"
              placeholder="Find a winner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 bg-surface border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Filter by decade
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDecade(null)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  !selectedDecade
                    ? "bg-gold text-[#1a1a1a]"
                    : "bg-surface border border-border text-foreground hover:border-gold/50"
                }`}
              >
                All
              </button>
              {DECADES.map((decade) => (
                <button
                  key={decade.value}
                  onClick={() => setSelectedDecade(decade.value)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    selectedDecade === decade.value
                      ? "bg-gold text-[#1a1a1a]"
                      : "bg-surface border border-border text-foreground hover:border-gold/50"
                  }`}
                >
                  {decade.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredWinners.length > 0 ? (
            <>
              <p className="text-sm text-secondary mb-8">
                Showing {filteredWinners.length} winner
                {filteredWinners.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWinners.map((winner) => (
                  <WinnerCard key={winner.year} winner={winner} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-secondary text-lg">
                No winners found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
