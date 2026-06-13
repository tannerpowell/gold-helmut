"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  // false during SSR/hydration, true after — resolvedTheme is unknowable on
  // the server, so render a placeholder until the client takes over.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) return <div className="w-[34px] h-[34px]" />;

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 chrome-bar-text hover:text-[hsl(var(--gold))] transition-colors"
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolvedTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
