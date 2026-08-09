import { useEffect, useRef, useState } from "react";

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
  </svg>
);

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const loadedRef = useRef(false);

  useEffect(() => {
    let progressInterval: ReturnType<typeof setInterval>;
    let removeTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;
      clearInterval(progressInterval);
      setProgress(100);
      setLeaving(true);
      removeTimer = setTimeout(() => setHidden(true), 500);
    };

    const tick = () => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const remaining = 100 - prev;
        const step = Math.max(1, Math.floor(remaining * 0.08));
        return Math.min(prev + step, 90);
      });
    };

    progressInterval = setInterval(tick, 120);

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(removeTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`preloader ${leaving ? "preloader-leaving" : ""}`}
      role="progressbar"
      aria-label="Загрузка"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div className="flex flex-col items-center">
        <Star className="preloader-star h-6 w-6 text-[#1C3C8C]" />
        <span className="preloader-percent" aria-hidden="true">
          {progress}%
        </span>
        <div className="preloader-track">
          <span
            className="preloader-bar"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}
