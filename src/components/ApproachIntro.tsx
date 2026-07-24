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

export function ApproachIntro() {
  return (
    <section className="bg-[#EFF6FF] py-[70px]">
      <div className="container-1900 flex flex-col items-center sm:px-5 text-center">
        <Sparkle className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]" />
        <h2
          className="max-w-none sm:max-w-[900px] xl:max-w-[1100px] text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px] sm:leading-[1.18] xl:text-[54px] xl:leading-[1.15]"
          style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
        >
          Три&nbsp;вещи, на&nbsp;которых держится работа кабинета: подход мастера, палитра практик и&nbsp;среда вокруг
        </h2>
      </div>
    </section>
  );
}
