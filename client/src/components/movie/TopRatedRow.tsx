/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BaseMediaRow, { MediaTab } from "../common/BaseMediaRow";

interface TopRatedRowProps {
  topRatedMovies: any[];
  topRatedTV: any[];
}

export default function TopRatedRow({ topRatedMovies, topRatedTV }: TopRatedRowProps) {
  const tabs: MediaTab[] = [
    {
      id: "movie",
      label: "Movies",
      data: topRatedMovies,
      fallbackMediaType: "movie",
      exploreLink: "/explore?category=top-rated-movies",
      theme: {
        primary: "text-sky-400", hover: "hover:text-sky-300",
        bgLight: "bg-sky-500/10", bgHover: "hover:bg-sky-500/20",
        border: "border-sky-500/30", glow: "group-hover/card:shadow-[0_0_30px_rgba(56,189,248,0.3)]",
      },
    },
    {
      id: "tv",
      label: "TV Shows",
      data: topRatedTV,
      fallbackMediaType: "tv",
      exploreLink: "/explore?category=top-rated-tv",
      theme: {
        primary: "text-cyan-400", hover: "hover:text-cyan-300",
        bgLight: "bg-cyan-500/10", bgHover: "hover:bg-cyan-500/20",
        border: "border-cyan-500/30", glow: "group-hover/card:shadow-[0_0_30px_rgba(34,211,238,0.3)]",
      },
    },
  ];

  return (
    <BaseMediaRow
      title="Top Rated"
      tabs={tabs}
      ambientGlowClasses="right-10 bg-sky-600/5"
    />
  );
}