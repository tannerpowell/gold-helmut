"use client";

import { useState } from "react";

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    position: "",
    year: "",
    gpa: "",
    videoLink: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        school: "",
        position: "",
        year: "",
        gpa: "",
        videoLink: "",
      });
    }, 3000);
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

        {submitted ? (
          <div className="p-8 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-center">
            <p className="font-display font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
              Application Submitted
            </p>
            <p className="text-emerald-800 dark:text-emerald-200">
              Thank you. We&apos;ll review your submission and be in touch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                High School *
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Your High School"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="QB, LB, WR"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Graduation Year *
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="2025"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                GPA (Optional)
              </label>
              <input
                type="number"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                className={inputClasses}
                placeholder="3.8"
                min="0"
                max="4"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Highlights Video Link (Optional)
              </label>
              <input
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
        )}
      </div>
    </section>
  );
}
