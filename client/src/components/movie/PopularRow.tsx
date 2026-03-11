/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BaseMediaRow, { MediaTab } from "../common/BaseMediaRow";

interface PopularRowProps {
  popularMovies: any[];
  popularTV: any[];
}

export default function PopularRow({ popularMovies, popularTV }: PopularRowProps) {
  const tabs: MediaTab[] = [
    {
      id: "movie",
      label: "Movies",
      data: popularMovies,
      fallbackMediaType: "movie",
      exploreLink: "/explore?category=popular-movies",
      theme: {
        primary: "text-amber-400", hover: "hover:text-amber-300",
        bgLight: "bg-amber-500/10", bgHover: "hover:bg-amber-500/20",
        border: "border-amber-500/30", glow: "group-hover/card:shadow-[0_0_30px_rgba(251,191,36,0.3)]",
      },
    },
    {
      id: "tv",
      label: "TV Shows",
      data: popularTV,
      fallbackMediaType: "tv",
      exploreLink: "/explore?category=popular-tv",
      theme: {
        primary: "text-orange-400", hover: "hover:text-orange-300",
        bgLight: "bg-orange-500/10", bgHover: "hover:bg-orange-500/20",
        border: "border-orange-500/30", glow: "group-hover/card:shadow-[0_0_30px_rgba(251,146,60,0.3)]",
      },
    },
  ];

  return (
    <BaseMediaRow
      title="Popular"
      tabs={tabs}
      ambientGlowClasses="right-10 bg-amber-600/5"
    />
  );
}