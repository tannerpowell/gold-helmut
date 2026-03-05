"use client";

import Image from "next/image";
import { Winner } from "@/lib/constants";
import { getWinnerImage } from "@/lib/image-manifest";
import { getInitials, handleActivateKey } from "@/lib/utils";

const DEFAULT_FOCAL_POINT = "50% 20%";

interface WinnerCardProps {
  winner: Winner;
  variant?: "grid" | "timeline";
  onClick?: () => void;
}

function Initials({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gold/20 rounded-[inherit]">
      <span className="font-display text-2xl font-medium text-gold">
        {getInitials(name)}
      </span>
    </div>
  );
}

export function WinnerCard({ winner, variant = "grid", onClick }: WinnerCardProps) {
  const image = getWinnerImage(
    winner.year,
    variant === "timeline" ? "thumb" : "portrait"
  );

  if (variant === "timeline") {
    return (
      <div
        className={`group flex gap-6 items-start${onClick ? " cursor-pointer" : ""}`}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={handleActivateKey(onClick)}
      >
        <div className="relative w-[8.5rem] h-[8.5rem] md:w-[10.75rem] md:h-[10.75rem] flex-shrink-0 rounded-full overflow-hidden border-[5px] border-[#fafafa] dark:border-[#fafafa] shadow-md bg-surface-elevated transition-transform duration-200 ease-in-out group-hover:scale-[1.04]">
          {image ? (
            <Image
              src={image.jpg}
              alt={winner.name}
              fill
              className="object-cover"
              style={{ objectPosition: image.focalPoint ?? DEFAULT_FOCAL_POINT }}
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
    <div
      className={`group bg-surface border border-border overflow-hidden hover:shadow-lg transition-all hover:border-b-gold hover:border-b-2${onClick ? " cursor-pointer" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleActivateKey(onClick)}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] bg-surface-elevated">
        {image ? (
          <Image
            src={image.jpg}
            alt={winner.name}
            fill
            className="object-cover"
            style={{ objectPosition: image.focalPoint ?? DEFAULT_FOCAL_POINT }}
            sizes="400px"
          />
        ) : (
          <Initials name={winner.name} />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="border-b border-gold/20 pb-3 mb-4">
          <p className="text-gold text-lg font-display font-semibold tracking-wide">
            {winner.year}
          </p>
        </div>
        <h3 className="font-display font-semibold text-xl text-foreground mb-2">
          {winner.name}
        </h3>
        <p className="text-sm text-secondary mb-1">{winner.school}</p>
        {(winner.position || winner.college) && (
          <p className="text-sm font-medium text-foreground">
            {winner.position && <span>{winner.position}</span>}
            {winner.position && winner.college && " \u2022 "}
            {winner.college}
          </p>
        )}
      </div>
    </div>
  );
}
