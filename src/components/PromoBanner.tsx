export function PromoBanner() {
  return (
    <section className="bg-brand-surface py-[60px] sm:py-[70px]">
      <div className="container-1900 px-5">
        <div
          className="relative overflow-hidden rounded-2xl border px-6 py-14 sm:px-12 sm:py-16 xl:px-24 xl:py-[60px]"
          style={{ backgroundColor: "#DAEBFF", borderColor: "#daebff" }}
        >
          <img
            src="/images/banner-clouds.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full -translate-y-[10px] select-none sm:hidden xl:block"
          />

          <img
            src="/images/banner-clouds-bottom.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden w-full translate-y-[30px] select-none xl:block"
          />
          <img
            src="/images/banner-ellipse.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 z-[1] hidden h-full w-[140%] max-w-none -translate-x-1/2 select-none sm:block sm:w-[120%] xl:w-[995px]"
            style={{ objectFit: "fill" }}
          />

          {/* Decorative background sparkles */}
          {[
            "absolute left-[6%] top-[18%] h-4 w-4 sm:h-5 sm:w-5",
            "absolute left-[14%] bottom-[22%] h-3 w-3 sm:h-4 sm:w-4",
            "absolute right-[8%] top-[24%] h-5 w-5 sm:h-6 sm:w-6",
            "absolute right-[14%] bottom-[18%] h-3 w-3 sm:h-4 sm:w-4",
            "absolute left-[42%] top-[10%] h-3 w-3 sm:h-4 sm:w-4",
            "absolute right-[40%] bottom-[12%] h-4 w-4 sm:h-5 sm:w-5",
          ].map((cls, i) => (
            <svg
              key={i}
              className={`${cls} pointer-events-none z-[2] text-white/70`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
            </svg>
          ))}

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2
              className="text-[30px] font-light leading-[1.1] text-brand-ink sm:whitespace-nowrap sm:text-[32px] xl:text-[44px]"
              style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
            >
              Знакомство с&nbsp;кабинетом по&nbsp;комфортной цене
            </h2>

            <p className="mt-4 max-w-[600px] text-[15px] leading-[24px] text-brand-ink/60 sm:mt-5 sm:text-[16px] sm:leading-[26px]">
              Первый визит со&nbsp;скидкой 20%. Подберём формат под&nbsp;ваше состояние
              и&nbsp;обсудим всё заранее&nbsp;— без&nbsp;спешки и&nbsp;шаблонов.
            </p>

            <div className="mt-8 w-full px-2 sm:mt-10 sm:w-auto sm:px-0">
              <button
                type="button"
                className="btn-primary w-full sm:w-[250px]"
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
