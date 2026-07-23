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

const decoImages = [
  {
    src: "/images/deco-massage-1.jpg",
    alt: "",
    className:
      "absolute left-[2%] top-[6%] h-[70px] w-[70px] sm:h-[85px] sm:w-[85px] xl:h-[100px] xl:w-[100px] rounded-2xl object-cover shadow-sm",
  },
  {
    src: "/images/deco-massage-2.jpg",
    alt: "",
    className:
      "absolute right-[2%] top-[5%] h-[70px] w-[70px] sm:h-[85px] sm:w-[85px] xl:h-[100px] xl:w-[100px] rounded-2xl object-cover shadow-sm",
  },
  {
    src: "/images/deco-massage-3.jpg",
    alt: "",
    className:
      "absolute left-[10%] bottom-[6%] h-[70px] w-[70px] sm:h-[85px] sm:w-[85px] xl:h-[100px] xl:w-[100px] rounded-2xl object-cover shadow-sm",
  },
  {
    src: "/images/deco-massage-4.jpg",
    alt: "",
    className:
      "absolute right-[10%] bottom-[8%] h-[70px] w-[70px] sm:h-[85px] sm:w-[85px] xl:h-[100px] xl:w-[100px] rounded-2xl object-cover shadow-sm",
  },
];

const sparkles = [
  "absolute left-[10%] bottom-[32%] h-4 w-4 xl:h-5 xl:w-5 text-[#1C3C8C]",
  "absolute right-[8%] top-[40%] h-4 w-4 xl:h-5 xl:w-5 text-[#1C3C8C]",
  "absolute left-[30%] bottom-[6%] h-3 w-3 xl:h-4 xl:w-4 text-[#1C3C8C]",
  "absolute right-[32%] bottom-[4%] h-3 w-3 xl:h-4 xl:w-4 text-[#1C3C8C]",
  "absolute left-[46%] top-[6%] h-3 w-3 xl:h-4 xl:w-4 text-[#1C3C8C]",
];

export function QuoteBlock() {
  return (
    <section className="relative overflow-hidden bg-[#EFF6FF] py-28 sm:py-36 xl:py-48">
      {/* Decorative photos — hidden on very small screens to avoid clutter */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {decoImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            width={512}
            height={512}
            loading="lazy"
            className={img.className}
          />
        ))}
      </div>

      {/* Decorative sparkles */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {sparkles.map((cls, i) => (
          <Sparkle key={i} className={cls} />
        ))}
      </div>

      <div className="container-1900 relative z-10 flex flex-col items-center px-5 text-center">
        <Sparkle className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]" />
        <h2
          className="max-w-[900px] xl:max-w-[1100px] text-[26px] font-light leading-[1.2] text-[#1C3C8C] sm:text-[38px] sm:leading-[1.18] xl:text-[54px] xl:leading-[1.15]"
          style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
        >
          Здесь можно выдохнуть и побыть в спокойном ритме. Работа с тем состоянием, в котором вы пришли — без шаблонов и без спешки
        </h2>
      </div>
    </section>
  );
}
