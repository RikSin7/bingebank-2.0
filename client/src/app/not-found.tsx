import Link from "next/link";
import { Film } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative z-10 w-full">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-full mb-8 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
        <Film className="w-16 h-16 md:w-20 md:h-20 text-purple-400" />
      </div>

      <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 mb-4 tracking-tighter drop-shadow-lg">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
        Lost in Space
      </h2>
      <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg md:text-xl leading-relaxed">
        It seems the movie or TV show you&apos;re looking for has been pulled from our universe. 
      </p>

      <Link 
        href="/"
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] flex items-center gap-2"
      >
        Back to Earth
      </Link>
    </div>
  );
}
