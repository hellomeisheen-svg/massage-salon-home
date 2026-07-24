import { useEffect, useRef, useState } from "react";

type Service = {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
};

const description =
  "Комплексная техника для\u00A0глубокого расслабления и\u00A0восстановления баланса. Спокойный ритм, внимание к\u00A0деталям и\u00A0ощущение, что\u00A0тело отпускает накопленное напряжение\u00A0— для\u00A0полноценной паузы и\u00A0проработки всего тела.";

const baseService: Service = {
  title: "Векторный",
  subtitle: "Глубокая работа со\u00A0всем телом",
  description,
  duration: "120\u00A0минут",
  price: "5\u00A0000\u00A0₽",
};

const services: Service[] = Array.from({ length: 14 }, () => ({ ...baseService }));


const categories = ["Массаж", "Оздоровительные процедуры"];

const sessions = [
  { label: "1 сеанс", discount: null },
  { label: "3 сеансов", discount: "-10%" },
  { label: "6 сеансов", discount: "-15%" },
];

function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU").replace(/\s/g, "\u00A0")}\u00A0₽`;
}

function ServiceCard({
  service,
  dynamicPricing = false,
  basePrice = 5000,
}: {
  service: Service;
  dynamicPricing?: boolean;
  basePrice?: number;
}) {
  const [activeSession, setActiveSession] = useState(0);
  const sessionCounts = [1, 3, 6];
  const discounts = [0, 0.1, 0.15];
  const hasDiscount = dynamicPricing && discounts[activeSession] > 0;
  const originalPrice = dynamicPricing
    ? formatPrice(basePrice * sessionCounts[activeSession])
    : null;
  const computedPrice = dynamicPricing
    ? formatPrice(
        Math.round(basePrice * sessionCounts[activeSession] * (1 - discounts[activeSession]))
      )
    : service.price;


  return (
    <article className="rounded-2xl border border-[#daebff] bg-white p-8 sm:p-10 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(28,60,140,0.18)]">
      {/* Sessions */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[16px] leading-[26px] text-[#8D9DC5]">
        {sessions.map((s, i) => (
          <div key={s.label} className="flex items-center gap-x-3">
            <button
              type="button"
              onClick={() => setActiveSession(i)}
              className={`transition-colors ${
                activeSession === i ? "text-[#1C3C8C]" : "hover:text-[#1C3C8C]"
              }`}
            >
              {s.label}
              {s.discount && (
                <sup className="ml-0.5 text-[11px] align-super"> {s.discount}</sup>
              )}
            </button>
            {i < sessions.length - 1 && (
              <span className="text-[#8D9DC5]">•</span>
            )}
          </div>
        ))}
      </div>

      {/* Title */}
      <h3
        className="mt-4 text-[42px] font-light leading-[1.1] text-[#1C3C8C]"
        style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
      >
        {service.title}
      </h3>
      <p className="mt-3 italic text-[16px] leading-[26px] text-[#8D9DC5]">
        {service.subtitle}
      </p>

      {/* Description */}
      <p className="mt-5 text-[16px] leading-[26px] text-[#8D9DC5]">
        {service.description}
      </p>

      {/* Duration + price */}
      <div
        className="mt-8 flex flex-wrap items-baseline gap-x-4 text-[26px] font-light text-[#1C3C8C]"
        style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
      >
        <span>{service.duration}</span>
        <span className="text-[#8D9DC5]">•</span>
        <span>{computedPrice}</span>
        {hasDiscount && (
          <span className="text-[18px] text-[#8D9DC5] line-through">{originalPrice}</span>
        )}
      </div>


      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button type="button" className="btn-primary flex-1 sm:min-w-[220px]">
          Записаться
        </button>
        <button type="button" className="btn-secondary flex-1 sm:min-w-[220px]">
          Узнать подробнее
        </button>
      </div>
    </article>
  );
}

export function Services() {
  const [activeCategory, setActiveCategory] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          setActiveCategory(idx >= 10 ? 1 : 0);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#EFF6FF] py-16 sm:py-20 xl:py-24">
      <div className="container-1900 px-5 grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16">
        {/* Left column */}
        <div className="xl:sticky xl:top-24 self-start">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium tracking-wide text-white"
            style={{
              borderRadius: "4px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            Услуги
          </span>
          <h2
            className="mt-6 text-[38px] xl:text-[44px] font-light leading-[1.15] text-[#1C3C8C] max-w-[520px]"
            style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
          >
            Перед каждым визитом обсуждаем ваше состояние&nbsp;— и&nbsp;подбираем технику под&nbsp;него
          </h2>

          <ul className="mt-8 flex flex-col gap-3">
            {categories.map((c, i) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(i)}
                  className="flex items-center gap-3 text-left"
                >
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      activeCategory === i ? "bg-[#1C3C8C]" : "bg-[#B7C5E3]"
                    }`}
                  />
                  <span
                    className={`text-[16px] transition-colors ${
                      activeCategory === i ? "text-[#1C3C8C]" : "text-[#8D9DC5]"
                    }`}
                  >
                    {c}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="relative flex flex-col gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-index={i}
            >
              <ServiceCard service={s} dynamicPricing={i === 0} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

