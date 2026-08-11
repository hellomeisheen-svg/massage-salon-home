import { useEffect } from "react";

import { typographyPass } from "@/lib/typography";

/**
 * Применяет русскую типографику ко всему тексту страницы
 * и следит за изменениями DOM (React-рендеры, анимации, модалки).
 */
export function TypographyProvider() {
  useEffect(() => {
    let scheduled = false;
    let observer: MutationObserver | null = null;

    const run = () => {
      scheduled = false;
      observer?.disconnect();
      typographyPass(document.body);
      observer?.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      setTimeout(() => requestAnimationFrame(run), 0);
    };

    observer = new MutationObserver(schedule);
    schedule();

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  return null;
}
