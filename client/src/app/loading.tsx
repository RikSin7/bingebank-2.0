export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col items-center justify-center bg-[#030303]">
      <div className="flex flex-col items-center gap-6">
        
        {/* ─── ELASTIC ORBIT SPINNER (PURE CSS) ─── */}
        <div className="relative flex items-center justify-center w-10 h-10">
          
          {/* Static Faint Background Track */}
          <svg className="absolute inset-0 w-full h-full text-white/5" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Rotating Container */}
          <svg
            className="absolute inset-0 w-full h-full text-white/80 animate-spin"
            viewBox="0 0 50 50"
            style={{ animationDuration: '2s' }}
          >
            {/* Elastic Stretching Line */}
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{ animation: 'elastic-stroke 1.5s ease-in-out infinite' }}
            />
          </svg>
        </div>

        {/* ─── BREATHING TYPOGRAPHY ─── */}
        <p 
          className="text-[10px] font-medium tracking-[0.4em] text-white/60 uppercase pl-1.5"
          style={{ animation: 'breathe 2s ease-in-out infinite' }}
        >
          Loading
        </p>
        
      </div>

      {/* ─── CSS KEYFRAMES ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes elastic-stroke {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
          }
          100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
          }
        }
        
        @keyframes breathe {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}} />
    </div>
  );
}