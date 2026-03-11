"use client";

import BaseMediaRow, { MediaTab } from "../common/BaseMediaRow";

interface RegionalRowProps {
  bollywood: any[];
  hollywood: any[];
}

export default function RegionalRow({ bollywood, hollywood }: RegionalRowProps) {
  const tabs: MediaTab[] = [
    {
      id: "bollywood",
      label: "Bollywood",
      data: bollywood,
      fallbackMediaType: "movie", // explicitly tells MediaCard these are movies
      exploreLink: "/explore?category=bollywood-movies",
      theme: {
        primary: "text-rose-400",
        hover: "hover:text-rose-300",
        bgLight: "bg-rose-500/10",
        bgHover: "hover:bg-rose-500/20",
        border: "border-rose-500/30",
        glow: "group-hover/card:shadow-[0_0_30px_rgba(244,63,94,0.3)]",
      },
    },
    {
      id: "hollywood",
      label: "Hollywood",
      data: hollywood,
      fallbackMediaType: "movie",
      exploreLink: "/explore?category=hollywood-movies",
      theme: {
        primary: "text-indigo-400",
        hover: "hover:text-indigo-300",
        bgLight: "bg-indigo-500/10",
        bgHover: "hover:bg-indigo-500/20",
        border: "border-indigo-500/30",
        glow: "group-hover/card:shadow-[0_0_30px_rgba(99,102,241,0.3)]",
      },
    },
  ];

  return (
    <BaseMediaRow
      title="Blockbusters"
      tabs={tabs}
      ambientGlowClasses="right-10 bg-rose-600/5"
    />
  );
}