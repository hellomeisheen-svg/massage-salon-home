import { useEffect, useRef, useState } from "react";

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
  </svg>
);

const MIN_DISPLAY_TIME = 1500;
const FADE_DURATION = 400;

export function Preloader() {
  const [shouldRender, setShouldRender] = useState(true);
  const [leaving, setLeaving] = useState(false);
  
  const startTimeRef = useRef(Date.now());
  const isFinishedRef = useRef(false);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = 'hidden';

    const finish = () => {
      if (isFinishedRef.current) return;
      isFinishedRef.current = true;

      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsed);

      setTimeout(() => {
        setLeaving(true);
        // Unlock scroll when animation starts
        document.body.style.overflow = '';
        
        setTimeout(() => {
          setShouldRender(false);
        }, FADE_DURATION);
      }, remainingTime);
    };

    // Safety fallback
    const safetyTimer = setTimeout(finish, 5000);

    const checkReadyState = () => {
      const heroImg = document.querySelector('img[src*="hero-portrait-solid"]') as HTMLImageElement;
      
      if (document.readyState === "complete") {
        if (!heroImg || heroImg.complete) {
          finish();
        } else {
          heroImg.addEventListener('load', finish, { once: true });
          heroImg.addEventListener('error', finish, { once: true });
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("load", checkReadyState, { once: true });
      // In case load event already fired
      checkReadyState();
    }

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("load", checkReadyState);
      // Ensure overflow is restored on unmount
      document.body.style.overflow = '';
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
        zIndex: 99999, // Extremely high z-index
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eff6ff',
        opacity: leaving ? 0 : 1,
        visibility: leaving && !shouldRender ? 'hidden' : 'visible',
        transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), visibility ${FADE_DURATION}ms`,
        pointerEvents: leaving ? 'none' : 'auto',
        userSelect: 'none',
        touchAction: 'none'
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
          .animate-[loading-bar_1.5s_infinite_linear] { 
            animation: none !important; 
            transform: none !important; 
            width: 100% !important; 
          }
        }
      `}</style>
    </div>
  );
}
