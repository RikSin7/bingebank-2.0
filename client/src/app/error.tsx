"use client";

import { startTransition, useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-[var(--bg-primary)] px-4 font-sans selection:bg-white/20">
      <div className="flex max-w-md flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
        
        {/* Subtle Frosted Icon Container */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
          <AlertCircle className="h-6 w-6 text-zinc-400" strokeWidth={1.5} />
        </div>
        
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Something went wrong
        </h1>
        
        <p className="mb-8 text-sm md:text-base leading-relaxed text-[var(--text-muted)] font-light">
           An unexpected error occurred while loading this page.
        </p>

        {/* Minimalist Action Buttons */}
        <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              startTransition(() => {
                reset();
                router.refresh();
              });
            }}
            className="group cursor-pointer flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 active:scale-95"
          >
            <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-45" strokeWidth={2} />
            Try again
          </button>
          
          <Link 
            href="/"
            className="group cursor-pointer flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[var(--border-medium)] bg-transparent px-8 py-3 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)] active:scale-95"
          >
            <Home className="h-4 w-4" strokeWidth={1.5} />
             Home
          </Link>
        </div>

      </div>
      </div>
  );
}