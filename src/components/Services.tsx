import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useBooking } from "@/components/BookingModal";
import { applyTypography } from "@/lib/typography";

export type Variant = {
  zone: string;
  zoneShort?: string;
  subtitle: string;
  description: string;
  mobileDescription?: string;
  duration: string;
  price: string;
  sessionLabels?: string[];
  multiplyDuration?: boolean;
};

export type ServiceType = {
  title: string;
  category: number;
  hit?: boolean;
  variants: Variant[];
};

export const serviceTypes: ServiceType[] = [
  {
    title: "Гирудотерапия",
    category: 0,
    hit: true,
    variants: [
      {
        zone: "Медицинские",
        subtitle: "Оздоровительная практика",
        description:
          "Медицинские пиявки на\u00A0выбранные зоны тела снимают накопленное напряжение, улучшают микроциркуляцию и\u00A0дарят ощущение лёгкости. Мягкая поддержка естественного восстановления и\u00A0общего самочувствия без\u00A0лекарств и\u00A0агрессивных вмешательств.",
        mobileDescription:
          "Постановка пиявок на\u00A0выбранные зоны тела для\u00A0поддержки лёгкости и\u00A0общего самочувствия.",
        duration: "1,5\u00A0\u2013\u00A02\u00A0часа",
        price: "4 800 ₽",
        sessionLabels: ["6\u00A0пиявок", "16\u00A0пиявок", "74\u00A0пиявки"],
        multiplyDuration: false,
      },
      {
        zone: "Косметические",
        subtitle: "Мягкий уход и\u00A0забота о\u00A0коже",
        description:
          "Пиявки на\u00A0лицо и\u00A0локальные зоны улучшают микроциркуляцию и\u00A0лимфоотток, поддерживают свежий вид и\u00A0ровный тон кожи. Деликатный эстетический уход без\u00A0инъекций для\u00A0естественного ощущения лёгкости и\u00A0отдохнувшего лица.",
        mobileDescription:
          "Точная постановка пиявок на\u00A0лицо и\u00A0локальные зоны для\u00A0свежего и\u00A0отдохнувшего вида кожи.",
        duration: "1,5\u00A0\u2013\u00A02\u00A0часа",
        price: "4 800 ₽",
        sessionLabels: ["6\u00A0пиявок", "10\u00A0пиявок", "20\u00A0пиявок"],
        multiplyDuration: false,
      },
    ],
  },

  {
    title: "Акупунктурный кетгут",
    category: 0,
    hit: true,
    variants: [
      {
        zone: "Все тело",
        subtitle: "30 нитей",
        description:
          "Аккуратное введение 30 саморассасывающихся нитей в\u00A0акупунктурные точки всего тела. Работает 2–3 месяца: поддерживает тонус тканей, выравнивает внутренний баланс и\u00A0помогает организму саморегулироваться без\u00A0лекарств.",
        mobileDescription:
          "30 нитей в акупунктурные точки на всё тело для длительной поддержки внутреннего баланса организма без лекарств.",
        duration: "1,5 часа",
        price: "20 000 ₽",
      },
    ],
  },


  {
    title: "Векторный",
    category: 1,
    hit: true,
    variants: [
      {
        zone: "Всё тело",
        subtitle: "Точная ручная работа по\u00A0анатомическим линиям",
        description:
          "Точная ручная работа с\u00A0мышцами и\u00A0фасциями по\u00A0естественным линиям тела освобождает накопленное напряжение и\u00A0снимает глубокие зажимы. Движения становятся более свободными, устойчивыми и\u00A0лёгкими, уходит ощущение скованности в\u00A0теле.",
        mobileDescription:
          "Точная работа с мышцами, фасциями помогает снять зажимы и вернуть движениям свободу и лёгкость.",
        duration: "2 часа",
        price: "5 000 ₽",
      },
    ],
  },

  {
    title: "Вакуумный массаж",
    category: 0,
    variants: [
      {
        zone: "Стеклянные инструменты",
        zoneShort: "Стеклянные",
        subtitle: "Стихия огонь",
        description:
          "Глубокое вакуумное воздействие стеклянными инструментами прогревает выбранные зоны, снимает скованность и\u00A0расслабляет напряжённые мышцы. Возвращает ощущение тепла, свободы движения и\u00A0живой энергии, поддерживает восстановление.",
        mobileDescription:
          "Глубокое вакуумное воздействие мягко прогревает ткани, снимает скованность и\u00A0напряжение в\u00A0теле.",
        duration: "10 минут",
        price: "2 000 ₽",
      },
      {
        zone: "Мягкие инструменты",
        zoneShort: "Мягкие",
        subtitle: "Стихия воздух",
        description:
          "Деликатный массаж мягкими инструментами создаёт комфортное вакуумное воздействие, уменьшает чувство тяжести и\u00A0возвращает тканям больше подвижности. Поддерживает лёгкость во\u00A0всём теле, снимает напряжение и\u00A0помогает расслабиться.",
        mobileDescription:
          "Деликатный вакуум помогает уменьшить чувство тяжести и\u00A0вернуть телу больше лёгкости и\u00A0движения.",
        duration: "10–25 минут",
        price: "1 000 ₽",
      },
    ],
  },


  {
    title: "Лимфодренажный",
    category: 1,
    variants: [
      {
        zone: "Всё тело",
        subtitle: "Мягкая работа с естественными путями оттока жидкости",
        description:
          "Мягкий массаж всего тела с\u00A0вниманием к\u00A0естественным путями оттока жидкости уменьшает отёчность и\u00A0снимает ощущение тяжести. Постепенно возвращает телу внутреннюю лёгкость, комфорт и\u00A0спокойствие, помогает расслабиться и\u00A0легче двигаться.",
        mobileDescription:
          "Мягкая работа со\u00A0всем телом помогает уменьшить отёчность и\u00A0вернуть чувство лёгкости и\u00A0комфорта.",
        duration: "2 часа",
        price: "5 000 ₽",
      },
      {
        zone: "Лицо",
        subtitle: "Деликатная работа с\u00A0оттоком жидкости и\u00A0тонусом кожи",
        description:
          "Деликатная работа с\u00A0оттоком жидкости и\u00A0тонусом кожи лица уменьшает отёчность и\u00A0освежает вид. Поддерживает более чёткий овал, сохраняет естественную мягкость черт и\u00A0помогает выглядеть отдохнувшим без\u00A0активного воздействия.",
        mobileDescription:
          "Деликатная техника снимает отёчность и\u00A0ещё возвращает лицу свежесть, лёгкость, ровный тон кожи.",
        duration: "40 минут",
        price: "2 000 ₽",
      },
    ],
  },


  {
    title: "Классический",
    category: 1,
    variants: [
      {
        zone: "Всё тело",
        subtitle: "Последовательная работа со\u00A0спиной, шеей, руками и\u00A0ногами",
        description:
          "Комплексная проработка спины, шеи, рук и\u00A0ног в\u00A0спокойном ритме снимает мышечное напряжение и\u00A0помогает глубже расслабиться. Восстанавливает силы, возвращает ощущение собранного и\u00A0лёгкого тела после рабочего дня или\u00A0тренировки.",
        mobileDescription:
          "Комплексная проработка тела помогает снять напряжение, глубже расслабиться и\u00A0восстановить силы.",
        duration: "1 час",
        price: "3 000 ₽",
      },
      {
        zone: "Голова",
        subtitle: "Мягкая работа with\u00A0областью, где собирается стресс",
        description:
          "Массаж головы и\u00A0шейно-воротниковой зоны мягко снимает накопленное напряжение, облегчает ощущение тяжести в\u00A0голове и\u00A0плечах. Помогает переключиться, убрать ментальную усталость и\u00A0вернуть более спокойное, ясное состояние.",
        mobileDescription:
          "Массаж головы и\u00A0шеи, мягко снимает напряжение, облегчает тяжесть и\u00A0помогает спокойно отдохнуть.",
        duration: "20 минут",
        price: "1 000 ₽",
      },
      {
        zone: "Лицо",
        subtitle: "Бережная ручная работа with\u00A0мышцами и\u00A0мягкими тканями",
        description:
          "Бережная ручная работа с\u00A0кожей и\u00A0мимическими мышцами лица расслабляет привычные зажимы и\u00A0освежает вид. Поддерживает ровный тон кожи, возвращает выражению лица больше мягкости, спокойствия и\u00A0отдохнувшего вида после долгого дня.",
        mobileDescription:
          "Мягкая работа с\u00A0лицом расслабляет мимические мышцы, освежает вид и\u00A0поддерживает тон самой кожи.",
        duration: "40 минут",
        price: "2 000 ₽",
      },
      {
        zone: "Спина и\u00A0шея",
        subtitle: "Целенаправленная работа with\u00A0наиболее нагруженными зонами",
        description:
          "Работа со\u00A0спиной и\u00A0шеей мягко разгружает зоны, которые чаще всего накапливают напряжение в\u00A0течение дня. Снимает зажимы, уменьшает тяжесть и\u00A0возвращает привычную подвижность движениям в\u00A0шее, плечах и\u00A0верхней части спины.",
        mobileDescription:
          "Работа с\u00A0нагруженными зонами помогает снять зажимы и\u00A0мягко вернуть спине подвижность и\u00A0комфорт.",
        duration: "30 минут",
        price: "1 500 ₽",
      },
      {
        zone: "Ноги и\u00A0стопы",
        subtitle: "Точная работа with\u00A0зонами ежедневной нагрузки",
        description:
          "Внимательная проработка ног и\u00A0стоп после активного дня снимает усталость и\u00A0чувство тяжести. Возвращает лёгкость движениям, помогает глубже расслабиться после долгой нагрузки и\u00A0улучшает общее самочувствие к\u00A0вечеру.",
        mobileDescription:
          "Проработка ног и\u00A0стоп помогает снять усталость, тяжесть и\u00A0вернуть ощущение лёгкости в\u00A0движении.",
        duration: "1 час",
        price: "3 000 ₽",
      },
    ],
  },






];


