import { useState } from "react";
import { useBooking } from "@/components/BookingModal";

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

function pluralize(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return forms[1];
  return forms[2];
}

function formatDurationValue(min: number) {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  if (hours === 0) {
    return {
      text: `${min}\u00A0${pluralize(min, ["минута", "минуты", "минут"])}`,
      amount: min,
      unit: "min" as const,
    };
  }
  if (minutes === 0) {
    return {
      text: `${hours}\u00A0${pluralize(hours, ["час", "часа", "часов"])}`,
      amount: hours,
      unit: "hour" as const,
    };
  }
  return {
    text: `${hours}\u00A0${pluralize(hours, ["час", "часа", "часов"])} ${minutes}\u00A0${pluralize(minutes, ["минута", "минуты", "минут"])}`,
    amount: min,
    unit: "mixed" as const,
  };
}

function formatDurationString(value: string, multiplier = 1) {
  const numbers = [...value.matchAll(/\d+/g)].map((m) => Number(m[0]));
  if (!numbers.length) return value;
  const scaled = numbers.map((n) => n * multiplier);
  const isRange = scaled.length === 2 && /[\u2013\u2014-]/.test(value);
  if (isRange) {
    const a = formatDurationValue(scaled[0]);
    const b = formatDurationValue(scaled[1]);
    if (a.unit === b.unit && a.unit !== "mixed") {
      const unitWord =
        a.unit === "hour"
          ? pluralize(Math.max(scaled[0], scaled[1]) / 60, ["час", "часа", "часов"])
          : pluralize(Math.max(...scaled), ["минута", "минуты", "минут"]);
      return `${a.amount}\u00A0–\u00A0${b.amount}\u00A0${unitWord}`;
    }
    return `${a.text}\u00A0–\u00A0${b.text}`;
  }
  return scaled.map((n) => formatDurationValue(n).text).join(", ");
}

