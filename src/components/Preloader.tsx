import { useEffect, useRef, useState } from "react";

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
  </svg>
);

export function Preloader() {
  const [shouldRender, setShouldRender] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;
      setLeaving(true);
      setTimeout(() => setShouldRender(false), 400);
    };

    const safetyTimer = setTimeout(finish, 2500);

    // Initial check in case it's already loaded (Hydration)
    if (typeof window !== 'undefined' && document.readyState === "complete") {
      finish();
    }

    // We use a global check for critical hero image readiness
    const handleLoad = () => {
      // Check if hero image is loaded (if present)
      const heroImg = document.querySelector('img[src*="hero-portrait-solid"]') as HTMLImageElement;
      if (!heroImg || heroImg.complete) {
        finish();
      } else {
        heroImg.addEventListener('load', finish, { once: true });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("load", handleLoad, { once: true });
    }


    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      className={`preloader-root ${leaving ? "preloader-leaving" : ""}`} 
      aria-label="Загрузка"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eff6ff',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.35s ease',
        pointerEvents: leaving ? 'none' : 'auto'
      }}
    >
      <div className="preloader-inner flex flex-col items-center gap-4">
        <Star className="preloader-star h-8 w-8 text-[#1C3C8C] animate-pulse" />
        <div className="w-16 h-0.5 bg-[#DAEBFF] overflow-hidden rounded-full">
          <div className="h-full bg-[#1C3C8C] w-full origin-left animate-[loading-bar_1.5s_infinite_linear]" />
        </div>
      </div>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .preloader-star { animation: none !important; }
          .animate-[loading-bar_1.5s_infinite_linear] { animation: none !important; transform: none !important; width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
