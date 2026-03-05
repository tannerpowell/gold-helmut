"use client";

import { useState } from "react";
import { AWARD_INFO } from "@/lib/constants";

const DONATION_TIERS = [
  { amount: 50, label: "Bronze" },
  { amount: 100, label: "Silver" },
  { amount: 250, label: "Gold" },
  { amount: 500, label: "Platinum" },
  { amount: 1000, label: "Title Sponsor" },
];

export function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const parsed = customAmount ? parseInt(customAmount) : selectedAmount;
  const finalAmount = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;

  const handleDonate = async () => {
    if (finalAmount < 1 || isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      window.location.href = data.url;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      alert(`Donation error: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 lg:py-32 px-6 chrome-bar">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="h-px w-16 bg-gold mx-auto mb-6" />
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Support the Mission
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium italic text-white mb-4">
            Fund a Scholarship
          </h2>
          <p className="text-lg chrome-bar-text leading-relaxed mb-4">
            Your donation directly funds ${AWARD_INFO.scholarshipAmount.toLocaleString()} scholarships
            for student-athletes who exemplify character, leadership, and
            excellence.
          </p>
          <p className="text-gold text-sm">
            {AWARD_INFO.charity} is a registered 501(c)(3) non-profit.
          </p>
        </div>

        {/* Donation Tiers */}
        <div className="mb-8">
          <p className="text-sm font-medium text-white mb-4">
            Select a donation amount:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {DONATION_TIERS.map((tier) => {
              const isActive =
                selectedAmount === tier.amount && !customAmount;
              return (
                <button
                  key={tier.amount}
                  onClick={() => {
                    setSelectedAmount(tier.amount);
                    setCustomAmount("");
                  }}
                  className={`p-4 border font-medium transition-all ${
                    isActive
                      ? "bg-gold text-[#1a1a1a] border-gold"
                      : "bg-transparent text-white border-white/20 hover:border-gold/50"
                  }`}
                >
                  <div className="text-lg">${tier.amount}</div>
                  <div className="text-xs opacity-70">{tier.label}</div>
                </button>
              );
            })}
          </div>

          {/* Custom Amount */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Or enter a custom amount:
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-white/50 font-medium">
                $
              </span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  if (e.target.value) setSelectedAmount(0);
                }}
                className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                placeholder="Enter amount"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Donate Button */}
        <button
          onClick={handleDonate}
          disabled={finalAmount < 1 || isLoading}
          className="w-full py-4 bg-gold text-[#1a1a1a] font-semibold text-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Redirecting..."
            : finalAmount > 0
              ? `Donate $${finalAmount}`
              : "Enter an amount"}
        </button>

        <p className="text-center text-sm text-white/40 mt-6">
          Your donation is secure and encrypted. We accept all major credit
          cards.
        </p>
      </div>
    </section>
  );
}
