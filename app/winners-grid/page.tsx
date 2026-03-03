"use client";

import { useState } from "react";
import { getRecentWinners, DECADES, COLORS, WINNERS_BY_YEAR } from "@/lib/constants";
import { WinnerCard } from "@/components/WinnerCard";

export default function WinnersGrid() {
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter winners based on selection
  const filteredWinners = selectedDecade
    ? WINNERS_BY_YEAR.filter(
        (w) =>
          w.year >= selectedDecade &&
          w.year < selectedDecade + 10 &&
          w.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : WINNERS_BY_YEAR.filter((w) =>
        w.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const recentWinners = getRecentWinners(12);

  return (
    <div style={{ backgroundColor: COLORS.light, minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1
          className="text-5xl font-bold mb-4 text-center"
          style={{ color: COLORS.primary }}
        >
          Winners Grid
        </h1>
        <p
          className="text-lg text-center mb-12"
          style={{ color: COLORS.textMuted }}
        >
          Explore all winners. Filter by decade or search by name.
        </p>

        {/* Recent Winners Hero */}
        <div className="mb-16">
          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: COLORS.primary }}
          >
            2025 Winner
          </h2>
          <div className="mb-8">
            <WinnerCard winner={recentWinners[0]} />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-4">
          <div>
            <label
              className="block text-sm font-semibold mb-3"
              style={{ color: COLORS.primary }}
            >
              Search by name:
            </label>
            <input
              type="text"
              placeholder="Search winners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2"
              style={{
                borderColor: COLORS.border,
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-3"
              style={{ color: COLORS.primary }}
            >
              Filter by decade:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDecade(null)}
                className="px-4 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: !selectedDecade ? COLORS.accent : COLORS.light,
                  borderColor: COLORS.border,
                  color: !selectedDecade ? COLORS.primary : COLORS.primary,
                  border: "2px solid",
                }}
              >
                All
              </button>
              {DECADES.map((decade) => (
                <button
                  key={decade.value}
                  onClick={() => setSelectedDecade(decade.value)}
                  className="px-4 py-2 rounded-lg font-semibold transition-all border-2"
                  style={{
                    backgroundColor:
                      selectedDecade === decade.value
                        ? COLORS.accent
                        : COLORS.light,
                    borderColor:
                      selectedDecade === decade.value
                        ? COLORS.accent
                        : COLORS.border,
                    color: COLORS.primary,
                  }}
                >
                  {decade.label}
                </button>
              ))}
            </div>
          </div>

          {filteredWinners.length > 0 && (
            <p
              className="text-sm"
              style={{ color: COLORS.textMuted }}
            >
              Showing {filteredWinners.length} winner{filteredWinners.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Grid */}
        {filteredWinners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWinners.map((winner) => (
              <WinnerCard key={winner.year} winner={winner} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-12 rounded-lg border-2"
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              borderColor: COLORS.border,
            }}
          >
            <p style={{ color: COLORS.textMuted }}>
              No winners found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
