"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleFavorite, FavoriteItem } from "@/store/slices/favoritesSlice";
import { Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";

interface FavoriteButtonProps {
  item: FavoriteItem;
  className?: string;
  iconClassName?: string;
}

export default function FavoriteButton({ item, className = "", iconClassName = "w-5 h-5" }: FavoriteButtonProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  
  // Hydration safety since localStorage only runs on client
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isFavorited = favorites.some((f) => f.id === item.id && f.media_type === item.media_type);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(item));
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className={`group relative flex items-center justify-center transition-all duration-300 outline-none ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isFavorited ? (
          <motion.div
            key="filled"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Bookmark className={`${iconClassName} fill-purple-500 text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]`} />
          </motion.div>
        ) : (
          <motion.div
            key="outline"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.15 } }}
          >
            <Bookmark className={`${iconClassName} text-white group-hover:text-purple-400`} strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
