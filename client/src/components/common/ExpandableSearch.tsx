"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDebounce } from "@/hooks/useDebounce";

export default function ExpandableSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") || "";
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState(currentQuery);
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);
  
  const isTypingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  const lastScrollY = useRef(0);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isTypingRef.current) return;
    
    if (debouncedQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(debouncedQuery.trim())}`);
    } else if (isExpanded && query === "") { 
      router.push("/search");
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If we are scrolling down, past 150px, AND search is not expanded, hide it
      if (currentScrollY > lastScrollY.current && currentScrollY > 150 && !isExpanded) {
        setShowFloatingBtn(false);
      } else {
        setShowFloatingBtn(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]); // Need to depend on isExpanded so it stays open even if scrolling

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      isTypingRef.current = false; // Manual submit ends the typing flow
    }
  };

  const toggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      // Setup initial query if we are already on search page
      setQuery(currentQuery);
      isTypingRef.current = false; 
    } else if (!query.trim()) {
      setIsExpanded(false);
      isTypingRef.current = false;
    } else {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  return (
    <AnimatePresence>
      <motion.form
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showFloatingBtn ? 1 : 0, 
          y: showFloatingBtn ? 0 : -40,
          scale: showFloatingBtn ? 1 : 0.8
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        ref={containerRef as any}
        onSubmit={handleSubmit}
        className={`fixed top-6 right-6 z-[60] flex items-center md:bg-black/40 md:backdrop-blur-md md:border border-white/20 rounded-full md:shadow-2xl ${
          isExpanded ? "w-[240px] md:w-[320px] px-2 py-1 transition-all duration-300" : "w-12 h-12 justify-center cursor-pointer bg-transparent hover:bg-black/60 transition-colors duration-300"
        } ${!showFloatingBtn ? "pointer-events-none" : ""}`}
        onClick={() => {
          if (!isExpanded) toggleExpand();
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
          className={`p-2 rounded-full text-white hover:text-emerald-400 transition-colors ${
            isExpanded ? "mr-1" : ""
          }`}
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {isExpanded && (
          <>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                isTypingRef.current = true;
                setQuery(e.target.value);
              }}
              placeholder="Search movies, tv..."
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-gray-400 min-w-0"
            />
            {query && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  isTypingRef.current = true; // Trigger effect to clear search
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1.5 rounded-full text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </motion.form>
    </AnimatePresence>
  );
}
