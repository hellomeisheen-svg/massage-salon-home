import { memo } from "react";

export const StickyMobileCTA = memo(function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000] p-4 pt-6 bg-gradient-to-t from-[#EFF6FF]/95 via-[#EFF6FF]/80 to-transparent backdrop-blur-[2px] lg:hidden">
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
