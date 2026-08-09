import { useEffect, useState } from "react";

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
  </svg>
);

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let removeTimer: ReturnType<typeof setTimeout>;
    const finish = () => {
      setLeaving(true);
      removeTimer = setTimeout(() => setHidden(true), 500);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearTimeout(removeTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`preloader ${leaving ? "preloader-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Загрузка"
    >
      <div className="flex flex-col items-center">
        <Star className="preloader-star h-6 w-6 text-[#1C3C8C]" />
        <div className="preloader-track">
          <span className="preloader-bar" />
        </div>
      </div>
    </div>
  );
}
