"use client";

import { useState } from "react";
import { COLORS } from "@/lib/constants";

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.name || !formData.school || !formData.position || !formData.year) {
      setError("Please fill in all required fields.");
      return;
    }

    // TODO: Send form data to backend
    // For now, just show success message
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

  return (
    <section id="apply" className="py-16 px-6" style={{ backgroundColor: COLORS.light }}>
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-4xl font-bold mb-2 text-center"
          style={{ color: COLORS.primary }}
        >
          Apply for the Gold Helmet Award
        </h2>
        <p
          className="text-center mb-12"
          style={{ color: COLORS.textMuted }}
        >
          Submit your application to be considered for this prestigious honor.
        </p>

        {submitted ? (
          <div
            className="p-6 rounded-lg border-2 text-center"
            style={{
              backgroundColor: "#ecfdf5",
              borderColor: "#10b981",
            }}
          >
            <p
              className="font-semibold mb-2"
              style={{ color: "#059669" }}
            >
              ✓ Application Submitted
            </p>
            <p style={{ color: "#059669" }}>
              Thank you for applying! We'll review your submission and be in touch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div
                className="p-4 rounded-lg border-2"
                style={{
                  backgroundColor: "#fef2f2",
                  borderColor: "#ef4444",
                }}
              >
                <p style={{ color: "#dc2626" }}>{error}</p>
              </div>
            )}

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: COLORS.primary }}
              >
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2"
                style={{
                  borderColor: COLORS.border,
                }}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: COLORS.primary }}
              >
                High School *
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2"
                style={{
                  borderColor: COLORS.border,
                }}
                placeholder="Your High School"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: COLORS.primary }}
                >
                  Position *
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border-2"
                  style={{
                    borderColor: COLORS.border,
                  }}
                  placeholder="QB, LB, WR, etc."
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: COLORS.primary }}
                >
                  Graduation Year *
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border-2"
                  style={{
                    borderColor: COLORS.border,
                  }}
                  placeholder="2025"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: COLORS.primary }}
              >
                GPA (Optional)
              </label>
              <input
                type="number"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2"
                style={{
                  borderColor: COLORS.border,
                }}
                placeholder="3.8"
                min="0"
                max="4"
                step="0.01"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: COLORS.primary }}
              >
                Link to Highlights Video (Optional)
              </label>
              <input
                type="url"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2"
                style={{
                  borderColor: COLORS.border,
                }}
                placeholder="https://youtube.com/..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              style={{
                backgroundColor: COLORS.accent,
                color: COLORS.primary,
              }}
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
