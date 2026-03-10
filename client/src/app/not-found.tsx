import Link from "next/link";
import { Film, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-[var(--bg-primary)] px-4 font-sans selection:bg-white/20">
      <div className="flex max-w-md flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Architectural 404 Display */}
        <div className="relative mb-8 flex items-center justify-center">
          <h1 className="text-[120px] md:text-[150px] font-black leading-none tracking-tighter text-[var(--bg-surface)] select-none">
            404
          </h1>
          {/* Floating glass element overlaying the dark text */}
          <div className="absolute flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border-medium)] bg-[var(--bg-primary)]/80 backdrop-blur-md shadow-2xl">
            <Film className="h-8 w-8 text-zinc-300" strokeWidth={1} />
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Page Not Found
        </h2>
        
        <p className="mb-10 text-sm md:text-base leading-relaxed text-[var(--text-muted)] font-light">
          The movie, show, or collection you are looking for does not exist or has been moved.
        </p>

        {/* High-Contrast Premium Button */}
        <Link 
          href="/"
          className="group cursor-pointer flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
          Back to Hub
        </Link>
        
      </div>
    </div>
  );
}