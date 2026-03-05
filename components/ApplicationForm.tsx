"use client";

import { useState } from "react";
import { AWARD_INFO } from "@/lib/constants";

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    position: "",
    year: "",
    gpa: "",
    videoLink: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.school ||
      !formData.position ||
      !formData.year
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Mailto fallback until a backend endpoint exists
    const subject = encodeURIComponent(
      `Gold Helmet Award Application – ${formData.name}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `School: ${formData.school}`,
        `Position: ${formData.position}`,
        `Graduation Year: ${formData.year}`,
        formData.gpa ? `GPA: ${formData.gpa}` : null,
        formData.videoLink ? `Video: ${formData.videoLink}` : null,
      ]
        .filter(Boolean)
        .join("\n")
    );
    window.location.href = `mailto:${AWARD_INFO.contactEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-surface border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";

  return (
    <section
      id="apply"
      className="py-24 lg:py-32 px-6 bg-background"
    >
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="h-px w-16 bg-gold mb-6" />
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Get Involved
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium italic text-foreground mb-4">
            Apply for the Award
          </h2>
          <p className="text-lg text-secondary leading-relaxed">
            Show us your character, leadership, and excellence on and off the
            field.
          </p>
        </div>

        {submitted && (
          <div className="p-6 bg-gold/10 border border-gold/30 mb-8">
            <p className="text-foreground font-medium mb-1">Your email client should have opened.</p>
            <p className="text-secondary text-sm">
              If it didn&apos;t, send your application directly to{" "}
              <a href={`mailto:${AWARD_INFO.contactEmail}`} className="text-gold underline">
                {AWARD_INFO.contactEmail}
              </a>.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="school" className="block text-sm font-medium text-foreground mb-2">
                High School *
              </label>
              <input
                id="school"
                type="text"
                name="school"
                required
                value={formData.school}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Your High School"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-foreground mb-2">
                  Position *
                </label>
                <input
                  id="position"
                  type="text"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="QB, LB, WR"
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-foreground mb-2">
                  Graduation Year *
                </label>
                <input
                  id="year"
                  type="number"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="2025"
                />
              </div>
            </div>

            <div>
              <label htmlFor="gpa" className="block text-sm font-medium text-foreground mb-2">
                GPA (Optional, 0–6.0 scale)
              </label>
              <input
                id="gpa"
                type="number"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                className={inputClasses}
                placeholder="3.8"
                min="0"
                max="6"
                step="0.01"
              />
            </div>

            <div>
              <label htmlFor="videoLink" className="block text-sm font-medium text-foreground mb-2">
                Highlights Video Link (Optional)
              </label>
              <input
                id="videoLink"
                type="url"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleChange}
                className={inputClasses}
                placeholder="https://youtube.com/..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gold text-[#1a1a1a] font-medium hover:brightness-110 transition-all"
            >
              Submit Application
            </button>
          </form>
      </div>
    </section>
  );
}
