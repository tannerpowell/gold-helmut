"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

function navLinkClass(active: boolean) {
  return `text-xs font-semibold uppercase tracking-[0.2em] pb-0.5 transition-all duration-300 ease-in-out ${
    active
      ? "text-white border-b border-gold"
      : "text-white/70 hover:text-white border-b border-transparent hover:border-gold"
  }`;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 chrome-bar border-b border-white/10">
      {/* Theme toggle: far top-right corner */}
      <div className="absolute top-3 right-5 z-10">
        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display italic text-lg sm:text-xl font-medium text-white hover:text-gold transition-colors duration-300">
          Gold Helmet Award
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 pr-10">
          <Link href="/winners-timeline" className={navLinkClass(pathname === "/winners-timeline")}>
            Hall of Champions
          </Link>
          <Link href="/#board" className={navLinkClass(pathname === "/" && hash === "#board")}>
            Leadership
          </Link>
          <Link href="/#nominate" className={navLinkClass(pathname === "/" && hash === "#nominate")}>
            Nominate
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <Link href="/#donate" className={navLinkClass(pathname === "/" && hash === "#donate")}>
            Donate
          </Link>
        </nav>

        {/* Mobile: hamburger */}
        <div className="flex md:hidden items-center gap-2 pr-10">
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
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
          >
            Hall of Champions
          </Link>
          <Link
            href="/#board"
            onClick={() => setMobileOpen(false)}
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
          >
            Leadership
          </Link>
          <Link
            href="/#nominate"
            onClick={() => setMobileOpen(false)}
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
          >
            Nominate
          </Link>
          <div className="h-px w-8 bg-white/10" />
          <Link
            href="/#donate"
            onClick={() => setMobileOpen(false)}
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
          >
            Donate
          </Link>
        </nav>
      )}
    </header>
  );
}
