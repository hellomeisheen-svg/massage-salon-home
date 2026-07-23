export function PromoBanner() {
  return (
    <section className="bg-[#EFF6FF] pb-10 sm:pb-16 xl:pb-20">
      <div className="container-1900 px-5">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ backgroundColor: "#DCE7FB" }}
        >
          {/* Large white dome in the middle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
            style={{
              width: "160%",
              aspectRatio: "2 / 1",
              background: "#F4F7FE",
              borderRadius: "50%",
              transform: "translate(-50%, -18%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-[960px] flex-col items-center px-6 py-20 text-center sm:py-24 xl:py-28">
            <h2
              className="text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[44px] xl:text-[56px]"
              style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
            >
              Знакомство с кабинетом по комфортной цене
            </h2>
            <p className="mt-5 max-w-[600px] text-[15px] leading-[22px] text-[#8D9DC5] sm:text-[16px] sm:leading-[24px]">
              Чтобы знакомство с кабинетом проходило спокойно, на первый визит
              действует особая цена. Подберём формат и обсудим всё заранее.
            </p>

            <div className="relative mt-10 inline-flex items-start">
              <button
                type="button"
                className="rounded-xl bg-white px-12 py-4 text-[16px] font-medium text-[#1C3C8C] shadow-[0_12px_30px_-14px_rgba(28,60,140,0.35)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-14px_rgba(28,60,140,0.45)]"
              >
                Записаться
              </button>
              <span
                className="pointer-events-none absolute -right-7 -top-3 rotate-[10deg] rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white shadow-[0_6px_16px_-4px_rgba(74,126,224,0.4)]"
                style={{
                  background:
                    "linear-gradient(135deg, #8AB0FF 0%, #4A7EE0 100%)",
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
