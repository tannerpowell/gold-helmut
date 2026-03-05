import Link from "next/link";
import { AWARD_INFO } from "@/lib/constants";

export const metadata = {
  title: `Donation Cancelled — ${AWARD_INFO.name}`,
};

export default function DonateCancelPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <div className="h-px w-16 bg-gold mx-auto mb-6" />
        <h1 className="font-display text-3xl md:text-4xl font-medium italic text-foreground mb-4">
          No Charge
        </h1>
        <p className="text-lg text-secondary leading-relaxed mb-8">
          Your donation was cancelled and you have not been charged.
          You can try again anytime.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gold text-[#1a1a1a] font-semibold hover:brightness-110 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
