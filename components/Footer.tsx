"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AWARD_INFO, ATTRIBUTION_EMAIL } from "@/lib/constants";

function FooterContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    const subject = encodeURIComponent("Gold Helmet Award Inquiry");
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);
    const mailtoUrl = `mailto:${AWARD_INFO.contactEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    setSent(true);
  };

  return (
    <div>
      <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
        Contact
      </h4>
      <p className="text-[10px] text-white/40 uppercase tracking-[0.25em] mb-1">Chairman</p>
      <p className="text-sm text-white/80 font-semibold mb-4">{AWARD_INFO.chairman}</p>
      {sent ? (
        <p className="text-sm text-gold">Your email client should have opened with the message.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <label htmlFor="contact-email" className="sr-only">Your email address</label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
          />
          <label htmlFor="contact-message" className="sr-only">Message</label>
          <textarea
            id="contact-message"
            required
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-gold/10 border border-gold/30 text-gold text-sm hover:bg-gold/20 transition-colors"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="chrome-bar border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="https://www.denverpost.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/denver-post-logo.svg"
                alt="The Denver Post"
                width={250}
                height={30}
                className="mb-4"
              />
            </a>
            <p className="chrome-bar-text text-sm leading-relaxed">
              The Denver Post founded the Gold Helmet Award in 1951 and
              supported it for 75 years.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/hall-of-champions"
                  className="chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
                >
                  Hall of Champions
                </Link>
              </li>
              <li>
                <Link
                  href="/winners-grid"
                  className="chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
                >
                  Winners Alternate
                </Link>
              </li>
              <li>
                <Link
                  href="/nominate"
                  className="chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
                >
                  Nominate
                </Link>
              </li>
              <li>
                <Link
                  href="/profile-submission"
                  className="chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
                >
                  Winner Profiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <FooterContactForm />
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Copyright */}
        <p className="text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Gold Helmet Award Corp. All rights
          reserved.
        </p>
        <p className="text-center text-xs text-white/30 mt-2">
          Website by{" "}
          <a
            href={`mailto:${ATTRIBUTION_EMAIL}?subject=Website%20inquiry%20%E2%80%93%20Gold%20Helmet%20Award%20reference`}
            className="hover:text-[hsl(var(--gold))] transition-colors"
          >
            Tanner Powell
          </a>
        </p>
      </div>
    </footer>
  );
}
