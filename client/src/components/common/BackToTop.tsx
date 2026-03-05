"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on initial load
    handleScroll();
    
    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{ WebkitTapHighlightColor: "transparent" }}
      className={`
        fixed z-[90] bottom-8 right-4 md:bottom-12 md:right-6 p-3
        rounded-full bg-white/5 backdrop-blur-xl border border-white/10 
        shadow-[0_10px_30px_rgba(0,0,0,0.5)] 
        outline-none focus:outline-none
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group
        hover:bg-purple-500/10 hover:border-purple-500/40 
        hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:-translate-y-1
        ${
          isVisible 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-12 scale-90 pointer-events-none"
        }
      `}
    >
      <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
    </button>
  );
}