function formatSessionLine(sessionCount: number, duration: string) {
  if (sessionCount === 1) {
    return `1 сеанс — ${duration}`;
  }
  const sessionWord = pluralize(sessionCount, ["сеанс", "сеанса", "сеансов"]);
  return `В пакете: ${sessionCount}\u00A0${sessionWord} · ${duration}`;
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
  onPrev,
  onNext,
}: {
  service: Service;
  dynamicPricing?: boolean;
  basePrice?: number;
  sessionLabels?: string[];
  multiplyDuration?: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { openBooking } = useBooking();
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

  const computedDuration = formatDurationString(
    service.duration,
    dynamicPricing && multiplyDuration ? sessionCounts[activeSession] : 1
  );

  const sessionInfo = formatSessionLine(sessionCounts[activeSession], computedDuration);

  const items = sessions.map((s, i) => ({
    label: sessionLabels?.[i] ?? s.label,
    discount: s.discount,
  }));

  return (
    <article className="rounded-[12px] border border-[#daebff] bg-white p-8 sm:p-10 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(28,60,140,0.18)] flex flex-col h-[680px] xl:h-auto xl:min-h-[700px]">
      {/* Sessions — pill switcher */}
      <div className="mt-1 flex items-stretch gap-1 rounded-[12px] bg-[#EFF6FF] p-1.5">
        {items.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSession(i)}
            className={`relative flex flex-1 items-center justify-center rounded-[10px] px-2 py-3.5 transition-all duration-300 ${
              activeSession === i
                ? "bg-white shadow-[0_2px_8px_rgba(28,60,140,0.08)]"
                : "bg-transparent"
            }`}
          >
            <span
              className={`whitespace-nowrap text-[13px] tracking-tight transition-colors duration-300 ${
                activeSession === i ? "font-medium text-[#1C3C8C]" : "font-light text-[#8D9DC5]"
              }`}
            >
              {s.label}
            </span>
            {s.discount && (
              <span className="absolute -top-1 right-1 rounded-full bg-[#1C3C8C] px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white">
                {s.discount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-hidden mt-6">
        <div className="h-full overflow-y-auto xl:h-auto xl:overflow-visible pb-2">
          {/* Title */}
          <h3
            className="text-[30px] sm:text-[38px] xl:text-[42px] font-light leading-[1.1] text-[#1C3C8C] break-words hyphens-auto"
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

          {/* Session info */}
          {sessionCounts[activeSession] > 1 && (
            <p className="mt-5 text-[13px] font-light leading-[1.5] tracking-wide text-[#8D9DC5]">
              {sessionInfo}
            </p>
          )}

          {/* Duration + price */}
          {service.tiers ? (
            <div
              className="mt-8 flex flex-col gap-2 text-[26px] font-light text-[#1C3C8C]"
              style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
            >
              {service.tiers.map((t, i) => (
                <div key={i} className="flex flex-wrap items-baseline gap-x-4">
                  <span>{formatDurationString(t.duration)}</span>
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
        </div>
      </div>

      {/* Bottom actions */}
      <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => openBooking(service.title.replace(/\u00A0·\u00A0/g, " · "))}
          className="btn-primary w-full sm:flex-1"
        >
          Записаться
        </button>
        <a href="#programs" className="btn-secondary w-full sm:flex-1 inline-flex items-center justify-center text-center">
          Узнать больше
        </a>
        <div className="grid grid-cols-2 gap-3 sm:contents">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Предыдущая услуга"
            className="btn-secondary sm:min-w-[80px] sm:flex-none flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Следующая услуга"
            className="btn-secondary sm:min-w-[80px] sm:flex-none flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}


const HEALTH_START = 9;

const groups = [
  { label: categories[0], from: 0, to: HEALTH_START },
  { label: categories[1], from: HEALTH_START, to: services.length },
];

export function Services() {
  const [active, setActive] = useState(0);
  const service = services[active];

  const prev = () => setActive((i) => (i - 1 + services.length) % services.length);
  const next = () => setActive((i) => (i + 1) % services.length);

  return (
    <section id="services" className="scroll-mt-[140px] bg-[#EFF6FF] py-[60px] sm:py-[70px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-5 items-start">
        {/* Left column */}
        <div className="self-start flex flex-col items-center xl:items-start text-center xl:text-left">
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

          {/* Desktop: full service menu grouped by category */}
          <div className="mt-8 hidden xl:flex flex-col gap-7 items-start w-full max-w-[520px]">
            {groups.map((g) => (
              <div key={g.label} className="w-full">
                <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#B7C5E3]">
                  {g.label}
                </p>
                <ul className="mt-3 flex flex-col gap-2.5 items-start">
                  {services.slice(g.from, g.to).map((s, idx) => {
                    const i = g.from + idx;
                    const isActive = i === active;
                    return (
                      <li key={s.title}>
                        <button
                          type="button"
                          onClick={() => setActive(i)}
                          aria-current={isActive}
                          className="flex items-center gap-3 text-left"
                        >
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                              isActive ? "bg-[#1C3C8C]" : "bg-[#B7C5E3]"
                            }`}
                          />
                          <span
                            className={`text-[16px] leading-[24px] transition-colors ${
                              isActive ? "text-[#1C3C8C]" : "text-[#8D9DC5]"
                            }`}
                          >
                            {s.title.replace(/\u00A0·\u00A0/g, " · ")}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — active service */}
        <div className="flex flex-col gap-4">
          {/* Mobile / tablet: horizontal pill menu of all services */}
          <div className="xl:hidden -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
            <div className="flex w-max gap-2">
              {services.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`whitespace-nowrap rounded-[10px] border px-4 py-2.5 text-[13px] transition-colors duration-300 ${
                    i === active
                      ? "border-transparent bg-white font-medium text-[#1C3C8C] shadow-[0_2px_8px_rgba(28,60,140,0.08)]"
                      : "border-[#daebff] bg-transparent font-light text-[#8D9DC5]"
                  }`}
                >
                  {s.title.replace(/\u00A0·\u00A0/g, " · ")}
                </button>
              ))}
            </div>
          </div>

          <ServiceCard
            key={active}
            service={service}
            dynamicPricing
            basePrice={Number(service.price.replace(/\D/g, "")) || 5000}
            sessionLabels={
              active === 9
                ? ["6\u00A0пиявок", "16\u00A0пиявок", "74\u00A0пиявки"]
                : active === 10
                ? ["6\u00A0пиявок", "10\u00A0пиявок", "20\u00A0пиявок"]
                : undefined
            }
            multiplyDuration={active !== 9 && active !== 10}
            onPrev={prev}
            onNext={next}
          />
        </div>
      </div>
    </section>
  );
}



