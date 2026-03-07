"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>
      
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold tracking-tight text-white">Something went wrong!</h2>
        <p className="text-zinc-400">
          We encountered an unexpected error while trying to load this page. 
          Please try again or return to the home page.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
        >
          <RefreshCcw className="h-4 w-4" />
          Try again
        </button>
        <Link 
          href="/"
          className="flex items-center justify-center rounded-lg bg-zinc-800 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
