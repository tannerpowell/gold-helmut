import { HeroSection } from "@/components/HeroSection";
import { ApplicationForm } from "@/components/ApplicationForm";
import { DonateSection } from "@/components/DonateSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ApplicationForm />
      <DonateSection />
    </main>
  );
}
