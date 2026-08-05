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
    src: "/images/uslugi-limfodrenazhnyi-massazh.jpg",
    className:
      "absolute left-[2%] top-[6%] sm:left-[6%] sm:top-[80px] xl:left-[10%] xl:top-[110px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-2xl object-cover shadow-sm",
    delay: "0s",
    rot: "-3deg",
  },
  {
    src: "/images/uslugi-massazh-golovy.jpg",
    className:
      "absolute right-[2%] top-[5%] sm:right-[6%] sm:top-[80px] xl:right-[10%] xl:top-[110px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-2xl object-cover shadow-sm",
    delay: "0.2s",
    rot: "3deg",
  },
  {
    src: "/images/uslugi-massazh-spiny-i-shei.jpg",
    className:
      "absolute left-[10%] bottom-[6%] sm:left-[14%] sm:bottom-[-60px] xl:left-[18%] xl:bottom-[-80px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-2xl object-cover shadow-sm",
    delay: "0.4s",
    rot: "2deg",
  },
  {
    src: "/images/uslugi-girudoterapiya.jpg",
    className:
      "absolute right-[10%] bottom-[8%] sm:right-[14%] sm:bottom-[-60px] xl:right-[18%] xl:bottom-[-80px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-2xl object-cover shadow-sm",
    delay: "0.6s",
    rot: "-2deg",
  },
];


export function QuoteBlock() {
  return (
    <section className="relative bg-[#EFF6FF] pt-[60px] pb-[60px] sm:pt-[140px] sm:pb-[140px] xl:pt-[180px] xl:pb-[60px]">
      {/* Decorative photos — hidden on very small screens to avoid clutter */}
      <div className="absolute inset-0 hidden sm:block">
        {decoImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className={`deco-photo ${img.className}`}
            style={{
              ["--deco-delay" as string]: img.delay,
              ["--deco-rot" as string]: img.rot,
            }}
          />
        ))}
      </div>

      <div className="container-1900 relative z-10 flex flex-col items-center sm:px-5 text-center">
        <Sparkle className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]" />
        <h2
          className="max-w-none sm:max-w-[900px] xl:max-w-[1100px] text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px] sm:leading-[1.18] xl:text-[54px] xl:leading-[1.15]"
          style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
        >
          Здесь можно выдохнуть и&nbsp;побыть в&nbsp;спокойном ритме. Работа с&nbsp;тем состоянием, в&nbsp;котором вы&nbsp;пришли&nbsp;— без&nbsp;шаблонов и&nbsp;без&nbsp;спешки
        </h2>
      </div>
    </section>
  );
}
