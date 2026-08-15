import { memo, useEffect, useState } from "react";

export const StickyMobileCTA = memo(function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // We check for the hero element. If it doesn't exist (e.g. during a transition),
    // we wait a bit or just poll, but usually it's there on load.
    const updateVisibility = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setIsVisible(false);
        return;
      }

      const rect = hero.getBoundingClientRect();
      // Show only when the bottom of hero is passed
      setIsVisible(rect.bottom <= 0);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    
    // Initial check
    updateVisibility();

    // Periodic check in case DOM changes without scroll
    const interval = setInterval(updateVisibility, 500);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-4 pt-4 bg-gradient-to-t from-[#EFF6FF]/95 via-[#EFF6FF]/80 to-transparent backdrop-blur-[2px] lg:hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="pb-[env(safe-area-inset-bottom)]">
        <a
          href="https://n2418813.yclients.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full !min-h-[60px] !rounded-[12px] shadow-lg shadow-[#1C3C8C]/15"
        >
          Онлайн запись
        </a>
      </div>
    </div>
  );
});
