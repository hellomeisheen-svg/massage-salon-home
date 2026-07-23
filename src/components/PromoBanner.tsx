const Sparkle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
  </svg>
);

export function PromoBanner() {
  return (
    <section className="bg-[#EFF6FF] pb-10 sm:pb-16 xl:pb-20">
      <div className="container-1900 px-5">
        <div
          className="relative overflow-hidden rounded-2xl border border-[#daebff] px-6 py-16 sm:px-12 sm:py-20 xl:px-20 xl:py-24"
          style={{
            background:
              "linear-gradient(135deg, #1C3C8C 0%, #2E5AC8 55%, #4A7EE0 100%)",
          }}
        >
          {/* Soft glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
            style={{ background: "#8AB0FF" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full opacity-25 blur-3xl"
            style={{ background: "#EFF6FF" }}
          />

          {/* Decorative sparkles */}
          <Sparkle className="pointer-events-none absolute left-[8%] top-[22%] h-4 w-4 text-white/60" />
          <Sparkle className="pointer-events-none absolute right-[12%] top-[18%] h-3 w-3 text-white/50" />
          <Sparkle className="pointer-events-none absolute right-[8%] bottom-[24%] h-5 w-5 text-white/50" />
          <Sparkle className="pointer-events-none absolute left-[14%] bottom-[18%] h-3 w-3 text-white/60" />

          <div className="relative z-10 grid gap-10 xl:grid-cols-[1.4fr_1fr] xl:items-center xl:gap-16">
            {/* Left: text */}
            <div className="flex flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[13px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Первый визит
              </span>
              <h2
                className="mt-6 text-[34px] font-light leading-[1.1] text-white sm:text-[48px] xl:text-[60px]"
                style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
              >
                Начните мягко —<br />
                с комфортной цены
              </h2>
              <p className="mt-5 max-w-[520px] text-[15px] leading-[24px] text-white/70 sm:text-[16px] sm:leading-[26px]">
                Первое знакомство с кабинетом со скидкой 20%. Подберём формат
                под ваше состояние и обсудим всё заранее — без спешки.
              </p>
            </div>

            {/* Right: CTA card */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-[64px] font-light leading-none text-white sm:text-[80px]"
                  style={{
                    fontFamily: "'Roslindale Display Condensed', serif",
                  }}
                >
                  −20%
                </span>
                <span className="text-[14px] text-white/70">на первый визит</span>
              </div>
              <div className="mt-6 h-px w-full bg-white/20" />
              <div className="mt-6 flex flex-col gap-3 text-[14px] text-white/80">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  Индивидуальный подбор формата
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  Спокойная беседа перед сеансом
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  Без ограничений по услуге
                </div>
              </div>
              <button
                type="button"
                className="mt-8 w-full rounded-xl bg-white px-6 py-4 text-[15px] font-medium text-[#1C3C8C] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
