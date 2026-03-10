"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      // Follow system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="cursor-pointer p-2.5 rounded-full bg-[var(--bg-glass)] hover:bg-[var(--bg-glass-hover)] border border-[var(--border-medium)] backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 outline-none focus:outline-none group"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300 transition-colors group-hover:rotate-45 duration-500" />
      ) : (
        <Moon className="w-4 h-4 text-purple-500 group-hover:text-purple-400 transition-colors group-hover:-rotate-12 duration-500" />
      )}
    </button>
  );
}