const categories = ["Оздоровительные процедуры", "Массаж"];

export const sessions = [
  { label: "1 сеанс", discount: null },
  { label: "3 сеанса", discount: "-10%" },
  { label: "6 сеансов", discount: "-15%" },
];

export function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU").replace(/\s/g, "\u00A0")}\u00A0₽`;
}

export function pluralize(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return forms[1];
  return forms[2];
}

export function formatDurationValue(value: string) {
  // Check if it's already a formatted string like "2 часа" or "1,5–2 часа"
  if (value.includes("час") || value.includes("мин")) {
    return {
      text: value.replace(/\s/g, "\u00A0"),
      amount: 0, // not used for text result
      unit: "custom" as const,
    };
  }
  
  const numbers = [...value.matchAll(/\d+/g)].map((m) => Number(m[0]));
  if (!numbers.length) return { text: value, amount: 0, unit: "custom" as const };
  
  const n = numbers[0];
  // If it's a small number like 1 or 2, assume it's hours if not specified, 
  // but here we trust the hardcoded duration strings in serviceTypes.
  return { text: value, amount: n, unit: "custom" as const };
}

export function formatDurationString(value: string, multiplier = 1) {
  if (multiplier === 1) return value.replace(/\s/g, "\u00A0");
  
  // For packages, we need to handle "2 часа" -> "12 часов" etc.
  // But the request is mainly about the main card display which uses multiplier 1 usually,
  // or simple multiplication for sessions.
  const numbers = [...value.matchAll(/\d+([.,]\d+)?/g)].map((m) => parseFloat(m[0].replace(",", ".")));
  if (!numbers.length) return value;
  
  const isHours = value.includes("час");
  const isMinutes = value.includes("мин");
  
  if (numbers.length === 2 && /[\u2013\u2014-]/.test(value)) {
    const a = numbers[0] * multiplier;
    const b = numbers[1] * multiplier;
    const unit = isHours ? pluralize(b, ["час", "часа", "часов"]) : pluralize(b, ["минута", "минуты", "минут"]);
    return `${a.toString().replace(".", ",")}\u00A0–\u00A0${b.toString().replace(".", ",")}\u00A0${unit}`;
  }
  
  const result = numbers[0] * multiplier;
  const unit = isHours ? pluralize(result, ["час", "часа", "часов"]) : pluralize(result, ["минута", "минуты", "минут"]);
  return `${result.toString().replace(".", ",")}\u00A0${unit}`;
}


