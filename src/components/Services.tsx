import { useEffect, useRef, useState } from "react";

type PriceRow = { duration: string; price: string; note?: string };

type Service = {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  tiers?: PriceRow[];
};

const services: Service[] = [
  {
    title: "Векторный",
    subtitle: "Глубокая работа с\u00A0телом",
    description:
      "Комплексная работа с\u00A0телом для\u00A0глубокого расслабления и\u00A0восстановления баланса. Подходит, если хочется не\u00A0точечного сеанса, а\u00A0полноценной паузы: спокойного ритма, внимания к\u00A0деталям и\u00A0ощущения, что\u00A0тело наконец отпускает накопленное напряжение.",
    duration: "120\u00A0минут",
    price: "5\u00A0000\u00A0₽",
  },
  {
    title: "Лимфатический",
    subtitle: "Мягкая поддержка тела",
    description:
      "Деликатная работа с\u00A0лимфатической системой и\u00A0общим состоянием тела. Помогает мягко поддержать естественные процессы восстановления и\u00A0почувствовать лёгкость. Подходит тем, кому важна спокойная техника, аккуратное прикосновение и\u00A0плавный, без\u00A0резких движений, ритм.",
    duration: "120\u00A0минут",
    price: "5\u00A0000\u00A0₽",
  },
  {
    title: "Лимфодренажный",
    subtitle: "Лёгкость и\u00A0мягкое восстановление",
    description:
      "Бережная техника для\u00A0поддержки лимфотока, уменьшения отёчности и\u00A0ощущения тяжести в\u00A0теле. Подходит при\u00A0сидячем образе жизни, сниженной активности и\u00A0усталости\u00A0— после сеанса в\u00A0теле обычно появляется ощущение лёгкости и\u00A0спокойного восстановления.",
    duration: "120\u00A0минут",
    price: "5\u00A0000\u00A0₽",
  },
  {
    title: "Лимфодренажный\u00A0·\u00A0Лицо",
    subtitle: "Мягкая работа с\u00A0тонусом и\u00A0лимфотоком кожи лица",
    description:
      "Деликатная техника для\u00A0уменьшения отёчности, поддержки овала и\u00A0ощущения свежести. Подходит после долгой работы за\u00A0компьютером, перелётов или\u00A0в\u00A0качестве регулярного ухода.",
    duration: "40\u00A0минут",
    price: "2\u00A0000\u00A0₽",
  },
  {
    title: "Классический",
    subtitle: "Базовое расслабление и\u00A0восстановление",
    description:
      "Универсальный сеанс для\u00A0расслабления и\u00A0снятия мышечного напряжения. Хороший выбор для\u00A0первого визита: позволяет познакомиться с\u00A0кабинетом, мастером и\u00A0подходом, понять, что\u00A0вам ближе, и\u00A0затем спокойно выбрать другой формат, если он\u00A0будет нужен.",
    duration: "60\u00A0минут",
    price: "2\u00A0000\u00A0₽",
  },
  {
    title: "Классический\u00A0·\u00A0Спина и\u00A0шея",
    subtitle: "Для\u00A0тех, кто\u00A0много за\u00A0рулём и\u00A0за\u00A0компьютером",
    description:
      "Сфокусированный сеанс для\u00A0шеи, плеч и\u00A0верхней части спины. Помогает выдохнуть после рабочего дня и\u00A0снять напряжение от\u00A0длительной статичной позы.",
    duration: "30\u00A0минут",
    price: "1\u00A0500\u00A0₽",
  },
  {
    title: "Классический\u00A0·\u00A0Лицо",
    subtitle: "Мягкое расслабление мышц лица",
    description:
      "Спокойная работа с\u00A0мимическими зонами, лбом и\u00A0линией челюсти. Подходит при\u00A0усталом виде, напряжении в\u00A0зоне лица и\u00A0желании просто отдохнуть.",
    duration: "40\u00A0минут",
    price: "2\u00A0000\u00A0₽",
  },
  {
    title: "Классический\u00A0·\u00A0Ноги и\u00A0стопы",
    subtitle: "Лёгкость и\u00A0снятие усталости в\u00A0ногах",
    description:
      "Работа с\u00A0икрами, бёдрами и\u00A0стопами. Подходит после долгого дня на\u00A0ногах, тренировок или\u00A0длительной сидячей работы.",
    duration: "60\u00A0минут",
    price: "3\u00A0000\u00A0₽",
  },
  {
    title: "Классический\u00A0·\u00A0Голова",
    subtitle: "Спокойствие и\u00A0снятие напряжения в\u00A0голове",
    description:
      "Мягкая работа с\u00A0зоной головы и\u00A0шейно-затылочной областью. Подходит при\u00A0усталости, тяжёлой голове и\u00A0желании отключиться от\u00A0внешнего шума.",
    duration: "20\u00A0минут",
    price: "1\u00A0000\u00A0₽",
  },
  {
    title: "Гирудотерапия\u00A0·\u00A0Медицинские пиявки",
    subtitle: "Оздоровительная практика",
    description:
      "Постановка медицинских пиявок на\u00A0выбранные зоны тела. В\u00A0процессе пиявка мягко воздействует на\u00A0кожу, способствуя локальному кровообращению и\u00A0разгрузке напряжённых участков. Используется в\u00A0рамках оздоровительных программ для\u00A0общего восстановления и\u00A0поддержки самочувствия.",
    duration: "120\u00A0минут",
    price: "4\u00A0800\u00A0₽",
  },
  {
    title: "Гирудотерапия\u00A0·\u00A0Косметические пиявки",
    subtitle: "Мягкий уход и\u00A0забота о\u00A0коже",
    description:
      "Деликатная постановка пиявок с\u00A0акцентом на\u00A0зону лица или\u00A0локальные участки. Процедура направлена на\u00A0улучшение внешнего вида кожи, ощущение свежести и\u00A0лёгкости. Воздействие мягкое, с\u00A0акцентом на\u00A0эстетический эффект и\u00A0комфортные ощущения.",
    duration: "120\u00A0минут",
    price: "4\u00A0800\u00A0₽",
  },
  {
    title: "Стихия Огонь\u00A0·\u00A0Стеклянные банки",
    subtitle: "Классическая интенсивная техника",
    description:
      "Постановка стеклянных банок методом огня\u00A0— короткое прогревание воздуха создаёт глубокий вакуум. Банки фиксируются на\u00A0проблемных участках или\u00A0скользят по\u00A0коже, прорабатывая мышцы и\u00A0фасции на\u00A0большую глубину, чем «Воздух». Подходит тем, кто\u00A0уже знаком с\u00A0техникой и\u00A0хочет более насыщенной проработки.",
    duration: "10\u00A0минут",
    price: "2\u00A0000\u00A0₽",
  },
  {
    title: "Стихия Воздух\u00A0·\u00A0Мягкие банки",
    subtitle: "Мягкая вакуумная техника",
    description:
      "Работа силиконовыми или\u00A0пластиковыми банками с\u00A0насосом\u00A0— мастер регулирует силу вакуума под\u00A0ваши ощущения. Банки скользят по\u00A0коже с\u00A0маслом, мягко прорабатывая напряжённые зоны спины, плеч, поясницы. Подходит для\u00A0первого знакомства и\u00A0для\u00A0тех, кто\u00A0предпочитает деликатный формат.",
    duration: "10–25\u00A0минут",
    price: "1\u00A0000\u00A0₽",
  },
];


