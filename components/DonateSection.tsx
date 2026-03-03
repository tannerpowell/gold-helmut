"use client";

import { useState } from "react";
import { AWARD_INFO, COLORS } from "@/lib/constants";

const DONATION_TIERS = [
  { amount: 50, label: "Bronze Supporter" },
  { amount: 100, label: "Silver Supporter" },
  { amount: 250, label: "Gold Supporter" },
  { amount: 500, label: "Platinum Supporter" },
  { amount: 1000, label: "Title Sponsor" },
];

export function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const handleDonate = () => {
    // TODO: Integrate with Stripe
    alert(`Donation of $${finalAmount} - Stripe integration coming soon`);
  };

  return (
    <section className="py-16 px-6" style={{ backgroundColor: COLORS.primary }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: COLORS.light }}
          >
            Support the Gold Helmet Award
          </h2>
          <p
            className="text-lg mb-4"
            style={{ color: "#cbd5e1" }} // slate-300
          >
            Your donation directly funds $1,000 scholarships for student-athletes who exemplify character, leadership, and excellence.
          </p>
          <p style={{ color: COLORS.accent }}>
            {AWARD_INFO.charity} is a registered 501(c)(3) non-profit organization.
          </p>
        </div>

        <div className="mb-12">
          <p
            className="text-sm font-semibold mb-4"
            style={{ color: COLORS.light }}
          >
            Select a donation amount:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {DONATION_TIERS.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => {
                  setSelectedAmount(tier.amount);
                  setCustomAmount("");
                }}
                className="p-4 rounded-lg border-2 transition-all font-semibold"
                style={{
                  backgroundColor:
                    selectedAmount === tier.amount && !customAmount
                      ? COLORS.accent
                      : "transparent",
                  borderColor:
                    selectedAmount === tier.amount && !customAmount
                      ? COLORS.accent
                      : COLORS.border,
                  color:
                    selectedAmount === tier.amount && !customAmount
                      ? COLORS.primary
                      : COLORS.light,
                }}
              >
                <div className="text-lg">${tier.amount}</div>
                <div className="text-xs">{tier.label}</div>
              </button>
            ))}
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: COLORS.light }}
            >
              Or enter a custom amount:
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span
                  className="absolute left-4 top-3 font-semibold"
                  style={{ color: COLORS.textMuted }}
                >
                  $
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) setSelectedAmount(0);
                  }}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border-2"
                  style={{
                    borderColor: COLORS.border,
                    backgroundColor: "#1e293b", // slate-800
                    color: COLORS.light,
                  }}
                  placeholder="Enter amount"
                  min="1"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleDonate}
          className="w-full py-4 rounded-lg font-bold text-lg transition-all hover:shadow-lg"
          style={{
            backgroundColor: COLORS.accent,
            color: COLORS.primary,
          }}
        >
          Donate ${finalAmount}
        </button>

        <p
          className="text-center text-sm mt-6"
          style={{ color: "#cbd5e1" }} // slate-300
        >
          Your donation is secure and encrypted. We accept all major credit cards.
        </p>
      </div>
    </section>
  );
}