export function formatSessionLine(sessionCount: number, duration: string) {
  if (sessionCount === 1) {
    return duration ? `1 сеанс · ${duration}` : "1 сеанс";
  }
  const sessionWord = pluralize(sessionCount, ["сеанс", "сеанса", "сеансов"]);
  return duration ? `В пакете: ${sessionCount}\u00A0${sessionWord} · ${duration}` : `В пакете: ${sessionCount}\u00A0${sessionWord}`;
}

export function renderPrice(price: string) {
  const idx = price.indexOf("₽");
  if (idx === -1) return price;
  return (
    <>
      {price.slice(0, idx)}
      <span className="font-[system-ui,sans-serif] font-extralight">₽</span>
    </>
  );
}

export function clean(value: string) {
  return value.replace(/\u00A0/g, " ");
}

export function mobileTitle(title: string) {
  const t = clean(title);
  if (t === "Лимфодренажный" || t === "Классический" || t === "Векторный") {
    return t + " массаж";
  }
  return t;
}


export const servicePageLinks: Record<string, string> = {
  "Гирудотерапия": "/girudoterapiya",
  "Вакуумный массаж": "/vakuumnyi-massazh",
  "Векторный": "/vektornyi-massazh",
  "Лимфодренажный": "/limfaticheskii-massazh",
  
  "Классический": "/klassicheskii-massazh",
  "Акупунктурный кетгут": "/ketgut",
};


