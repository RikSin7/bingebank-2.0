import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-zinc-400">
        <Loader2 className="h-10 w-10 animate-spin text-red-500" />
        <p className="text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