const categories = ["Массаж", "Оздоровительные процедуры"];

const sessions = [
  { label: "1 сеанс", discount: null },
  { label: "3 сеанса", discount: "-10%" },
  { label: "6 сеансов", discount: "-15%" },
];

function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU").replace(/\s/g, "\u00A0")}\u00A0₽`;
}

function renderPrice(price: string) {
  const idx = price.indexOf("₽");
  if (idx === -1) return price;
  return (
    <>
      {price.slice(0, idx)}
      <span className="font-[system-ui,sans-serif] font-extralight">₽</span>
    </>
  );
}

function ServiceCard({
  service,
  dynamicPricing = false,
  basePrice = 5000,
  sessionLabels,
  multiplyDuration = true,
}: {
  service: Service;
  dynamicPricing?: boolean;
  basePrice?: number;
  sessionLabels?: string[];
  multiplyDuration?: boolean;
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

  const computedDuration = dynamicPricing && multiplyDuration
    ? service.duration.replace(/\d+/g, (n) => String(Number(n) * sessionCounts[activeSession]))
    : service.duration;

  const items = sessions.map((s, i) => ({
    label: sessionLabels?.[i] ?? s.label,
    discount: s.discount,
  }));

  return (
    <article className="rounded-[12px] border border-[#daebff] bg-white p-8 sm:p-10 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(28,60,140,0.18)]">
      {/* Sessions */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[16px] leading-[26px] text-[#8D9DC5]">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-x-3">
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
            {i < items.length - 1 && (
              <span className="text-[#8D9DC5]">•</span>
            )}
          </div>
        ))}
      </div>

      {/* Title */}
      <h3
        className="mt-4 text-[30px] sm:text-[38px] xl:text-[42px] font-light leading-[1.1] text-[#1C3C8C] break-words hyphens-auto"
        style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
      >
        {service.title.replace(/\u00A0·\u00A0/g, " · ")}
      </h3>
      <p className="mt-3 italic text-[16px] leading-[26px] text-[#8D9DC5]">
        {service.subtitle}
      </p>

      {/* Description */}
      <p className="mt-5 text-[16px] leading-[26px] text-[#8D9DC5]">
        {service.description}
      </p>

      {/* Duration + price */}
      {service.tiers ? (
        <div
          className="mt-8 flex flex-col gap-2 text-[26px] font-light text-[#1C3C8C]"
          style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
        >
          {service.tiers.map((t, i) => (
            <div key={i} className="flex flex-wrap items-baseline gap-x-4">
              <span>{t.duration}</span>
              <span className="text-[#8D9DC5]">•</span>
              {t.note && <span>{t.note}</span>}
              {t.note && <span className="text-[#8D9DC5]">•</span>}
              <span>{renderPrice(t.price)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="mt-8 flex flex-wrap items-baseline gap-x-4 text-[26px] font-light text-[#1C3C8C]"
          style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
        >
          <span>{computedDuration}</span>
          <span className="text-[#8D9DC5]">•</span>
          <span>{renderPrice(computedPrice)}</span>
          {hasDiscount && (
            <span className="text-[18px] text-[#8D9DC5] line-through">{renderPrice(originalPrice!)}</span>
          )}
        </div>
      )}


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
  const [showAll, setShowAll] = useState(false);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          setActiveCategory(idx >= 9 ? 1 : 0);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="scroll-mt-[120px] bg-[#EFF6FF] py-[60px] sm:py-[70px]">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
        {/* Left column */}
        <div
          className="xl:sticky self-start flex flex-col items-center xl:items-start text-center xl:text-left transition-[top] duration-300 ease-out"
          style={{ top: "calc(var(--header-offset, 0px) + 20px)" }}
        >
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
            className="mt-6 text-[30px] sm:text-[38px] xl:text-[44px] font-light leading-[1.15] text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0"
            style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
          >
            Перед каждым визитом обсуждаем ваше состояние&nbsp;— и&nbsp;подбираем технику под&nbsp;него
          </h2>

          <ul className="mt-8 hidden xl:flex flex-col gap-3 items-center xl:items-start">
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
          {services.map((s, i) => {
            const hiddenOnTablet = i >= 4 && !showAll;
            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-index={i}
                className={hiddenOnTablet ? "hidden xl:block" : ""}
              >
                <ServiceCard
                  service={s}
                  dynamicPricing
                  basePrice={Number(s.price.replace(/\D/g, "")) || 5000}
                  sessionLabels={
                    i === 9
                      ? ["6\u00A0пиявок", "16\u00A0пиявок", "74\u00A0пиявки"]
                      : i === 10
                      ? ["6\u00A0пиявок", "10\u00A0пиявок", "20\u00A0пиявок"]
                      : undefined
                  }
                  multiplyDuration={i !== 9 && i !== 10}
                />
              </div>
            );
          })}

          {!showAll && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="btn-secondary flex xl:hidden mt-2"
            >
              Показать больше
            </button>
          )}
        </div>

      </div>
    </section>
  );
}


