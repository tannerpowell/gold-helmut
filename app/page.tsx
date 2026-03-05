import { HeroSection } from "@/components/HeroSection";
import { ActionBreak } from "@/components/ActionBreak";
import { ApplicationForm } from "@/components/ApplicationForm";
import { DonateSection } from "@/components/DonateSection";
import { AWARD_INFO } from "@/lib/constants";

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Mission Section */}
      <section className="py-24 lg:py-32 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="h-px w-16 bg-gold mb-6" />
            <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
              Since {AWARD_INFO.founded}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium italic text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-secondary leading-relaxed mb-6">
              The Gold Helmet Award has recognized the best of Colorado high
              school football for {AWARD_INFO.yearsOfHistory} years. More than
              just athletic talent, the award honors young men who demonstrate
              exceptional character, leadership, and academic commitment.
            </p>
            <p className="text-lg text-secondary leading-relaxed">
              Each year, the {AWARD_INFO.charity} awards a $
              {AWARD_INFO.scholarshipAmount.toLocaleString()} scholarship to the
              winner, supporting their journey from the high school field to
              college and beyond.
            </p>
          </div>
        </div>
      </section>

      <ActionBreak
        imageSrc="/images/optimized/elian-oliva-action.jpg"
        alt="Elian Oliva shedding a block during Northfield vs Skyline"
        athleteName="Elian Oliva"
        year={2025}
        matchup="Northfield vs. Skyline"
        photoCredit="The Denver Post / Tanner Hogan"
      />
      <ApplicationForm />
      <DonateSection />
    </main>
  );
}
