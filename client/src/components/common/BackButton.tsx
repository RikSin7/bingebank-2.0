"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface BackButtonProps {
  label?: string;
  className?: string;
  fallbackUrl?: string;
}

export default function BackButton({ 
  label = "", 
  className = "",
  fallbackUrl = "/" 
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBack}
      className={`group cursor-pointer flex items-center justify-center transition-all duration-300 hover:text-white hover:-translate-x-1 text-zinc-400 outline-none ${
        label ? "px-5 py-2.5 gap-2.5 w-fit flex-row" : "w-12 h-12"
      } ${className}`}
    >
      <ArrowLeft 
        className={`h-5 w-5 transition-transform duration-300 ${label ? "group-hover:-translate-x-1" : ""}`} 
        strokeWidth={2} 
      />
      {label && <span className="tracking-wide pr-1 font-medium">{label}</span>}
    </motion.button>
  );
}