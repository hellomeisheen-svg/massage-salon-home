import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const heading = "'Roslindale Cyrillic Display Condensed', serif";

export const otherServices = [
  {
    slug: "girudoterapiya",
    title: "Гирудотерапия",
    description: "Бережная работа с медицинскими пиявками",
  },
  {
    slug: "banki",
    title: "Банки",
    description: "Вакуумный массаж стеклянными и мягкими банками",
  },
  {
    slug: "vektornyi-massazh",
    title: "Векторный массаж",
    description: "Точная работа с мышцами и фасциями",
  },
  {
    slug: "limfaticheskii-massazh",
    title: "Лимфатический массаж",
    description: "Мягкая работа для уменьшения отёчности",
  },
  {
    slug: "limfodrenazhnyi-massazh",
    title: "Лимфодренажный массаж",
    description: "Последовательная работа от стоп до плеч",
  },
  {
    slug: "klassicheskii-massazh",
    title: "Классический массаж",
    description: "Комплексная проработка тела",
  },
  {
    slug: "ketgut",
    title: "Кетгут",
    description: "Мягкое армирование рассасывающимися нитями",
  },
] as const;


export function OtherServices({ exclude }: { exclude?: string }) {
  const items = otherServices.filter((s) => s.slug !== exclude);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 1);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [items.length]);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | undefined;
    if (!el || !card) return;
    const step = card.offsetWidth + 12; // gap-3
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const cardClass =
    "group flex flex-col justify-between ds-card ds-card-hover p-4 sm:p-5";

  const Controls = ({ className }: { className: string }) => (
    <div className={className}>
      <button
        type="button"
        onClick={() => scroll(-1)}
        disabled={!canPrev}
        aria-label="Предыдущие услуги"
        className="h-12 w-12 rounded-[0.5rem] border border-[#daebff] bg-white flex items-center justify-center text-[#1C3C8C] transition-colors hover:bg-[#EFF6FF] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        disabled={!canNext}
        aria-label="Следующие услуги"
        className="h-12 w-12 rounded-[0.5rem] border border-[#daebff] bg-white flex items-center justify-center text-[#1C3C8C] transition-colors hover:bg-[#EFF6FF] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );

  return (
    <section className="bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
              style={{
                borderRadius: "4px",
                backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
              }}
            >
              Смотрите также
            </span>
            <h2
              className="mt-6 ds-h2 text-[#1C3C8C] max-w-[520px]"
              style={{ fontFamily: heading }}
            >
              Другие услуги
            </h2>
          </div>
        </div>

        {/* Desktop arrows above the carousel */}
        <Controls className="hidden xl:flex justify-end gap-2 mt-6" />

        {/* Carousel */}
        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="mt-4 xl:mt-4 flex gap-3 overflow-hidden scroll-smooth"
        >
          {items.map((service) => (
            <Link
              key={service.slug}
              to={`/${service.slug}`}
              className={`${cardClass} flex-[0_0_100%] sm:flex-[0_0_calc((100%-0.75rem)/2)] xl:flex-[0_0_calc((100%-3*0.75rem)/4)] snap-start`}
            >
              <div>
                <h3
                  className="text-[20px] font-light leading-[1.25] text-[#1C3C8C]"
                  style={{ fontFamily: heading }}
                >
                  {service.title}
                </h3>
                <p className="mt-2 line-clamp-2 body-text text-[#6B7BA8]">
                  {service.description}
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1C3C8C] transition-opacity group-hover:opacity-70">
                Подробнее
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile/tablet arrows below the carousel */}
        <Controls className="flex xl:hidden justify-center gap-2 mt-6" />
      </div>
    </section>
  );
}
