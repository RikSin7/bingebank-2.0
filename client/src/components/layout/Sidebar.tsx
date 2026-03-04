"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Film, Home, Search, Tv, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {useDebounce} from "@/hooks/useDebounce";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isTypingRef = useRef(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!pathname.startsWith("/search")) {
      setSearchTerm("");
      isTypingRef.current = false;
    }
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isTypingRef.current) return;

    if (debouncedSearch.trim()) {
      router.push(`/search?query=${encodeURIComponent(debouncedSearch)}`);
    } else {
      router.push("/search");
    }
  }, [debouncedSearch, router]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isTypingRef.current = true;
    setSearchTerm(e.target.value);
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Movies", href: "/explore?category=trending-movies", icon: Film },
    { name: "TV Shows", href: "/explore?category=trending-tv", icon: Tv },
  ];

  return (
    <>
      {/* Mobile Toggle Button (Top Right) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-[60] p-2 bg-gray-900 rounded-full md:hidden text-white"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[40] md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <nav
        className={`fixed top-0 left-0 h-[100dvh] bg-black/95 md:bg-black/90 backdrop-blur-md border-r border-white/10 flex flex-col items-center py-8 z-[50] transition-transform duration-300 md:translate-x-0 w-[240px] md:w-[80px] hover:w-[240px] group ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 w-full mb-12 overflow-hidden">
          <div className="bg-emerald-500 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <Film className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent md:opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Bingebank
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-6 w-full px-4 flex-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (pathname === "/explore" && link.name !== "Home" && link.href.includes(pathname));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 font-semibold"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
                title={link.name}
              >
                <Icon className={`w-6 h-6 shrink-0 ${isActive ? "text-emerald-400" : ""}`} />
                <span className={`text-sm md:opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isActive ? "text-emerald-400" : ""}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="mt-auto w-full px-4 pt-6 border-t border-white/10 relative">
          <div className="relative group/search flex items-center justify-center w-12 h-12 md:w-12 md:h-12 group-hover:w-full group-hover:justify-start transition-all duration-300 bg-white/5 rounded-xl">
             <Search className="w-5 h-5 text-gray-400 shrink-0 group-hover/search:text-white transition-colors absolute left-3.5" />
             <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={onSearchChange}
              className="bg-transparent border-none outline-none text-sm text-white w-full pl-11 pr-4 py-3 placeholder:text-gray-500 
                hidden group-hover:block
                md:hidden md:group-hover:block"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