export function ServiceCard({
  type,
  zoneIndex,
  activeIndex,
  totalCount,
  onZoneChange,
  onPrev,
  onNext,
}: {
  type: ServiceType;
  zoneIndex: number;
  activeIndex: number;
  totalCount: number;
  onZoneChange: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div id="services" className="scroll-mt-[120px]">
      <ServiceCardContent
        type={type}
        zoneIndex={zoneIndex}
        activeIndex={activeIndex}
        totalCount={totalCount}
        onZoneChange={onZoneChange}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  );
}

function ServiceCardContent({
  type,
  zoneIndex,
  activeIndex,
  totalCount,
  onZoneChange,
  onPrev,
  onNext,
}: {
  type: ServiceType;
  zoneIndex: number;
  activeIndex: number;
  totalCount: number;
  onZoneChange: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { openBooking } = useBooking();
  const [activeSession, setActiveSession] = useState(0);
  const variant = type.variants[zoneIndex] ?? type.variants[0];
  const hasZones = type.variants.length > 1;

  const items = sessions.map((s, i) => ({
    label: variant.sessionLabels?.[i] ?? s.label,
    discount: s.discount,
  }));

  const sessionCounts = [1, 3, 6];
  const discounts = [0, 0.1, 0.15];
  const isCosmeticLeeches =
    clean(type.title) === "Гирудотерапия" && variant.zone === "Косметические";
  const leechCountMatch = items[activeSession].label.match(/\d+/);
  const leechCount = leechCountMatch ? Number(leechCountMatch[0]) : 6;

  let basePrice: number;
  let originalPrice: string;
  let computedPrice: string;
  if (isCosmeticLeeches) {
    basePrice = leechCount * 600;
    const discount = discounts[activeSession];
    originalPrice = formatPrice(basePrice);
    computedPrice = formatPrice(Math.round(basePrice * (1 - discount)));
  } else {
    basePrice = Number(variant.price.replace(/\D/g, "")) || 5000;
    originalPrice = formatPrice(basePrice * sessionCounts[activeSession]);
    computedPrice = formatPrice(
      Math.round(basePrice * sessionCounts[activeSession] * (1 - discounts[activeSession]))
    );
  }

  const hasDiscount = discounts[activeSession] > 0;

  const computedDuration = formatDurationString(
    variant.duration,
    variant.multiplyDuration === false ? 1 : sessionCounts[activeSession]
  );



  const bookingTitle = hasZones
    ? `${clean(type.title)} · ${clean(variant.zone)}`
    : clean(type.title);

  const sessionWord = pluralize(sessionCounts[activeSession], ["сеанс", "сеанса", "сеансов"]);
  const selectedSummary = `${sessionCounts[activeSession]} ${sessionWord} · ${variant.zone} · ${computedDuration}`;
  const priceLabel = applyTypography(`за ${sessionCounts[activeSession]} ${sessionWord}`);

  return (
    <article className="ds-card ds-bento-shadow p-5 sm:p-8 flex flex-col h-auto min-h-[640px] md:min-h-[700px]">
      {/* Sessions — pill switcher */}
      <div className="flex items-stretch gap-1 rounded-[12px] bg-[#EFF6FF] p-1">
        {items.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSession(i)}
            className={`relative flex flex-1 items-center justify-center rounded-[12px] px-2 py-2.5 transition-all duration-300 ${
              activeSession === i
                ? "bg-white shadow-tab-active"
                : "bg-transparent hover:bg-white/40"
            }`}

          >
            <span
              className={`whitespace-nowrap text-[13px] tracking-tight transition-colors duration-300 ${
                activeSession === i ? "font-medium text-[#1C3C8C]" : "font-light text-[#566A93]"
              }`}
            >
              {s.label}
            </span>
            {s.discount && (
              <span className="absolute -top-1 right-1 rounded-[12px] bg-[#1C3C8C] px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white">
                {s.discount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col mb-4 md:flex-1 md:mb-6">
        <div className="flex-1">
          {/* Title */}
          <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            {type.hit && (
              <span className="inline-flex items-center rounded-[12px] bg-gradient-to-b from-[#A2CFFE] to-[#88C1FF] px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-white mb-1 sm:mb-0 sm:order-2 shrink-0 h-fit">
                Хит
              </span>
            )}
            <h3 className="font-noto-serif-narrow ds-h3 text-[#1C3C8C] break-words hyphens-auto sm:order-1 max-[380px]:text-[24px] max-sm:text-[27px] max-sm:whitespace-nowrap">
              <span className="xl:hidden">{mobileTitle(type.title)}</span>
              <span className="hidden xl:block">{mobileTitle(type.title)}</span>
            </h3>
          </div>

          {/* Zone / Type chips */}
          {variant.zone && (
            <div className="mt-6">
              <span className="block text-[13px] font-light leading-[20px] text-[#566A93]">
                {clean(type.title) === "Гирудотерапия"
                  ? "Тип пиявок:"
                  : clean(type.title) === "Банки"
                  ? "Тип:"
                  : "Зона:"}
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {type.variants.map((v, i) => {
                  const isActive = i === zoneIndex;
                  const tabLabel = v.zoneShort || v.zone;
                  return (
                    <button
                      key={v.zone}
                      type="button"
                      onClick={() => onZoneChange(i)}
                      aria-pressed={isActive}
                      className={`rounded-[12px] px-3 py-1.5 text-[14px] leading-[20px] transition-all duration-300 ${
                        isActive
                          ? "border border-[#A2CFFE] bg-[#EFF6FF] font-medium text-[#1C3C8C]"
                          : "border border-[#DAEBFF] bg-transparent font-medium text-[#1C3C8C] hover:border-[#A2CFFE] hover:bg-[#EFF6FF]"
                      }`}
                    >
                      {tabLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="mt-6 body-text text-[#566A93] sm:hidden line-clamp-3">
            {variant.mobileDescription || variant.description}
          </p>
          <p className="mt-6 hidden whitespace-pre-line body-text text-[#566A93] sm:block sm:max-w-[560px] xl:max-w-[540px]">
            {variant.description}
          </p>

          {/* Selected configuration summary */}
          <p className="mt-6 text-[13px] font-medium leading-[18px] tracking-wide text-[#1C3C8C]">
            {selectedSummary}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-4">
        {/* Desktop / tablet Price */}
        <div className="hidden sm:flex items-center justify-end gap-4 md:gap-5 pb-2">
          {hasDiscount && (
            <span className="ds-price-old">
              {renderPrice(originalPrice)}
            </span>
          )}
          <div className="flex flex-col items-end">
            <span className="font-noto-serif-narrow ds-price text-[#1C3C8C]">
              {renderPrice(computedPrice)}
            </span>
            <span className="text-[13px] font-light text-[#566A93] leading-none mt-1">{priceLabel}</span>
          </div>
        </div>

        {/* Desktop / tablet Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => openBooking(bookingTitle)}
            className="btn-primary flex-1"
          >
            Записаться
          </button>
          {servicePageLinks[clean(type.title)] ? (
            <Link
              to={servicePageLinks[clean(type.title)]}
              className="btn-secondary flex-1 inline-flex items-center justify-center text-center whitespace-nowrap"
            >
              Узнать больше
            </Link>
          ) : (
            <a
              href="#programs"
              className="btn-secondary flex-1 inline-flex items-center justify-center text-center whitespace-nowrap"
            >
              Узнать больше
            </a>
          )}
          {totalCount > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Предыдущая услуга"
                className="btn-secondary w-[80px] h-[60px] flex items-center justify-center p-0 shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Следующая услуга"
                className="btn-secondary w-[80px] h-[60px] flex items-center justify-center p-0 shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* Mobile: Price + Actions */}
        <div className="flex flex-col gap-3 sm:hidden px-0">
          {/* Mobile Price */}
          <div className="flex items-center justify-end gap-4 py-2">
            {hasDiscount && (
              <span className="ds-price-old">
                {renderPrice(originalPrice)}
              </span>
            )}
            <div className="flex flex-col items-end">
              <span className="font-noto-serif-narrow ds-price text-[#1C3C8C]">
                {renderPrice(computedPrice)}
              </span>
              <span className="text-[13px] font-light text-[#566A93]">{priceLabel}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openBooking(bookingTitle)}
            className="btn-primary w-full h-[60px]"
          >
            Записаться
          </button>
          
          <div className="flex items-center gap-2">
            {servicePageLinks[clean(type.title)] ? (
              <Link
                to={servicePageLinks[clean(type.title)]}
                className="btn-secondary flex-1 h-[60px] px-3 py-0 inline-flex items-center justify-center text-center"
              >
                Узнать больше
              </Link>
            ) : (
              <a href="#programs" className="btn-secondary flex-1 h-[60px] px-3 py-0 inline-flex items-center justify-center text-center">
                Узнать больше
              </a>
            )}
            {totalCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Предыдущая услуга"
                  className="btn-secondary w-[60px] h-[60px] flex items-center justify-center p-0 shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Следующая услуга"
                  className="btn-secondary w-[60px] h-[60px] flex items-center justify-center p-0 shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

    </article>
  );
}

const groups = categories.map((label, ci) => ({
  label,
  items: serviceTypes
    .map((t, i) => ({ ...t, index: i }))
    .filter((t) => t.category === ci),
}));

// Порядок карточек на десктопе (по категориям), на мобильных — порядок массива
const desktopOrder = groups.flatMap((g) => g.items.map((t) => t.index));

export function Services() {
  const [active, setActive] = useState(0);
  const [zone, setZone] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const type = serviceTypes[active];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 940px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const selectType = (i: number) => {
    setActive(i);
    setZone(0);
  };

  const order = isDesktop ? desktopOrder : serviceTypes.map((_, i) => i);
  const pos = Math.max(0, order.indexOf(active));

  const prev = () => selectType(order[(pos - 1 + order.length) % order.length]);
  const next = () => selectType(order[(pos + 1) % order.length]);


  const renderNav = (isMobile: boolean) => (
    <nav className="flex w-full flex-col gap-6">
      {groups.map((g) => {
        const showLabel = !(isMobile && g.label === "Оздоровительные процедуры");
        return (
          <div key={g.label}>
            {showLabel && (
              <p className="text-[13px] font-light leading-[18px] text-[#566A93]">{g.label}</p>
            )}
            <ul className={`flex flex-col gap-3 items-start ${showLabel ? "mt-3" : ""}`}>
              {g.items.map((t) => {
                const isActive = t.index === active;
                return (
                  <li key={t.title}>
                    <button
                      type="button"
                      onClick={() => selectType(t.index)}
                      aria-current={isActive}
                      className="flex items-center gap-3 text-left group/nav"

                    >
                      <span
                        className={`h-2 w-2 rounded-[12px] transition-colors ${
                          isActive ? "bg-[#1C3C8C]" : "bg-[#B7C5E3] group-hover/nav:bg-[#1C3C8C]/50"

                        }`}
                      />
                      <span
                        className={`text-[16px] transition-colors ${
                          isActive ? "text-[#1C3C8C]" : "text-[#566A93] group-hover/nav:text-[#1C3C8C]"

                        }`}
                      >
                        {clean(t.title)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );

  return (
    <section id="uslugi" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-5 items-start">
        {/* Left column */}
        <div className="self-start flex flex-col items-center xl:items-start text-center xl:text-left">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
            style={{
              borderRadius: "12px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            Услуги
          </span>
          <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0">
            Обсуждаю состояние перед каждым визитом и подбираю технику
          </h2>

          {/* Desktop: compact category navigation */}
          <div className="mt-8 hidden xl:block w-full max-w-[520px] text-left">{renderNav(false)}</div>
        </div>

        {/* Right column — active service */}
        <div className="flex flex-col gap-4">


          <ServiceCard
            key={active}
            type={type}
            zoneIndex={zone}
            activeIndex={active}
            totalCount={serviceTypes.length}
            onZoneChange={setZone}
            onPrev={prev}
            onNext={next}
          />
        </div>
      </div>
    </section>
  );
}
