"use client";

import Image from "next/image";
import { Winner } from "@/lib/constants";
import { getWinnerImage } from "@/lib/image-manifest";

interface WinnerCardProps {
  winner: Winner;
  variant?: "grid" | "timeline";
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gold/20 rounded-[inherit]">
      <span className="font-display text-2xl font-medium text-gold">
        {initials}
      </span>
    </div>
  );
}

export function WinnerCard({ winner, variant = "grid" }: WinnerCardProps) {
  const image = getWinnerImage(
    winner.year,
    variant === "timeline" ? "thumb" : "portrait"
  );

  if (variant === "timeline") {
    return (
      <div className="flex gap-6 items-start">
        <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 rounded-full overflow-hidden border-[5px] border-[#fafafa] shadow-md bg-surface-elevated">
          {image ? (
            <Image
              src={image.jpg}
              alt={winner.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 144px, 112px"
            />
          ) : (
            <Initials name={winner.name} />
          )}
        </div>
        <div className="flex-1">
          <p className="text-gold text-xs font-medium uppercase tracking-[0.15em] mb-2">
            {winner.year}
          </p>
          <h3 className="font-display font-semibold text-lg text-foreground mb-1">
            {winner.name}
          </h3>
          <p className="text-sm text-secondary mb-1">{winner.school}</p>
          {(winner.position || winner.college) && (
            <p className="text-sm text-foreground">
              {winner.position && (
                <span className="font-medium">{winner.position}</span>
              )}
              {winner.position && winner.college && " \u2022 "}
              {winner.college}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-surface border border-border overflow-hidden hover:shadow-lg transition-all hover:border-b-gold hover:border-b-2">
      {/* Image */}
      <div className="relative w-full h-64 bg-surface-elevated">
        {image ? (
          <Image
            src={image.jpg}
            alt={winner.name}
            fill
            className="object-cover"
            sizes="400px"
          />
        ) : (
          <Initials name={winner.name} />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="border-b border-gold/20 pb-3 mb-4">
          <p className="text-gold text-xs font-medium uppercase tracking-[0.15em]">
            {winner.year}
          </p>
        </div>
        <h3 className="font-display font-semibold text-xl text-foreground mb-2">
          {winner.name}
        </h3>
        <p className="text-sm text-secondary mb-1">{winner.school}</p>
        {(winner.position || winner.college) && (
          <p className="text-sm font-medium text-foreground">
            {winner.position}
            {winner.position && winner.college && " \u2022 "}
            {winner.college}
          </p>
        )}
      </div>
    </div>
  );
}
