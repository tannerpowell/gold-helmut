import { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Nominate a Player | Gold Helmet Award",
  description:
    "Nominate a Colorado Senior Football player who exemplifies character, leadership, and excellence on and off the field.",
};

export default function NominatePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Cinematic header band */}
      <div className="chrome-bar py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="h-px w-16 bg-gold mb-6" />
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Get Involved
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-medium italic text-white mb-4">
            Nominate a Player
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-xl">
            Know a Colorado Senior Football player who exemplifies character,
            leadership, and excellence on and off the field? Coaches and athletic
            directors are encouraged to nominate their top candidates.
          </p>
        </div>
      </div>

      {/* Form section */}
      <ApplicationForm standalone />
    </main>
  );
}
