"use client";

import { useState } from "react";
import { AWARD_INFO } from "@/lib/constants";

const MAX_DONATION = 10_000;

const DONATION_TIERS = [50, 100, 250, 500, 1000];

export function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsed = customAmount ? parseFloat(customAmount) : selectedAmount;
  const clamped = Number.isFinite(parsed) && parsed > 0 ? Math.min(Math.round(parsed * 100) / 100, MAX_DONATION) : 0;
  const finalAmount = clamped;

  const handleDonate = async () => {
    if (finalAmount < 1 || finalAmount > MAX_DONATION || isLoading) return;
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      window.location.href = data.url;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      }
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  return (
    <section id="donate" className="py-24 lg:py-32 px-6 chrome-bar">
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
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
            {DONATION_TIERS.map((amount) => {
              const isActive =
                selectedAmount === amount && !customAmount;
              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={`p-4 border font-medium transition-all ${
                    isActive
                      ? "bg-gold text-[#1a1a1a] border-gold"
                      : "bg-transparent text-white border-white/20 hover:border-gold/50"
                  }`}
                >
                  <div className="text-lg">${amount}</div>
                </button>
              );
            })}
          </div>

          {/* Custom Amount */}
          <div>
            <label htmlFor="custom-amount" className="block text-sm font-medium text-white mb-2">
              Or enter a custom amount:
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-white/50 font-medium">
                $
              </span>
              <input
                id="custom-amount"
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  if (e.target.value) setSelectedAmount(0);
                }}
                className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                placeholder="Enter amount"
                min="1"
                max={MAX_DONATION}
              />
            </div>
          </div>
        </div>

        {/* Error message */}
        <div aria-live="polite" className={error ? "mb-4" : ""}>
          {error && (
            <p className="p-3 bg-red-900/30 border border-red-500/50 text-red-200 text-sm">
              {error}
            </p>
          )}
        </div>

        {/* Donate Button */}
        <button
          type="button"
          onClick={handleDonate}
          disabled={finalAmount < 1 || isLoading}
          className="w-full py-4 bg-gold text-[#1a1a1a] font-semibold text-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Redirecting..."
            : finalAmount > 0
              ? `Donate $${finalAmount.toFixed(2)}`
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
