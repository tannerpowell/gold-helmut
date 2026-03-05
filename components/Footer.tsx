"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="chrome-bar border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/denver-post-logo.svg"
              alt="The Denver Post"
              width={250}
              height={30}
              className="mb-4"
            />
            <p className="chrome-bar-text text-sm leading-relaxed">
              Recognizing excellence in Colorado high school football since
              1951. Honoring character, leadership, and achievement on and off
              the field.
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
                  href="/winners-timeline"
                  className="chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
                >
                  Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/winners-grid"
                  className="chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
                >
                  Winners
                </Link>
              </li>
              <li>
                <Link
                  href="/#apply"
                  className="chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
                >
                  Apply
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
              Contact
            </h4>
            <p className="text-sm chrome-bar-text mb-2">
              <a
                href="mailto:goldhelmet2025@gmail.com"
                className="hover:text-[hsl(var(--gold))] transition-colors"
              >
                goldhelmet2025@gmail.com
              </a>
            </p>
            <p className="text-sm chrome-bar-text">Chair: Kyle Newman</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Copyright */}
        <p className="text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Gold Helmet Award Corp. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
