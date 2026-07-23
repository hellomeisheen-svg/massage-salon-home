export function QuoteBlock() {
  return (
    <section className="bg-[#EFF6FF] py-20 sm:py-28 xl:py-36">
      <div className="container-1900 flex flex-col items-center text-center px-5">
        <svg
          className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
        </svg>
        <h2
          className="font-light text-[#1C3C8C] text-[28px] leading-[1.2] sm:text-[44px] sm:leading-[1.18] xl:text-[64px] xl:leading-[1.15] max-w-[1400px]"
          style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
        >
          Здесь можно выдохнуть и побыть в спокойном ритме. Работа с тем состоянием, в котором вы пришли — без шаблонов и без спешки
        </h2>
      </div>
    </section>
  );
}
