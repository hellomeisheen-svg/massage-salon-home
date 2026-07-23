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
    <section className="bg-brand-surface pb-10 sm:pb-16 xl:pb-20">
      <div className="container-1900 px-5">
        <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-white px-6 py-16 sm:px-12 sm:py-20 xl:px-24 xl:py-24">
          {/* Soft brand glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full opacity-60 blur-3xl"
            style={{ background: "var(--brand-blue-tint)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 -right-32 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
            style={{ background: "var(--brand-surface)" }}
          />

          {/* Decorative sparkles */}
          <Sparkle className="pointer-events-none absolute left-[6%] top-[18%] hidden h-4 w-4 text-brand-blue/60 sm:block" />
          <Sparkle className="pointer-events-none absolute right-[10%] top-[14%] hidden h-3 w-3 text-brand-blue/50 sm:block" />
          <Sparkle className="pointer-events-none absolute right-[6%] bottom-[22%] hidden h-5 w-5 text-brand-blue/50 sm:block" />
          <Sparkle className="pointer-events-none absolute left-[12%] bottom-[16%] hidden h-3 w-3 text-brand-blue/60 sm:block" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-4 py-1.5 text-[13px] font-medium tracking-wide text-brand-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
              Первый визит
            </span>

            <h2
              className="mt-6 max-w-[880px] text-[34px] font-light leading-[1.1] text-brand-ink sm:text-[48px] xl:text-[60px]"
              style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
            >
              Знакомство с кабинетом
              <br />
              по комфортной цене
            </h2>

            <p className="mt-5 max-w-[600px] text-[15px] leading-[24px] text-brand-ink/60 sm:text-[16px] sm:leading-[26px]">
              Первый визит со скидкой 20%. Подберём формат под ваше состояние
              и обсудим всё заранее — без спешки и шаблонов.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                className="btn-primary group gap-2"
              >
                Записаться
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <span
                className="inline-flex items-center rounded-full bg-brand-ink px-4 py-2 text-[13px] font-medium text-white"
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
