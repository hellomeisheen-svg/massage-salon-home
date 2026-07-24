export function PromoBanner() {
  return (
    <section className="bg-brand-surface pb-10 sm:pb-16 xl:pb-20">
      <div className="container-1900 px-5">
        <div
          className="relative overflow-hidden rounded-2xl border px-6 py-[60px] sm:px-12 xl:px-24"
          style={{ backgroundColor: "#DAEBFF", borderColor: "#BEDDFF" }}
        >
          <img
            src="/images/banner-clouds.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full -translate-y-[10px] select-none"
          />

          <img
            src="/images/banner-clouds-bottom.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full select-none"
          />
          <img
            src="/images/banner-ellipse.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 z-[1] h-full w-[995px] max-w-none -translate-x-1/2 select-none"
            style={{ objectFit: "fill" }}
          />






          <div className="relative z-10 flex flex-col items-center text-center">
            <h2
              className="max-w-[880px] text-[34px] font-light leading-[1.1] text-brand-ink sm:text-[48px] xl:text-[60px]"
              style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
            >
              Знакомство с&nbsp;кабинетом
              <br />
              по&nbsp;комфортной цене
            </h2>

            <p className="mt-5 max-w-[600px] text-[16px] leading-[26px] text-brand-ink/60">
              Первый визит со&nbsp;скидкой 20%. Подберём формат под&nbsp;ваше состояние
              и&nbsp;обсудим всё заранее&nbsp;— без&nbsp;спешки и&nbsp;шаблонов.
            </p>

            <div className="mt-10">
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
