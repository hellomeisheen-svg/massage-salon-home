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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#EFF6FF] p-6 text-center">
      <div className="max-w-md space-y-4">
        <h2 className="text-xl font-medium text-[#1C3C8C]">Похоже, загрузка заняла слишком много времени</h2>
        <p className="text-[#566A93]">Попробуйте обновить страницу или проверьте соединение.</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Обновить страницу
        </button>
      </div>
    </div>
  );
}
