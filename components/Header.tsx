"use client";

import { useState, useEffect, useCallback } from "react";
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

function mobileNavLinkClass(active: boolean) {
  return `block py-4 text-lg font-semibold uppercase tracking-[0.15em] transition-colors duration-200 ${
    active ? "text-gold" : "text-white/80"
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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeDrawer = useCallback(() => setMobileOpen(false), []);

  return (
    <>
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
            <Link href="/hall-of-champions" className={navLinkClass(pathname === "/hall-of-champions")}>
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
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden items-center p-2 chrome-bar-text mr-10 relative z-[60]"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <nav
        id="mobile-navigation"
        className={`fixed top-0 right-0 z-[58] h-full w-[280px] chrome-bar border-l border-white/10 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-8 pb-12">
          <div className="flex-1 flex flex-col gap-1">
            <Link
              href="/hall-of-champions"
              onClick={closeDrawer}
              className={mobileNavLinkClass(pathname === "/hall-of-champions")}
            >
              Hall of Champions
            </Link>
            <Link
              href="/#board"
              onClick={() => { setHash("#board"); closeDrawer(); }}
              className={mobileNavLinkClass(pathname === "/" && hash === "#board")}
            >
              Leadership
            </Link>
            <Link
              href="/#nominate"
              onClick={() => { setHash("#nominate"); closeDrawer(); }}
              className={mobileNavLinkClass(pathname === "/" && hash === "#nominate")}
            >
              Nominate
            </Link>

            <div className="h-px w-10 bg-gold/30 my-3" />

            <Link
              href="/#donate"
              onClick={() => { setHash("#donate"); closeDrawer(); }}
              className={mobileNavLinkClass(pathname === "/" && hash === "#donate")}
            >
              Donate
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-white/30 text-xs uppercase tracking-[0.15em]">Since 1951</p>
          </div>
        </div>
      </nav>
    </>
  );
}
