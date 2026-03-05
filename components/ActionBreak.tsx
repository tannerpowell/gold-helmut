import Image from "next/image";

export interface ActionBreakProps {
  imageSrc: string;
  alt: string;
  athleteName: string;
  year: number;
  matchup: string;
  photoCredit: string;
}

export function ActionBreak({
  imageSrc,
  alt,
  athleteName,
  year,
  matchup,
  photoCredit,
}: ActionBreakProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Cinematic aspect container */}
      <div className="relative w-full" style={{ aspectRatio: "2.35 / 1" }}>
        {/* The photo */}
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition: "55% 30%" }}
          sizes="100vw"
          quality={90}
        />

        {/* Film-grain overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette: dark edges, bright center */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.7)] pointer-events-none" />

        {/* Bottom fade to black for the caption strip */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

        {/* Caption strip: press-photo style */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-5 md:pb-6">
          <div className="max-w-6xl mx-auto flex items-end justify-between gap-4">
            <div>
              <p className="font-display italic text-white/90 text-lg md:text-xl leading-snug">
                {athleteName}
                <span className="text-gold ml-2 text-sm md:text-base not-italic font-medium tracking-wide">
                  {year} Gold Helmet
                </span>
              </p>
              <p className="text-white/40 text-xs md:text-sm mt-1 tracking-wide">
                {matchup}
              </p>
            </div>
            <p className="text-white/20 text-[10px] md:text-xs tracking-wider uppercase hidden sm:block">
              {photoCredit}
            </p>
          </div>
        </div>
      </div>

      {/* Thin gold rule at the bottom edge */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
