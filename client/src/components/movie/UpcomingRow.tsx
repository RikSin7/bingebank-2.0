/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BaseMediaRow, { MediaTab } from "../common/BaseMediaRow";

interface UpcomingRowProps {
  upcomingMovies: any[];
  upcomingTV: any[];
}

export default function UpcomingRow({ upcomingMovies, upcomingTV }: UpcomingRowProps) {
  const tabs: MediaTab[] = [
    {
      id: "movie",
      label: "Movies",
      data: upcomingMovies,
      fallbackMediaType: "movie",
      exploreLink: "/explore?category=upcoming-movies",
      theme: {
        primary: "text-emerald-400", hover: "hover:text-emerald-300",
        bgLight: "bg-emerald-500/10", bgHover: "hover:bg-emerald-500/20",
        border: "border-emerald-500/30", glow: "group-hover/card:shadow-[0_0_30px_rgba(52,211,153,0.3)]",
      },
    },
    {
      id: "tv",
      label: "TV Shows",
      data: upcomingTV,
      fallbackMediaType: "tv",
      exploreLink: "/explore?category=on-the-air-tv", // Properly handles your specific URL requirement!
      theme: {
        primary: "text-teal-400", hover: "hover:text-teal-300",
        bgLight: "bg-teal-500/10", bgHover: "hover:bg-teal-500/20",
        border: "border-teal-500/30", glow: "group-hover/card:shadow-[0_0_30px_rgba(45,212,191,0.3)]",
      },
    },
  ];

  return (
    <BaseMediaRow
      title="Upcoming"
      tabs={tabs}
      ambientGlowClasses="right-10 bg-emerald-600/5"
    />
  );
}