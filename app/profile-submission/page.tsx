"use client";

import { useState } from "react";
import Image from "next/image";

type FormData = {
  name: string;
  yearWon: string;
  headline: string;
  bio: string;
  stat1Label: string; stat1Value: string;
  stat2Label: string; stat2Value: string;
  stat3Label: string; stat3Value: string;
  stat4Label: string; stat4Value: string;
  stat5Label: string; stat5Value: string;
  stat6Label: string; stat6Value: string;
  careerHighlight: string;
  academics: string;
  otherAchievement: string;
  community1: string;
  community2: string;
  community3: string;
  community4: string;
  playerQuote: string;
  coachQuote: string;
  coachName: string;
  nextChapterTitle: string;
  nextChapterSubtitle: string;
  actionPhotoUrl: string;
};

const empty: FormData = {
  name: "", yearWon: "", headline: "", bio: "",
  stat1Label: "", stat1Value: "", stat2Label: "", stat2Value: "",
  stat3Label: "", stat3Value: "", stat4Label: "", stat4Value: "",
  stat5Label: "", stat5Value: "", stat6Label: "", stat6Value: "",
  careerHighlight: "", academics: "", otherAchievement: "",
  community1: "", community2: "", community3: "", community4: "",
  playerQuote: "", coachQuote: "", coachName: "",
  nextChapterTitle: "", nextChapterSubtitle: "", actionPhotoUrl: "",
};

const inputClass =
  "w-full bg-surface border border-border rounded text-foreground placeholder:text-muted/50 px-4 py-3.5 text-base focus:outline-none focus:border-gold/60 transition-colors";
const labelClass =
  "block text-sm font-semibold uppercase tracking-[0.15em] text-gold/80 mb-2";
