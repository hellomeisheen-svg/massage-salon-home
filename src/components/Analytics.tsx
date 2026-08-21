import { useEffect } from "react";

declare global {
  interface Window {
    ym: any;
  }
}

export function Analytics() {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Prevent duplicate injection
    if (window.ym) return;

    (function(m, e, t, r, i, k, a) {
      m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments) };
      m[i].l = 1 * (new Date() as any);
      for (var j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) { return; }
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=111534340", "ym");

    window.ym(111534340, "init", {
      ssr: false, // We handle initialization on client
      webvisor: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      ecommerce: "dataLayer"
    });
  }, []);

  return null;
}
