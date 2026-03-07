/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
import { ENV } from "@/config/env";

export async function tmdbFetch<T>(
  endpoint: string,
  noCache = false
): Promise<T> {
  const url = `${ENV.TMDB_API}${endpoint}`;

  const options: any = {
    headers: {
      Authorization: `Bearer ${ENV.TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  if (noCache) {
    options.cache = "no-store";
  } else {
    options.next = { revalidate: 3600 };
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} for ${endpoint}`);
  }

  return res.json();
}

export function tmdbImage(path: string | null | undefined, size = "w1280") {
  if (!path) return "/placeholder.png";
  return `${ENV.TMDB_IMAGE}/${size}${path}`;
}
