export function PromoBanner() {
  return (
    <section className="bg-[#EFF6FF] pb-10 sm:pb-16 xl:pb-20">
      <div className="container-1900 px-5">
        <div className="relative overflow-hidden rounded-2xl border border-[#daebff] bg-white/60 py-16 sm:py-24 xl:py-28">
          {/* Decorative cloud shapes */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 1600 400"
            fill="none"
          >
            <defs>
              <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DCE9FF" />
                <stop offset="100%" stopColor="#EAF2FF" />
              </linearGradient>
            </defs>
            {/* Left cloud cluster */}
            <path
              d="M-40 40 Q60 20 140 80 Q220 30 320 90 Q400 60 460 130 Q520 100 560 170 L560 400 L-40 400 Z"
              fill="url(#cloudGrad)"
              opacity="0.85"
            />
            {/* Right cloud cluster */}
            <path
              d="M1640 40 Q1540 20 1460 80 Q1380 30 1280 90 Q1200 60 1140 130 Q1080 100 1040 170 L1040 400 L1640 400 Z"
              fill="url(#cloudGrad)"
              opacity="0.85"
            />
          </svg>

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-5 text-center">
            <h2
              className="text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[44px] xl:text-[56px]"
              style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
            >
              Знакомство с кабинетом по комфортной цене
            </h2>
            <p className="mt-5 max-w-[620px] text-[15px] leading-[22px] text-[#8D9DC5] sm:text-[16px] sm:leading-[24px]">
              Чтобы знакомство с кабинетом проходило спокойно, на первый визит
              действует особая цена. Подберём формат и обсудим всё заранее.
            </p>

            <div className="relative mt-10 inline-flex">
              <button
                type="button"
                className="rounded-xl bg-white px-10 py-4 text-[16px] font-medium text-[#1C3C8C] shadow-[0_10px_30px_-12px_rgba(28,60,140,0.25)] transition-all duration-300 hover:shadow-[0_14px_36px_-12px_rgba(28,60,140,0.35)]"
              >
                Записаться
              </button>
              <span
                className="absolute -right-6 -top-3 rotate-[8deg] rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #6B9BFF 0%, #4A7EE0 100%)",
                }}
              >
                −20%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
