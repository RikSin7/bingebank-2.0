"use client";

import BaseMediaRow, { MediaTab } from "../common/BaseMediaRow";

export default function TrendingRow({ trendingMovies, trendingTV }: any) {
  const tabs: MediaTab[] = [
    {
      id: "movie",
      label: "Movies",
      data: trendingMovies,
      fallbackMediaType: "movie",
      exploreLink: "/explore?category=trending-movies",
      theme: {
        primary: "text-violet-400", hover: "hover:text-violet-300",
        bgLight: "bg-violet-500/10", bgHover: "hover:bg-violet-500/20",
        border: "border-violet-500/30", glow: "group-hover/card:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
      },
    },
    {
      id: "tv",
      label: "TV Shows",
      data: trendingTV,
      fallbackMediaType: "tv",
      exploreLink: "/explore?category=trending-tv",
      theme: {
        primary: "text-fuchsia-400", hover: "hover:text-fuchsia-300",
        bgLight: "bg-fuchsia-500/10", bgHover: "hover:bg-fuchsia-500/20",
        border: "border-fuchsia-500/30", glow: "group-hover/card:shadow-[0_0_30px_rgba(217,70,239,0.3)]",
      },
    },
  ];

  return <BaseMediaRow title="Trending" tabs={tabs} ambientGlowClasses="left-10 bg-purple-600/5" />;
}