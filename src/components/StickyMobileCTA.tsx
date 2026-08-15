import { memo, useEffect, useState } from "react";

export const StickyMobileCTA = memo(function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      // Показываем кнопку, когда нижняя граница hero скрывается из виду
      setIsVisible(rect.bottom <= 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