const hintClass = "text-muted text-sm mt-1.5";

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-12">
      <div className="md:pt-1">
        <div className="h-px w-10 bg-gold/40 mb-3" />
        <h2 className="font-display italic text-2xl text-foreground font-medium">
          {title}
        </h2>
        {hint && (
          <p className="text-muted text-sm mt-2 leading-relaxed">{hint}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export default function ProfileSubmission() {
  const [form, setForm] = useState<FormData>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.yearWon.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/profile-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong. Please try again or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="h-px w-12 bg-gold/30 mx-auto" />
          <h1 className="font-display italic text-4xl text-foreground font-medium">
            Thank you, {form.name.split(" ")[0]}.
          </h1>
          <p className="text-secondary text-base leading-relaxed">
            Your profile has been received. We&apos;ll be in touch once
            it&apos;s live on the site.
          </p>
          <p className="text-gold/50 text-sm uppercase tracking-[0.2em]">
            Gold Helmet Award
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Image
            src="/images/logo-256.png"
            alt="Gold Helmet Award"
            width={48}
            height={48}
            className="w-10 h-auto opacity-90"
          />
          <div>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em]">
              Gold Helmet Award
            </p>
            <h1 className="font-display italic text-3xl text-foreground font-medium leading-tight">
              Winner Profiles
            </h1>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="px-6 pt-10 pb-2">
        <div className="max-w-4xl mx-auto">
          <p className="text-secondary text-base leading-relaxed md:max-w-xl">
            Fill in as much or as little as you&apos;d like. If you have a
            Denver Post article, a link to a write-up, or even a photo of a
            newspaper clipping, that works too. We&apos;ll handle the formatting.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-14">
          {/* About You */}
          <Section title="About You">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-gold">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Year You Won <span className="text-gold">*</span>
                </label>
                <input
                  required
                  type="number"
                  min={1951}
                  max={2025}
                  value={form.yearWon}
                  onChange={set("yearWon")}
                  placeholder="Year"
                  className={inputClass}
                />
              </div>
            </div>
          </Section>

          {/* Your Story */}
          <Section
            title="Your Story"
            hint="One punchy headline, then a short bio. What defined your season or your story?"
          >
            <div>
              <label className={labelClass}>Headline</label>
              <input
                value={form.headline}
                onChange={set("headline")}
                placeholder="Your defining achievement in one line"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Bio</label>
              <textarea
                value={form.bio}
                onChange={set("bio")}
                rows={5}
                placeholder="A few sentences about you"
                className={`${inputClass} resize-none`}
              />
            </div>
          </Section>

          {/* Season Stats */}
          <Section
            title="Season Stats"
            hint="Up to 6 numbers from your senior season. Label is the stat name, value is the number."
          >
            <div className="space-y-3">
              {([1, 2, 3, 4, 5, 6] as const).map((n) => (
                <div key={n} className="grid grid-cols-[1fr_120px] gap-3">
                  <input
                    value={form[`stat${n}Label` as keyof FormData]}
                    onChange={set(`stat${n}Label` as keyof FormData)}
                    placeholder="Stat name"
                    className={inputClass}
                  />
                  <input
                    value={form[`stat${n}Value` as keyof FormData]}
                    onChange={set(`stat${n}Value` as keyof FormData)}
                    placeholder="Value"
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </Section>

          {/* Highlights */}
          <Section title="Highlights">
            <div>
              <label className={labelClass}>Career Highlight</label>
              <input
                value={form.careerHighlight}
                onChange={set("careerHighlight")}
                placeholder="Career totals in one sentence"
                className={inputClass}
              />
              <p className={hintClass}>
                One sentence summarizing your full career totals.
              </p>
            </div>
            <div>
              <label className={labelClass}>Academics</label>
              <input
                value={form.academics}
                onChange={set("academics")}
                placeholder="GPA, honors, AP/IB context"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Other Sport or Achievement</label>
              <input
                value={form.otherAchievement}
                onChange={set("otherAchievement")}
                placeholder="Other sport or notable achievement"
                className={inputClass}
              />
              <p className={hintClass}>
                Leave blank if football was your focus.
              </p>
            </div>
          </Section>

          {/* Community */}
          <Section
            title="Community & Leadership"
            hint="Up to 4 things: volunteer work, clubs, leadership roles, anything off the field worth knowing."
          >
            {(
              [
                "community1",
                "community2",
                "community3",
                "community4",
              ] as const
            ).map((f, i) => (
              <input
                key={f}
                value={form[f]}
                onChange={set(f)}
                placeholder={`Activity ${i + 1}`}
                className={inputClass}
              />
            ))}
          </Section>

          {/* Player Quote */}
          <Section
            title="In Your Own Words"
            hint="Something you said at the time, or something that captures how you think about football and life."
          >
            <textarea
              value={form.playerQuote}
              onChange={set("playerQuote")}
              rows={3}
              placeholder="Your words"
              className={`${inputClass} resize-none`}
            />
          </Section>

          {/* Coach Quote */}
          <Section
            title="Your Coach"
            hint="Something your coach said about you, from an article, a speech, or your own memory."
          >
            <div>
              <label className={labelClass}>Coach&apos;s Name</label>
              <input
                value={form.coachName}
                onChange={set("coachName")}
                placeholder="Name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Coach Quote</label>
              <textarea
                value={form.coachQuote}
                onChange={set("coachQuote")}
                rows={3}
                placeholder="Their words"
                className={`${inputClass} resize-none`}
              />
            </div>
          </Section>

          {/* Next Chapter */}
          <Section
            title="Next Chapter"
            hint="Where you went after winning the award."
          >
            <div>
              <label className={labelClass}>College & Major</label>
              <input
                value={form.nextChapterTitle}
                onChange={set("nextChapterTitle")}
                placeholder="College and major"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Any extra context</label>
              <input
                value={form.nextChapterSubtitle}
                onChange={set("nextChapterSubtitle")}
                placeholder="Optional"
                className={inputClass}
              />
            </div>
          </Section>

          {/* Photo */}
          <Section
            title="Action Photo"
            hint="Any game photo. Google Drive, Dropbox, or iCloud link. Leave blank if you don't have one handy."
          >
            <input
              type="url"
              value={form.actionPhotoUrl}
              onChange={set("actionPhotoUrl")}
              placeholder="Link to photo"
              className={inputClass}
            />
          </Section>

          {/* Submit */}
          {error && <p className="text-red-400 text-base">{error}</p>}
          <div className="pt-4 border-t border-border md:grid md:grid-cols-[220px_1fr] md:gap-12">
            <div className="hidden md:block" />
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gold/10 border border-gold/30 text-gold font-semibold text-base uppercase tracking-[0.2em] hover:bg-gold/20 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting\u2026" : "Submit Profile"}
              </button>
              <p className="text-muted text-sm text-center mt-3">
                Your information is only used for the Gold Helmet Award website.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
