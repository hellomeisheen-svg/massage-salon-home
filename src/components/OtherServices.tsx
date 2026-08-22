import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export const otherServices = [
  {
    slug: "vektornyi-massazh",
    title: "Векторный массаж",
    description: "Точная работа с мышцами и фасциями для снятия зажимов и восстановления лёгкости и свободы по всему теле.",
    isHit: true,
  },
  {
    slug: "girudoterapiya",
    title: "Гирудотерапия",
    description: "Бережная работа с медицинскими пиявками для глубокого расслабления и восстановления внутреннего баланса.",
    isHit: true,
  },
  {
    slug: "ketgut",
    title: "Акупунктурный кетгут",
    description: "Постановка тонких нитей в акупунктурные точки для длительной поддержки и мягкого восстановления баланса.",
    isHit: true,
  },
  {
    slug: "vakuumnyi-massazh",
    title: "Вакуумный массаж",
    description: "Вакуумный массаж стеклянными и мягкими инструментами, снимающий тяжесть и возвращающий телу лёгкость и баланс.",
  },
  {
    slug: "limfaticheskii-massazh",
    title: "Лимфодренажный массаж",
    description: "Мягкий массаж для уменьшения отёчности и тяжести ног. Возвращает лёгкость, комфорт и спокойствие в теле.",
  },
  {
    slug: "klassicheskii-massazh",
    title: "Классический массаж",
    description: "Комплексная проработка тела для снятия напряжения и усталости. Восстанавливает силы и ощущение лёгкости.",
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
    "group flex flex-col ds-card ds-bento-shadow p-4 sm:p-5 border border-[#DAEBFF]";

  const Controls = ({ className }: { className: string }) => (
    <div className={className}>
      <button
        type="button"
        onClick={() => scroll(-1)}
        disabled={!canPrev}
        aria-label="Предыдущие услуги"
        className="h-12 w-12 rounded-[12px] border border-[#daebff] bg-white flex items-center justify-center text-[#1C3C8C] transition-[background-color,opacity] hover:bg-[#EFF6FF] active:opacity-60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        disabled={!canNext}
        aria-label="Следующие услуги"
        className="h-12 w-12 rounded-[12px] border border-[#daebff] bg-white flex items-center justify-center text-[#1C3C8C] transition-[background-color,opacity] hover:bg-[#EFF6FF] active:opacity-60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
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
                borderRadius: "12px",
                backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
              }}
            >
              Смотрите также
            </span>
            <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[#1C3C8C] max-w-[520px]">
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
          className="mt-8 xl:mt-4 flex gap-3 overflow-x-auto scrollbar-none scroll-smooth p-6 -m-6"
        >
          {items.map((service) => (
            <Link
              key={service.slug}
              to={`/${service.slug}`}
              className={`${cardClass} flex-[0_0_100%] sm:flex-[0_0_calc((100%-0.75rem)/2)] xl:flex-[0_0_calc((100%-3*0.75rem)/4)] snap-start`}
            >
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="ds-h4 font-noto-serif-narrow font-light leading-[1.2] text-[#1C3C8C]">
                    {service.title}
                  </h3>
                  {'isHit' in service && service.isHit && (
                    <span 
                      className="ml-2 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase"
                      style={{
                        borderRadius: "12px",
                        backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
                      }}
                    >
                      Хит
                    </span>
                  )}
                </div>
                <p className="mt-2 body-text text-[#566A93]">
                  {service.description}
                </p>
              </div>
              <div className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1C3C8C] transition-opacity group-hover:opacity-70">
                Подробнее об услуге
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
