"use client";

import { Winner, COLORS } from "@/lib/constants";

interface WinnerCardProps {
  winner: Winner;
  showYear?: boolean;
}

export function WinnerCard({ winner, showYear = true }: WinnerCardProps) {
  return (
    <div
      className="rounded-lg border-2 p-6 transition-all hover:shadow-lg"
      style={{
        backgroundColor: COLORS.light,
        borderColor: COLORS.border,
      }}
    >
      {winner.imageUrl && (
        <div className="mb-4 h-48 bg-gradient-to-b from-slate-300 to-slate-200 rounded-lg flex items-center justify-center text-slate-400">
          <span className="text-sm">Photo</span>
        </div>
      )}
      {showYear && (
        <p
          className="text-sm font-semibold mb-2"
          style={{ color: COLORS.accent }}
        >
          {winner.year}
        </p>
      )}
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: COLORS.primary }}
      >
        {winner.name}
      </h3>
      <p className="text-sm mb-1" style={{ color: COLORS.textMuted }}>
        {winner.school}
      </p>
      <p className="text-sm mb-2" style={{ color: COLORS.textMuted }}>
        {winner.position}
      </p>
      <p
        className="text-sm font-semibold"
        style={{ color: COLORS.primary }}
      >
        {winner.college}
      </p>
    </div>
  );
}
