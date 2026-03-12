import { Metadata } from "next";
import Image from "next/image";
import { ApplicationForm } from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Nominate a Player | Gold Helmet Award",
  description:
    "Nominate a Colorado Senior Football player who exemplifies character, leadership, and excellence on and off the field.",
};

export default function NominatePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero band with action photo */}
      <div className="relative min-h-[280px] md:min-h-[400px] overflow-hidden">
        {/* Background photo */}
        <Image
          src="/images/action/2023-josh-snyder-action.jpg"
          alt="Gold Helmet winner breaking a tackle in the 5A state championship"
          fill
          className="object-cover object-[50%_40%]"
          priority
          quality={85}
          sizes="(min-width: 1280px) 1280px, 100vw"
        />

        {/* Gradient overlays: dark sweep from left for text, vignette at bottom for transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />

        {/* Content */}
        <div className="relative z-10 px-6 pt-32 md:pt-48 pb-12 md:pb-16">
          <div className="max-w-2xl mx-auto w-full">
            <div className="h-px w-16 bg-gold mb-6" />
            <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
              Get Involved
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-medium italic text-white mb-4">
              Nominate a Player
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              Know a Colorado Senior Football player who exemplifies character,
              leadership, and excellence on and off the field? Coaches and athletic
              directors are encouraged to nominate their top candidates.
            </p>
          </div>
        </div>
      </div>

      {/* Form section */}
      <ApplicationForm />
    </main>
  );
}
