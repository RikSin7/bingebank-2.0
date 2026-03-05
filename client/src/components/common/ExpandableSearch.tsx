"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export default function ExpandableSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") || "";
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState(currentQuery);
  const isTypingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  
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
    // Only trigger search if user is actively typing
    if (!isTypingRef.current) return;
    
    // We only want this effect to run when debouncedQuery specifically changes
    // to prevent premature redirects when other state/props change mid-typing
    if (debouncedQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(debouncedQuery.trim())}`);
    } else if (isExpanded && query === "") { 
      // Only push /search if both debounced AND actual query are empty
      router.push("/search");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

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
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      className={`absolute md:top-5 top-3 right-4 md:right-10 z-50 flex items-center md:bg-black/40 md:backdrop-blur-md md:border border-white/20 rounded-full transition-all duration-300 ease-in-out md:shadow-2xl ${
        isExpanded ? "w-[240px] md:w-[320px] px-2 py-1" : "w-12 h-12 justify-center cursor-pointer bg-transparent hover:bg-black/60"
      }`}
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
    </form>
  );
}
