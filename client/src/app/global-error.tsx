"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-[#030303] text-white">
        <div className="text-center max-w-md">

          <AlertTriangle className="mx-auto mb-6 h-12 w-12 text-red-400" />

          <h1 className="text-3xl font-bold mb-3">
            Critical Error
          </h1>

          <p className="text-zinc-400 mb-8">
            Something went wrong at the application level.
          </p>

          <button
            onClick={() => reset()}
            className="cursor-pointer flex items-center gap-2 mx-auto rounded-full bg-white px-6 py-3 text-black"
          >
            <RotateCcw className="h-4 w-4" />
            Reload App
          </button>

        </div>
      </body>
    </html>
  );
}