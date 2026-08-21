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
    console.log("Preloader effect start");
    const finish = () => {
      console.log("Preloader finish called");
      if (loadedRef.current) return;
      loadedRef.current = true;
      setLeaving(true);
      setTimeout(() => {
        console.log("Preloader setting shouldRender false");
        setShouldRender(false);
      }, 400);
    };

    const safetyTimer = setTimeout(() => {
      console.log("Preloader safety timer fired");
      finish();
    }, 2000);

    if (document.readyState === "complete") {
      console.log("Preloader readyState complete");
      finish();
    } else {
      console.log("Preloader adding load listener");
      window.addEventListener("load", finish, { once: true });
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
      <div className="preloader-inner">
        <Star className="preloader-star h-6 w-6 text-[#1C3C8C]" />
        <div className="preloader-track">
          <span className="preloader-bar" />
        </div>
      </div>
    </div>
  );
}
