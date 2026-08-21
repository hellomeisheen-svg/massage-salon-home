import { useEffect } from "react";

declare global {
  interface Window {
    ym: any;
    dataLayer: any[];
  }
}

export function Analytics() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.ym) return;

    // Yandex.Metrika loader
    (function(m: any, e: Document, t: string, r: string, i: string) {
      m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments) };
      m[i].l = 1 * (new Date() as any);
      
      const scripts = e.getElementsByTagName(t);
      for (let j = 0; j < scripts.length; j++) {
        const s = scripts[j] as HTMLScriptElement;
        if (s.src === r) return;
      }
      
      const k = e.createElement(t) as HTMLScriptElement;
      const a = e.getElementsByTagName(t)[0] as HTMLScriptElement;
      k.async = true;
      k.src = r;
      if (a && a.parentNode) {
        a.parentNode.insertBefore(k, a);
      }
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=111534340", "ym");

    window.ym(111534340, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: "dataLayer"
    });
  }, []);

  return null;
}
