"use client";

import { useState } from "react";
import { AWARD_INFO } from "@/lib/constants";

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    athleteName: "",
    school: "",
    position: "",
    year: "",
    gpa: "",
    communityService: "",
    collegeCommitment: "",
    videoLink: "",
    nominatorName: "",
    nominatorContact: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const required = [
      "athleteName",
      "school",
      "position",
      "year",
      "gpa",
      "communityService",
      "nominatorName",
      "nominatorContact",
    ] as const;
    if (required.some((k) => !formData[k].trim())) {
      setError("Please fill in all required fields.");
      return;
    }

    const subject = encodeURIComponent(
      `Gold Helmet Nomination \u2013 ${formData.athleteName}`
    );
    const body = encodeURIComponent(
      [
        `Athlete: ${formData.athleteName}`,
        `School: ${formData.school}`,
        `Position: ${formData.position}`,
        `Graduation Year: ${formData.year}`,
        `GPA: ${formData.gpa}`,
        `Community Service: ${formData.communityService}`,
        formData.collegeCommitment
          ? `College Commitment: ${formData.collegeCommitment}`
          : null,
        formData.videoLink ? `Video: ${formData.videoLink}` : null,
        ``,
        `Nominated by: ${formData.nominatorName}`,
        `Contact: ${formData.nominatorContact}`,
      ]
        .filter((line) => line !== null)
        .join("\n")
    );
    window.location.href = `mailto:${AWARD_INFO.contactEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-surface border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";

  return (
    <section id="nominate" className="py-24 lg:py-32 px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="h-px w-16 bg-gold mb-6" />
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Get Involved
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium italic text-foreground mb-4">
            Nominate a Player
          </h2>
          <p className="text-lg text-secondary leading-relaxed">
            Know a student-athlete who exemplifies character, leadership, and
            excellence on and off the field? Coaches and athletic directors are
            encouraged to nominate their top candidates.
          </p>
        </div>

        {submitted && (
          <div className="p-6 bg-gold/10 border border-gold/30 mb-8">
            <p className="text-foreground font-medium mb-1">
              Your email client should have opened.
            </p>
            <p className="text-secondary text-sm">
              If it didn&apos;t, send the nomination directly to{" "}
              <a
                href={`mailto:${AWARD_INFO.contactEmail}`}
                className="text-gold underline"
              >
                {AWARD_INFO.contactEmail}
              </a>
              .
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Nominator Info */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium text-gold uppercase tracking-[0.15em] mb-2">
              Nominator Information
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nominatorName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Your Name *
                </label>
                <input
                  id="nominatorName"
                  type="text"
                  name="nominatorName"
                  required
                  value={formData.nominatorName}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Coach / AD name"
                />
              </div>
              <div>
                <label
                  htmlFor="nominatorContact"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Your Email or Phone *
                </label>
                <input
                  id="nominatorContact"
                  type="text"
                  name="nominatorContact"
                  required
                  value={formData.nominatorContact}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="coach@school.edu"
                />
              </div>
            </div>
          </fieldset>

          {/* Athlete Info */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium text-gold uppercase tracking-[0.15em] mb-2">
              Athlete Information
            </legend>

            <div>
              <label
                htmlFor="athleteName"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Athlete Full Name *
              </label>
              <input
                id="athleteName"
                type="text"
                name="athleteName"
                required
                value={formData.athleteName}
                onChange={handleChange}
                className={inputClasses}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="school"
                className="block text-sm font-medium text-foreground mb-2"
              >
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-foreground mb-2"
                >
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
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-foreground mb-2"
                >
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
                  placeholder="2026"
                />
              </div>
              <div>
                <label
                  htmlFor="gpa"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  GPA *
                </label>
                <input
                  id="gpa"
                  type="text"
                  name="gpa"
                  required
                  value={formData.gpa}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="3.8"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="communityService"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Community Service *
              </label>
              <textarea
                id="communityService"
                name="communityService"
                required
                value={formData.communityService}
                onChange={handleChange}
                className={`${inputClasses} min-h-[100px] resize-y`}
                placeholder="Describe community involvement, volunteer work, leadership roles..."
              />
            </div>

            <div>
              <label
                htmlFor="collegeCommitment"
                className="block text-sm font-medium text-foreground mb-2"
              >
                College Commitment
              </label>
              <input
                id="collegeCommitment"
                type="text"
                name="collegeCommitment"
                value={formData.collegeCommitment}
                onChange={handleChange}
                className={inputClasses}
                placeholder="University name (if committed)"
              />
            </div>

            <div>
              <label
                htmlFor="videoLink"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Highlights Video Link
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
          </fieldset>

          <button
            type="submit"
            className="w-full py-3 bg-gold text-[#1a1a1a] font-medium hover:brightness-110 transition-all"
          >
            Submit Nomination
          </button>
        </form>
      </div>
    </section>
  );
}
