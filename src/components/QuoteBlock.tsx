import ImageReveal from "@/components/ui/image-tiles";

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
      "absolute left-[10%] bottom-[6%] sm:left-[14%] sm:bottom-[15px] xl:left-[18%] xl:bottom-[-60px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-2xl object-cover shadow-sm",
    delay: "0.4s",
    rot: "2deg",
  },
  {
    src: "/images/uslugi-girudoterapiya.jpg",
    className:
      "absolute right-[10%] bottom-[8%] sm:right-[14%] sm:bottom-[15px] xl:right-[18%] xl:bottom-[-60px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-2xl object-cover shadow-sm",
    delay: "0.6s",
    rot: "-2deg",
  },
];

export function QuoteBlock() {
  return (
    <section className="relative bg-[#EFF6FF] py-[120px] sm:py-[140px] xl:py-[180px]">
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

      <div className="container-1900 relative z-10">
        <div className="mx-auto max-w-[1100px] rounded-[32px] border border-[#DAEBFF] bg-white p-8 sm:p-12 xl:p-16 shadow-[0_20px_50px_-12px_rgba(74,127,214,0.08)]">
          <div className="flex flex-col xl:flex-row xl:items-end gap-8 xl:gap-12">
            <div className="flex-1">
              <blockquote
                className="text-[22px] font-normal leading-[1.4] text-[#1C3C8C] sm:text-[24px] xl:text-[28px]"
                style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
              >
                «Я не обещаю мгновенных изменений. Я обещаю внимание, тишину и время, в котором не нужно никуда спешить.»
              </blockquote>

              <p className="mt-6 text-[16px] font-light leading-[1.5] text-[#88C1FF] sm:mt-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Татьяна Злобина — Мастер кабинета, специалист по оздоровительным практикам
              </p>
            </div>

            <div className="w-[200px] sm:w-[240px] xl:w-[280px] flex-shrink-0 xl:self-end">
              <img
                src="/images/signature.svg"
                alt="Подпись Татьяны Злобиной"
                width={280}
                height={113}
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Mobile-only photo tiles */}
        <div className="mt-12 flex w-full justify-center overflow-hidden sm:hidden">
          <ImageReveal
            spread={95}
            leftImage="/images/uslugi-limfodrenazhnyi-massazh.jpg"
            middleImage="/images/uslugi-massazh-spiny-i-shei.jpg"
            rightImage="/images/uslugi-massazh-golovy.jpg"
          />
        </div>
      </div>
    </section>
  );
}
