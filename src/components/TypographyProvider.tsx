import { useEffect } from "react";

import { typographyPass } from "@/lib/typography";

/**
 * Применяет русскую типографику ко всему тексту страницы
 * и следит за появлением новых элементов в DOM (модалки, динамический контент).
 *
 * Первый проход запускается с небольшой задержкой после гидратации,
 * чтобы не вызывать mismatch между серверным HTML и клиентским React-деревом.
 */
export function TypographyProvider() {
  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const initialDelay = isSafari ? 300 : 150;

    let scheduled = false;
    let observer: MutationObserver | null = null;

    const run = () => {
      scheduled = false;
      observer?.disconnect();
      typographyPass(document.body);
      observer?.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    const schedule = (delay = 0) => {
      if (scheduled) return;
      scheduled = true;
      setTimeout(
        () => requestAnimationFrame(run),
        delay,
      );
    };

    observer = new MutationObserver(() => schedule(0));
    schedule(initialDelay);

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  return null;
}

