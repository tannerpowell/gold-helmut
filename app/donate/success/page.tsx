import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { AWARD_INFO } from "@/lib/constants";

export const metadata = {
  title: `Thank You — ${AWARD_INFO.name}`,
};

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let amount: string | null = null;

  if (session_id) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      if (session.amount_total) {
        amount = (session.amount_total / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    } catch {
      // Invalid session ID, just show generic thank-you
    }
  }

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <div className="h-px w-16 bg-gold mx-auto mb-6" />
        <h1 className="font-display text-3xl md:text-4xl font-medium italic text-foreground mb-4">
          Thank You
        </h1>
        <p className="text-lg text-secondary leading-relaxed mb-2">
          {amount
            ? `Your ${amount} donation to ${AWARD_INFO.charity} has been received.`
            : `Your donation to ${AWARD_INFO.charity} has been received.`}
        </p>
        <p className="text-sm text-secondary mb-8">
          A receipt has been sent to your email. Your gift directly funds
          scholarships for Colorado student-athletes.
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
