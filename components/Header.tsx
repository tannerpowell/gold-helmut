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
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    // hashchange covers anchor clicks; popstate covers browser back/forward
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, [pathname]);

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
          <Link href="/#board" className={navLinkClass(pathname === "/" && hash === "#board")} onClick={() => setHash("#board")}>
            Leadership
          </Link>
          <Link href="/#nominate" className={navLinkClass(pathname === "/" && hash === "#nominate")} onClick={() => setHash("#nominate")}>
            Nominate
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <Link href="/#donate" className={navLinkClass(pathname === "/" && hash === "#donate")} onClick={() => setHash("#donate")}>
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
            className={`block ${navLinkClass(pathname === "/winners-timeline")}`}
          >
            Hall of Champions
          </Link>
          <Link
            href="/#board"
            onClick={() => { setHash("#board"); setMobileOpen(false); }}
            className={`block ${navLinkClass(pathname === "/" && hash === "#board")}`}
          >
            Leadership
          </Link>
          <Link
            href="/#nominate"
            onClick={() => { setHash("#nominate"); setMobileOpen(false); }}
            className={`block ${navLinkClass(pathname === "/" && hash === "#nominate")}`}
          >
            Nominate
          </Link>
          <div className="h-px w-8 bg-white/10" />
          <Link
            href="/#donate"
            onClick={() => { setHash("#donate"); setMobileOpen(false); }}
            className={`block ${navLinkClass(pathname === "/" && hash === "#donate")}`}
          >
            Donate
          </Link>
        </nav>
      )}
    </header>
  );
}
