"use client";

import { useState } from "react";

import { NOMINATION_EMAILS } from "@/lib/constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    athleteName: "",
    school: "",
    position: "",
    gpa: "",
    inTheClassroom: "",
    inTheCommunity: "",
    onTheField: "",
    collegeInterest: "",
    videoLink: "",
    nominatorName: "",
    nominatorContact: "",
  });
  const [error, setError] = useState("");
  const [contactError, setContactError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "nominatorContact") setContactError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setContactError("");

    const required = [
      "athleteName",
      "school",
      "position",
      "gpa",
      "nominatorName",
      "nominatorContact",
    ] as const;
    if (required.some((k) => !formData[k].trim())) {
      setError("Please fill in all required fields.");
      return;
    }

    const contact = formData.nominatorContact.trim();
    if (!EMAIL_RE.test(contact) && !PHONE_RE.test(contact)) {
      setContactError("Please enter a valid email address or phone number.");
      return;
    }

    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 6) {
      setError("GPA must be between 0 and 6.0.");
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
        `GPA: ${formData.gpa}`,
        formData.inTheClassroom
          ? `In the Classroom: ${formData.inTheClassroom}`
          : null,
        formData.inTheCommunity
          ? `In the Community: ${formData.inTheCommunity}`
          : null,
        formData.onTheField
          ? `On the Field: ${formData.onTheField}`
          : null,
        formData.collegeInterest
          ? `College Interest: ${formData.collegeInterest}`
          : null,
        formData.videoLink ? `Video: ${formData.videoLink}` : null,
        ``,
        `Nominated by: ${formData.nominatorName}`,
        `Contact: ${formData.nominatorContact}`,
      ]
        .filter((line) => line !== null)
        .join("\n")
    );
    window.location.href = `mailto:${NOMINATION_EMAILS}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-surface border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";
  const inputErrorClasses =
    "w-full px-4 py-3 bg-surface border border-red-400 dark:border-red-600 text-foreground focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400 transition-colors";

  return (
    <section className="py-12 lg:py-16 px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        {submitted && (
          <div className="p-6 bg-gold/10 border border-gold/30 mb-8">
            <p className="text-foreground font-medium mb-1">
              Your email client should have opened with the nomination.
            </p>
            <p className="text-secondary text-sm">
              If it didn&apos;t, please use the contact form in the footer to reach us.
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
                  className={contactError ? inputErrorClasses : inputClasses}
                  placeholder="coach@school.edu"
                />
                {contactError && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {contactError}
                  </p>
                )}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  htmlFor="gpa"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  GPA *
                </label>
                <input
                  id="gpa"
                  type="number"
                  name="gpa"
                  required
                  min="0"
                  max="6"
                  step="0.01"
                  value={formData.gpa}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="3.8"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="inTheClassroom"
                className="block text-sm font-medium text-foreground mb-2"
              >
                In the Classroom
              </label>
              <textarea
                id="inTheClassroom"
                name="inTheClassroom"
                value={formData.inTheClassroom}
                onChange={handleChange}
                className={`${inputClasses} min-h-[80px] resize-y`}
                placeholder="Academic achievements, honors, AP courses..."
              />
            </div>

            <div>
              <label
                htmlFor="inTheCommunity"
                className="block text-sm font-medium text-foreground mb-2"
              >
                In the Community
              </label>
              <textarea
                id="inTheCommunity"
                name="inTheCommunity"
                value={formData.inTheCommunity}
                onChange={handleChange}
                className={`${inputClasses} min-h-[80px] resize-y`}
                placeholder="Community involvement, volunteer work, leadership roles..."
              />
            </div>

            <div>
              <label
                htmlFor="onTheField"
                className="block text-sm font-medium text-foreground mb-2"
              >
                On the Field
              </label>
              <textarea
                id="onTheField"
                name="onTheField"
                value={formData.onTheField}
                onChange={handleChange}
                className={`${inputClasses} min-h-[80px] resize-y`}
                placeholder="Stats, awards, athletic accomplishments..."
              />
            </div>

            <div>
              <label
                htmlFor="collegeInterest"
                className="block text-sm font-medium text-foreground mb-2"
              >
                College Interest
              </label>
              <input
                id="collegeInterest"
                type="text"
                name="collegeInterest"
                value={formData.collegeInterest}
                onChange={handleChange}
                className={inputClasses}
                placeholder="University name (if interested or committed)"
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
            className="w-full py-4 rounded-lg bg-gradient-to-b from-[#cfb67a] via-[#b8a06a] to-[#8e7a4a] text-[#1a1a1a] font-semibold text-lg shadow-[inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15),0_4px_0_#7a6a3e,0_6px_16px_rgba(160,130,70,0.35)] hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15),0_2px_0_#7a6a3e,0_3px_8px_rgba(160,130,70,0.3)] hover:translate-y-[2px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_0px_0_#7a6a3e] active:translate-y-[4px] transition-all duration-100"
          >
            Submit Nomination
          </button>
        </form>
      </div>
    </section>
  );
}
