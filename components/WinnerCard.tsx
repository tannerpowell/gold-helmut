"use client";

import Image from "next/image";
import { Winner, COLORS } from "@/lib/constants";
import { getWinnerImage } from "@/lib/image-manifest";

interface WinnerCardProps {
  winner: Winner;
  showYear?: boolean;
}

export function WinnerCard({ winner, showYear = true }: WinnerCardProps) {
  const image = getWinnerImage(winner.year, "portrait");

  return (
    <div
      className="rounded-lg border-2 p-6 transition-all hover:shadow-lg overflow-hidden"
      style={{
        backgroundColor: COLORS.light,
        borderColor: COLORS.border,
      }}
    >
      {image && (
        <div className="mb-4 relative w-full h-64 rounded-lg overflow-hidden bg-slate-200">
          <Image
            src={image.jpg}
            alt={`${winner.name} - ${winner.year}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
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
