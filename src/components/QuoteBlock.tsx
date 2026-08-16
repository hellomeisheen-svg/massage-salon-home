import ImageReveal from "@/components/ui/image-tiles";

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
    src: "/images/uslugi-limfodrenazhnyi-massazh.webp",
    className:
      "absolute left-0 top-[6%] sm:left-[2%] sm:top-[80px] xl:left-[60px] xl:top-[110px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover shadow-quote-photo",
    delay: "0s",
    rot: "-3deg",
  },
  {
    src: "/images/uslugi-massazh-golovy.webp",
    className:
      "absolute right-0 top-[5%] sm:right-[2%] sm:top-[80px] xl:right-[60px] xl:top-[110px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover shadow-quote-photo",
    delay: "0.2s",
    rot: "3deg",
  },
  {
    src: "/images/uslugi-massazh-spiny-i-shei.webp",
    className:
      "absolute left-[8%] bottom-[6%] sm:left-[10%] sm:bottom-[15px] xl:left-[140px] xl:bottom-[20px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover shadow-quote-photo",
    delay: "0.4s",
    rot: "2deg",
  },
  {
    src: "/images/uslugi-girudoterapiya.webp",
    className:
      "absolute right-[8%] bottom-[8%] sm:right-[10%] sm:bottom-[15px] xl:right-[140px] xl:bottom-[20px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover shadow-quote-photo",
    delay: "0.6s",
    rot: "-2deg",
  },
];


export function QuoteBlock() {
  return (
    <section className="relative bg-[#EFF6FF] pt-[60px] pb-[60px] sm:pt-[140px] sm:pb-[180px] xl:pt-[180px] xl:pb-[140px] overflow-hidden">
      {/* Decorative photos — constrained to container width */}
      <div className="container-1900 absolute inset-0 left-1/2 -translate-x-1/2 hidden sm:block pointer-events-none">
        <div className="relative w-full h-full">
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
      </div>

      <div className="container-1900 relative z-10 flex flex-col items-center sm:px-5 text-center">
        <Sparkle className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]" />
        <h2 className="font-noto-serif-narrow max-w-none sm:max-w-[900px] text-center xl:w-[min(calc(100%-160px),1250px)] xl:max-w-[1250px] xl:mx-auto ds-h1 text-[#1C3C8C]">
          «Иногда достаточно тишины и&nbsp;бережного внимания, чтобы почувствовать себя лучше»
        </h2>

        <div className="mt-6 hidden sm:flex xl:hidden flex-col items-center gap-1">
          <div className="font-noto-serif-narrow ds-h4 text-[#1c3c8c]">
            Татьяна Злобина
          </div>
          <p className="text-[16px] font-light leading-[26px] text-[#566A93]">
            Мастер кабинета, специалист по&nbsp;оздоровительным практикам
          </p>
        </div>

        {/* Mobile-only photo tiles with subtle animation */}
        <div className="mt-10 flex w-full justify-center overflow-hidden sm:hidden">
          <ImageReveal
            spread={95}
            leftImage="/images/uslugi-limfodrenazhnyi-massazh.webp"
            middleImage="/images/uslugi-massazh-spiny-i-shei.webp"
            rightImage="/images/uslugi-massazh-golovy.webp"
          />
        </div>
      </div>

    </section>
  );
}
