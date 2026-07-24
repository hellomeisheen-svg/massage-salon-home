export function PromoBanner() {
  return (
    <section className="bg-brand-surface pt-16 pb-10 sm:pt-24 sm:pb-16 xl:pt-[140px] xl:pb-20">
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

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2
              className="max-w-[880px] text-[30px] font-light leading-[1.1] text-brand-ink sm:text-[44px] xl:text-[60px]"
              style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
            >
              Знакомство с&nbsp;кабинетом
              <br className="hidden sm:block" />
              {" "}по&nbsp;комфортной цене
            </h2>

            <p className="mt-4 max-w-[600px] text-[15px] leading-[24px] text-brand-ink/60 sm:mt-5 sm:text-[16px] sm:leading-[26px]">
              Первый визит со&nbsp;скидкой 20%. Подберём формат под&nbsp;ваше состояние
              и&nbsp;обсудим всё заранее&nbsp;— без&nbsp;спешки и&nbsp;шаблонов.
            </p>

            <div className="mt-8 w-full sm:mt-10 sm:w-auto">
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
