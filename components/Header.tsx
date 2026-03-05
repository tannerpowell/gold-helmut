"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 chrome-bar border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display italic text-lg sm:text-xl font-medium text-white hover:text-gold transition-colors">
          Gold Helmet Award
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/winners-timeline"
            className="text-sm chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
          >
            Timeline
          </Link>
          <Link
            href="/winners-grid"
            className="text-sm chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
          >
            Winners
          </Link>
          <ThemeToggle />
          <Link
            href="/#donate"
            className="px-6 py-2 bg-gold text-[#1a1a1a] text-sm font-medium hover:brightness-110 transition-all"
          >
            Donate
          </Link>
          <Link
            href="/#apply"
            className="px-6 py-2 border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Apply
          </Link>
        </nav>

        {/* Mobile: toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 chrome-bar-text"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav id="mobile-navigation" className="md:hidden chrome-bar border-t border-white/10 px-6 py-4 space-y-3">
          <Link
            href="/winners-timeline"
            onClick={() => setMobileOpen(false)}
            className="block text-sm chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
          >
            Timeline
          </Link>
          <Link
            href="/winners-grid"
            onClick={() => setMobileOpen(false)}
            className="block text-sm chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
          >
            Winners
          </Link>
          <Link
            href="/#donate"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center px-6 py-2 bg-gold text-[#1a1a1a] text-sm font-medium"
          >
            Donate
          </Link>
          <Link
            href="/#apply"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center px-6 py-2 border border-white/30 text-white text-sm font-medium"
          >
            Apply
          </Link>
        </nav>
      )}
    </header>
  );
}
