/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  Film, Home, Search, Tv, Menu, X, 
  ChevronDown, LayoutGrid, Bookmark
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { MOVIE_GENRES, TV_GENRES } from "@/lib/genres";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsSidebarOpen } from "@/store/slices/stateSlice";
import Image from "next/image";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isSidebarOpen } = useSelector((state: RootState) => state.state);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);
  const [isGenresExpanded, setIsGenresExpanded] = useState(false);
  const [genreTab, setGenreTab] = useState<"movie" | "tv">("movie");
  
  const isTypingRef = useRef(false);
  const lastScrollY = useRef(0);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth >= 768) dispatch(setIsSidebarOpen(true));
  }, []);

  useEffect(() => {
    if (!pathname.startsWith("/search")) {
      setSearchTerm("");
      isTypingRef.current = false;
    }
    if (window.innerWidth < 768) dispatch(setIsSidebarOpen(false));
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isTypingRef.current) return;
    if (debouncedSearch.trim()) {
      router.push(`/search?query=${encodeURIComponent(debouncedSearch)}`);
    } else {
      router.push("/search");
    }
  }, [debouncedSearch, router]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setShowFloatingBtn(false);
      } else {
        setShowFloatingBtn(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isTypingRef.current = true;
    setSearchTerm(e.target.value);
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Movies", href: "/explore?category=trending-movies", icon: Film },
    { name: "TV Shows", href: "/explore?category=trending-tv", icon: Tv },
    // { name: "Watchlist", href: "/watchlist", icon: Bookmark },
  ];

  return (
    <>
      {/* ─── MINIMAL FLOATING BUTTON ─── */}
      <AnimatePresence>
        {(!isSidebarOpen || (typeof window !== "undefined" && window.innerWidth < 768)) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: showFloatingBtn ? 1 : 0, 
              y: showFloatingBtn ? 0 : -40,
              scale: showFloatingBtn ? 1 : 0.8
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => dispatch(setIsSidebarOpen(true))}
            className="fixed cursor-pointer hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] top-6 left-4 md:left-6 z-[60] p-3.5 bg-[var(--bg-primary)]/40 backdrop-blur-xl border border-[var(--border-medium)] rounded-full text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)] [transition-property:width,height,background-color,border-color,box-shadow,padding] outline-none focus:outline-none duration-300"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <Menu className="w-5 h-5" strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── MOBILE OVERLAY ─── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--bg-primary)]/60 backdrop-blur-md z-[70] md:hidden"
            onClick={() => dispatch(setIsSidebarOpen(false))}
          />
        )}
      </AnimatePresence>

      {/* ─── ELEGANT SIDEBAR CONTAINER ─── */}
      <motion.nav
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 200 }}
        className={`
          fixed top-0 left-0 h-[100dvh] z-[80] 
          bg-[var(--sidebar-bg)] backdrop-blur-3xl border-r border-[var(--sidebar-divider)]
          flex flex-col pt-8 pb-6 overflow-hidden
          transition-[width] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
          w-[250px] md:w-[80px] hover:w-[250px] focus-within:w-[250px] group
        `}
      >
        {/* Header: Logo & Immersive Close */}
        <div className="flex items-center justify-between px-7 mb-12 shrink-0">
          <Link href="/" className="flex items-center gap-2 outline-none">
          <Image src="/bingebank.svg" alt="Logo" width={32} height={32} />
            <span className="text-lg font-thin tracking-widest text-[var(--text-primary)] md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              BingeBank
            </span>
          </Link>
          <button 
            onClick={() => dispatch(setIsSidebarOpen(false))}
            className="md:opacity-0 cursor-pointer group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity p-2 -mr-2 rounded-full text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)] hover:bg-[var(--bg-glass)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex flex-col gap-1 w-full px-4 flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Main Links */}
          {navLinks.map((link) => {
            const Icon = link.icon;
            let isActive = false;

            if (link.name === "Home") isActive = pathname === "/";
            else if (link.name === "Movies") isActive = pathname === "/explore" && !!searchParams.get("category")?.includes("movie");
            else if (link.name === "TV Shows") isActive = pathname === "/explore" && !!searchParams.get("category")?.includes("tv");
            else if (link.name === "Watchlist") isActive = pathname === "/watchlist";

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-5 px-3 py-3.5 rounded-xl transition-colors duration-300 outline-none relative ${
                  isActive
                    ? "text-purple-400"
                    : "text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)] hover:bg-[var(--bg-glass)]"
                }`}
              >
                {isActive && (
                  <motion.div layoutId="activeDot" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-purple-500 rounded-r-full" />
                )}
                <Icon className="w-5 h-5 shrink-0 ml-1" strokeWidth={isActive ? 2 : 1.5} />
                <span className={`text-[15px] whitespace-nowrap md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 ${isActive ? "font-medium" : "font-normal"}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}

          <div className="w-full h-px bg-[var(--sidebar-divider)] my-5 shrink-0" />

          {/* ─── BIFURCATED GENRES SECTION ─── */}
          <div className="flex flex-col flex-shrink-0">
            <button
               onClick={() => setIsGenresExpanded(!isGenresExpanded)}
               className={`flex cursor-pointer items-center justify-between px-3 py-3.5 rounded-xl transition-colors duration-300 outline-none ${
                 isGenresExpanded ? "text-[var(--text-primary)]" : "text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)] hover:bg-[var(--bg-glass)]"
               } w-full`}
            >
              <div className="flex items-center gap-5">
                <LayoutGrid className="w-5 h-5 shrink-0 ml-1" strokeWidth={1.5} />
                <span className="text-[15px] whitespace-nowrap md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                  Genres
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[var(--sidebar-text)] md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-transform duration-300 ${isGenresExpanded ? "rotate-180" : ""}`} />
            </button>
            
            {/* Expanded Genres Area */}
            <AnimatePresence>
              {isGenresExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden md:hidden group-hover:block group-focus-within:block"
                >
                  <div className="pt-2 pb-4 px-2 flex flex-col gap-4">
                    
                    {/* Clean Pill Toggle Tabs */}
                    <div className="flex p-1 bg-[var(--bg-glass)] rounded-full mx-2 mt-2">
                      <button 
                        onClick={() => setGenreTab("movie")}
                        className={`flex-1 cursor-pointer py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 ${genreTab === "movie" ? "bg-[var(--bg-glass-hover)] text-[var(--text-primary)] shadow-sm" : "text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)]"}`}
                      >
                        Movies
                      </button>
                      <button 
                        onClick={() => setGenreTab("tv")}
                        className={`flex-1 cursor-pointer py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 ${genreTab === "tv" ? "bg-[var(--bg-glass-hover)] text-[var(--text-primary)] shadow-sm" : "text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)]"}`}
                      >
                        TV
                      </button>
                    </div>

                    {/* Genre List */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 px-3 max-h-[35vh] overflow-y-auto custom-scrollbar">
                      {(genreTab === "movie" ? MOVIE_GENRES : TV_GENRES).map(g => {
                        const isActive = pathname.startsWith(`/${genreTab}/genre/${g.id}`);
                        return (
                          <Link
                            key={g.id}
                            href={`/${genreTab}/genre/${g.id}?name=${encodeURIComponent(g.name)}`}
                            className={`cursor-pointer text-[13px] py-2 px-3 rounded-lg transition-colors truncate ${isActive ? 'text-purple-400 font-medium' : 'text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)] hover:bg-[var(--bg-glass)]'}`}
                          >
                            {g.name}
                          </Link>
                        )
                      })}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── MINIMAL SEARCH INPUT ─── */}
        <div className="mt-auto w-full px-5 pt-6 pb-2 shrink-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent">
          <div className="flex items-center gap-3 w-full">
            <div className="relative flex items-center flex-1 h-11 transition-all duration-300 bg-[var(--bg-glass)] border border-transparent focus-within:border-[var(--border-medium)] focus-within:bg-[var(--bg-glass-hover)] rounded-full overflow-hidden">
              <Search className="w-[18px] h-[18px] text-[var(--sidebar-text)] shrink-0 absolute left-3.5 transition-colors" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={onSearchChange}
                className="bg-transparent border-none outline-none text-[16px] text-[var(--text-primary)] w-full h-full pl-11 pr-4 placeholder:text-[var(--text-faint)]
                  opacity-100 md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="shrink-0 md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Elegant scrollbar override */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }
      `}} />
    </>
  );
}