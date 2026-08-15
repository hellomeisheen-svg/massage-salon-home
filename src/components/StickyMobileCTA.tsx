import { memo } from "react";

export const StickyMobileCTA = memo(function StickyMobileCTA() {
  return (
    <div className="fixed left-4 right-4 z-[1000] bottom-[calc(16px+env(safe-area-inset-bottom))] lg:hidden">
      <a
        href="https://n2418813.yclients.com"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full min-h-[48px] rounded-[12px] shadow-lg shadow-[#1C3C8C]/10"
      >
        Онлайн запись
      </a>
    </div>
  );
});
