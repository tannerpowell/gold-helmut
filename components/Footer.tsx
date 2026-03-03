"use client";

import { AWARD_INFO, COLORS } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{ borderColor: COLORS.border, backgroundColor: COLORS.light }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3
              className="font-bold text-lg mb-4"
              style={{ color: COLORS.primary }}
            >
              {AWARD_INFO.name}
            </h3>
            <p
              className="text-sm"
              style={{ color: COLORS.textMuted }}
            >
              Recognizing excellence in Colorado high school football since {AWARD_INFO.founded}.
            </p>
          </div>
          <div>
            <h4
              className="font-semibold mb-4"
              style={{ color: COLORS.primary }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/winners-timeline"
                  className="text-sm transition-colors"
                  style={{ color: COLORS.textMuted }}
                >
                  View Timeline
                </a>
              </li>
              <li>
                <a
                  href="/winners-grid"
                  className="text-sm transition-colors"
                  style={{ color: COLORS.textMuted }}
                >
                  View Grid
                </a>
              </li>
              <li>
                <a
                  href="#apply"
                  className="text-sm transition-colors"
                  style={{ color: COLORS.textMuted }}
                >
                  Apply
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className="font-semibold mb-4"
              style={{ color: COLORS.primary }}
            >
              Contact
            </h4>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>
              <a
                href={`mailto:${AWARD_INFO.contactEmail}`}
                className="hover:underline"
              >
                {AWARD_INFO.contactEmail}
              </a>
            </p>
            <p className="text-sm mt-2" style={{ color: COLORS.textMuted }}>
              Chair: {AWARD_INFO.chair}
            </p>
          </div>
        </div>
        <div
          className="border-t pt-8 text-center text-sm"
          style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
        >
          <p>
            © {new Date().getFullYear()} {AWARD_INFO.charity}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
