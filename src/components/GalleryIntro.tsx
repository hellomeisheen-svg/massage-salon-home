export function GalleryIntro() {
  return (
    <section className="bg-[#EFF6FF] pt-[60px] pb-8 xl:pt-[140px] xl:pb-0">
      <div className="container-1900 flex flex-col items-center text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]"
        >
          <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
        </svg>
        <h2
          className="font-noto-serif-narrow max-w-none sm:max-w-[900px] xl:max-w-[1100px] ds-h1 text-[#1C3C8C]"
          style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
        >
          Здесь важно не&nbsp;только то, как работают руки, но&nbsp;и&nbsp;то, что&nbsp;вас окружает
        </h2>
      </div>
    </section>
  );
}
