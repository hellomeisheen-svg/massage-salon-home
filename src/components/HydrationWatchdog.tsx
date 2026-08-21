import { useEffect, useState } from "react";

/**
 * Detects if the app fails to hydrate within a reasonable time.
 * Shows a fallback if the main app seems stuck.
 */
export function HydrationWatchdog() {
  const [isHanging, setIsHanging] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // If we're here, hydration didn't finish or took too long
      console.error("Hydration watchdog: Hydration seems to be hanging or very slow.");
      setIsHanging(true);
    }, 12000); // 12 seconds threshold

    return () => clearTimeout(timer);
  }, []);

  if (!isHanging) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] sm:left-auto sm:w-[400px]">
      <div className="ds-card ds-bento-shadow flex flex-col items-start gap-3 p-4 bg-white/95 backdrop-blur-md border-[#DAEBFF]">
        <div className="flex items-center gap-2 text-[#1C3C8C]">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#1C3C8C]" />
          <p className="text-sm font-medium">Некоторые элементы загружаются дольше обычного</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="text-xs font-medium text-[#1C3C8C] underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          Обновить страницу
        </button>
      </div>
    </div>
  );
}
