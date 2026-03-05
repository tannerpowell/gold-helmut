"use client";

import { WINNERS } from "@/lib/constants";

const schoolData = WINNERS.reduce<Record<string, number[]>>((acc, w) => {
  if (!acc[w.school]) acc[w.school] = [];
  acc[w.school].push(w.year);
  return acc;
}, {});

const leaderboard = Object.entries(schoolData)
  .map(([school, years]) => ({ school, years: [...years].sort((a, b) => a - b) }))
  .sort((a, b) => b.years.length - a.years.length || a.school.localeCompare(b.school));

interface SchoolLeaderboardProps {
  onYearClick?: (year: number) => void;
}

export function SchoolLeaderboard({ onYearClick }: SchoolLeaderboardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <h3 className="font-display italic text-lg font-medium text-foreground mb-4">
        Wins by School
      </h3>
      <table className="w-full">
        <tbody>
          {leaderboard.map(({ school, years }, i) => (
            <tr key={school} className="border-b border-border/50 last:border-0">
              <td className="py-2 pr-2 pl-3 text-foreground text-sm font-semibold tracking-wide align-baseline whitespace-nowrap" style={{ fontVariant: "all-small-caps" }}>
                {school}
              </td>
              <td className="py-2 px-2 font-display text-base font-bold text-foreground tabular-nums text-center align-baseline w-9">
                {years.length}
              </td>
              <td className="py-2 pl-1 text-[13px] tabular-nums align-baseline whitespace-nowrap">
                {years.map((year, j) => (
                  <span key={year}>
                    {j > 0 && <span className="text-secondary">, </span>}
                    <button
                      type="button"
                      onClick={() => onYearClick?.(year)}
                      className="text-gold hover:text-gold/70 active:scale-95 transition-colors cursor-pointer"
                    >
                      {year}
                    </button>
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
