import { useState } from "react";
import { useBooking } from "@/components/BookingModal";

type Variant = {
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

type ServiceType = {
  title: string;
  category: number;
  variants: Variant[];
};

const serviceTypes: ServiceType[] = [
  {
    title: "Векторный",
    category: 1,
    variants: [
      {
        zone: "Всё тело",
        subtitle: "Точная ручная работа по анатомическим линиям",
        description:
          "Векторный массаж — точная ручная работа по анатомическим линиям, которая помогает телу заново найти свои естественные опоры.\n\nМягкое направленное воздействие на мышцы и фасции снимает глубокие зажимы, улучшает подвижность и делает движения более свободными.\n\nПодходит, если важно аккуратно проработать хроническое напряжение, поддержать осанку и уменьшить ощущение усталости в теле.",
        mobileDescription:
          "Векторный массаж — ручная техника, которая следует естественным линиям тела.\n\nПомогает снять глубокие мышечные зажимы, улучшить подвижность и сделать движения более свободными.\n\nПодходит при хроническом напряжении и усталости, когда телу нужен мягкий перезапуск.",
        duration: "120\u00A0минут",
        price: "5\u00A0000\u00A0₽",
      },
    ],
  },

  {
    title: "Лимфатический",
    category: 1,
    variants: [
      {
        zone: "Всё тело",
        subtitle: "Мягкая работа с естественными путями оттока жидкости",
        description:
          "Лимфатический массаж — мягкая работа с\u00A0естественными путями оттока жидкости в\u00A0теле.\n\nДеликатные надавливания и\u00A0протяжные движения помогают снизить отёчность, улучшить обмен веществ и\u00A0вернуть тканям ощущение лёгкости.\n\nПодходит, если важно уменьшить тяжесть и\u00A0«залитость» в\u00A0отдельных зонах и\u00A0поддержать общее самочувствие.",
        mobileDescription:
          "Лимфатический массаж мягко активизирует естественный отток жидкости.\n\nПомогает уменьшить отёчность, облегчить состояние и\u00A0вернуть тканям больше лёгкости.\n\nПодходит при\u00A0чувстве тяжести и\u00A0напряжения в\u00A0отдельных участках тела.",
        duration: "120\u00A0минут",
        price: "5\u00A0000\u00A0₽",
      },
    ],
  },
  {
    title: "Лимфодренажный",
    category: 1,
    variants: [
      {
        zone: "Всё тело",
        subtitle: "Последовательная работа с\u00A0лимфатической системой от\u00A0стоп до\u00A0плеч",
        description:
          "Лимфодренажный массаж всего тела — последовательная работа с\u00A0лимфатической системой от\u00A0стоп до\u00A0плеч.\n\nМягкие волнообразные движения помогают организму быстрее выводить лишнюю жидкость, снижать отёчность и\u00A0постепенно разгружать ткани.\n\nПодходит, если важно облегчить тяжесть в\u00A0теле, поддержать контуры и\u00A0дать организму ресурс для\u00A0восстановления.",
        mobileDescription:
          "Лимфодренажный массаж всего тела мягко активизирует лимфатическую систему.\n\nПомогает вывести лишнюю жидкость, уменьшить отёчность и\u00A0облегчить ощущение тяжести.\n\nПодходит, когда нужно поддержать лёгкость и\u00A0мягко поработать с\u00A0контурами тела.",
        duration: "120\u00A0минут",
        price: "5\u00A0000\u00A0₽",
      },
      {
        zone: "Лицо",
        subtitle: "Деликатная работа с\u00A0оттоком жидкости и\u00A0тонусом кожи",
        description:
          "Лимфодренажный массаж лица — деликатная работа с\u00A0оттоком жидкости и\u00A0тонусом кожи.\n\nАккуратные надавливания и\u00A0выверенные линии помогают уменьшить отёчность, смягчить заломы и\u00A0вернуть лицу более свежий и\u00A0ровный тон.\n\nПодходит, если важно поддержать овал лица, снизить «усталый» вид и\u00A0дать коже мягкий стимул к\u00A0обновлению.",
        mobileDescription:
          "Лимфодренажный массаж лица мягко работает с\u00A0оттоком жидкости и\u00A0тонусом кожи.\n\nПомогает уменьшить отёчность, смягчить заломы и\u00A0освежить оттенок лица.\n\nПодходит при\u00A0признаках усталости, когда хочется более «живого» и\u00A0отдохнувшего вида.",
        duration: "40\u00A0минут",
        price: "2\u00A0000\u00A0₽",
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
          "Классический массаж всего тела — последовательная работа со\u00A0спиной, шеей, руками и\u00A0ногами.\n\nРитмичные движения помогают снять мышечное напряжение, улучшить кровообращение и\u00A0постепенно привести тело в\u00A0более спокойное, собранное состояние.\n\nПодходит, если важно комплексно разгрузить тело, снизить уровень внутреннего стресса и\u00A0почувствовать себя более собранно и\u00A0устойчиво.",
        mobileDescription:
          "Классический массаж всего тела мягко прорабатывает спину, шею, руки и\u00A0ноги.\n\nПомогает снять мышечное напряжение, улучшить кровообращение и\u00A0глубже расслабиться.\n\nПодходит, когда нужен общий перезапуск тела и\u00A0отдых от\u00A0накопившегося стресса.",
        duration: "60\u00A0минут",
        price: "2\u00A0000\u00A0₽",
      },
      {
        zone: "Спина и\u00A0шея",
        subtitle: "Целенаправленная работа с\u00A0наиболее нагруженными зонами",
        description:
          "Классический массаж спины и\u00A0шеи — целенаправленная работа с\u00A0зонами, которые чаще всего берут на\u00A0себя основную нагрузку.\n\nПроработка мышц вдоль позвоночника и\u00A0воротниковой области помогает снять зажимы, уменьшить чувство тяжести и\u00A0облегчить состояние после статичных поз и\u00A0перегрузок.\n\nПодходит, если много работаешь сидя, чувствуешь «каменную» спину и\u00A0хочешь мягко вернуть ей\u00A0подвижность.",
        mobileDescription:
          "Классический массаж спины и\u00A0шеи фокусируется на\u00A0самых нагруженных зонах.\n\nПомогает снять зажимы, уменьшить тяжесть и\u00A0облегчить состояние после долгого сидения или\u00A0стресса.\n\nПодходит при\u00A0усталости спины и\u00A0«забитой» шее.",
        duration: "30\u00A0минут",
        price: "1\u00A0500\u00A0₽",
      },
      {
        zone: "Лицо",
        subtitle: "Бережная ручная работа с\u00A0мышцами и\u00A0мягкими тканями",
        description:
          "Классический массаж лица — бережная ручная работа с\u00A0мышцами и\u00A0мягкими тканями.\n\nМягкие растирания и\u00A0выверенные линии помогают улучшить микроциркуляцию, снять часть мимического напряжения и\u00A0поддержать более ровный тон и\u00A0живой вид кожи.\n\nПодходит, если важно расслабить лицо, снизить «зажатый» мимический фон и\u00A0придать образу больше свежести.",
        mobileDescription:
          "Классический массаж лица мягко работает с\u00A0мышцами и\u00A0кожей.\n\nПомогает улучшить микроциркуляцию, снять часть мимического напряжения и\u00A0освежить облик.\n\nПодходит при\u00A0усталости лица и\u00A0желании более живого, ровного тона.",
        duration: "40\u00A0минут",
        price: "2\u00A0000\u00A0₽",
      },
      {
        zone: "Ноги и\u00A0стопы",
        subtitle: "Точная работа с\u00A0зонами ежедневной нагрузки",
        description:
          "Классический массаж ног и\u00A0стоп — точная работа с\u00A0зонами, которые ежедневно удерживают основную нагрузку тела.\n\nПроработка мышц, связок и\u00A0мягких тканей помогает снизить чувство тяжести, улучшить кровообращение и\u00A0дать ногам ощущение опоры и\u00A0облегчения.\n\nПодходит, если много времени проводишь на\u00A0ногах, чувствуешь отёчность или\u00A0усталость к\u00A0концу дня.",
        mobileDescription:
          "Классический массаж ног и\u00A0стоп снимает накопившуюся нагрузку с\u00A0нижних конечностей.\n\nПомогает уменьшить тяжесть, улучшить кровообращение и\u00A0вернуть ногам чувство опоры и\u00A0лёгкости.\n\nПодходит при\u00A0усталости и\u00A0отёчности после активного дня.",
        duration: "60\u00A0минут",
        price: "3\u00A0000\u00A0₽",
      },
      {
        zone: "Голова",
        subtitle: "Мягкая работа с\u00A0областью, где собирается стресс",
        description:
          "Массаж головы и\u00A0шейно-воротниковой зоны — мягкая работа с\u00A0областью, которая часто собирает стресс и\u00A0переутомление.\n\nАккуратные надавливания и\u00A0растяжения помогают снять напряжение мышц, облегчить ощущение тяжести в\u00A0голове и\u00A0улучшить общее состояние.\n\nПодходит, если важно снизить уровень внутреннего напряжения, поддержать концентрацию и\u00A0дать нервной системе возможность выдохнуть.",
        mobileDescription:
          "Массаж головы и\u00A0шейно-воротниковой зоны мягко снимает накопленный стресс.\n\nПомогает расслабить мышцы, облегчить чувство тяжести и\u00A0улучшить общее самочувствие.\n\nПодходит при\u00A0усталости, повышенном напряжении и\u00A0перегрузке от\u00A0умственной работы.",
        duration: "20\u00A0минут",
        price: "1\u00A0000\u00A0₽",
      },
    ],
  },
  {
    title: "Гирудотерапия",
    category: 0,
    variants: [
      {
        zone: "Медицинские",
        subtitle: "Оздоровительная практика",
        description:
          "Бережная постановка медицинских пиявок на\u00A0выбранные зоны тела.\n\nПомогает мягко разогнать застой, улучшить локальное кровообращение и\u00A0разгрузить напряжённые участки.\n\nПодходит, если важно поддержать общее самочувствие, снизить тяжесть в\u00A0теле и\u00A0дать организму ресурс на\u00A0восстановление.",
        mobileDescription:
          "Бережная постановка медицинских пиявок на\u00A0выбранные зоны тела.\n\nМягко разгоняет застой, улучшает кровообращение и\u00A0разгружает напряжённые участки.\n\nПомогает поддержать общее самочувствие и\u00A0снизить чувство тяжести в\u00A0теле.",
        duration: "120\u00A0минут",
        price: "4\u00A0800\u00A0₽",
        sessionLabels: ["6\u00A0пиявок", "16\u00A0пиявок", "74\u00A0пиявки"],
        multiplyDuration: false,
      },
      {
        zone: "Косметические",
        subtitle: "Мягкий уход и\u00A0забота о\u00A0коже",
        description:
          "Аккуратная постановка пиявок на\u00A0зону лица или\u00A0локальные участки.\n\nНаправлена на\u00A0улучшение цвета и\u00A0рельефа кожи, ощущение свежести и\u00A0лёгкости.\n\nПодходит, если важен мягкий эстетический эффект, более живой вид кожи и\u00A0комфортные ощущения без\u00A0агрессивных процедур.",
        mobileDescription:
          "Аккуратная постановка пиявок на\u00A0лицо и\u00A0локальные участки.\n\nМягко улучшает кровообращение, цвет и\u00A0рельеф кожи, дарит ощущение свежести и\u00A0лёгкости.\n\nПомогает придать коже более живой вид и\u00A0получить мягкий эстетический эффект без\u00A0агрессивных процедур.",
        duration: "120\u00A0минут",
        price: "4\u00A0800\u00A0₽",
        sessionLabels: ["6\u00A0пиявок", "10\u00A0пиявок", "20\u00A0пиявок"],
        multiplyDuration: false,
      },
    ],
  },
  {
    title: "Банки",
    category: 0,
    variants: [
      {
        zone: "Стеклянные банки",
        zoneShort: "Стеклянные",
        subtitle: "Стихия огонь",
        description:
          "Глубокое вакуумное воздействие стеклянными банками на\u00A0выбранные зоны тела.\n\nМягкое прогревание тканей разгоняет застой, снимает мышечное напряжение и\u00A0делает движения более свободными.\n\nПодходит, если важно уменьшить скованность, облегчить состояние после нагрузок и\u00A0вернуть телу ощущение тепла и\u00A0внутреннего движения.",
        mobileDescription:
          "Бережная постановка стеклянных вакуумных банок на\u00A0выбранные зоны тела.\n\nМягко прогревает ткани, разгоняет застой и\u00A0помогает расслабить напряжённые участки.\n\nПодходит, если нужно снять скованность и\u00A0вернуть телу ощущение тепла и\u00A0живой энергии.",
        duration: "10\u00A0минут",
        price: "2\u00A0000\u00A0₽",
      },
      {
        zone: "Мягкие банки",
        zoneShort: "Мягкие",
        subtitle: "Стихия воздух",
        description:
          "Массаж мягкими банками — деликатная работа с\u00A0поверхностными слоями тела.\n\nМягкий вакуум улучшает микроциркуляцию, помогает уменьшить отёчность и\u00A0вернуть тканям ощущение лёгкости и\u00A0подвижности.\n\nПодходит, если важно снизить тяжесть, поддержать комфорт в\u00A0теле и\u00A0мягко включить восстановительные процессы.",
        mobileDescription:
          "Массаж мягкими банками с\u00A0деликатным вакуумом на\u00A0нужных участках тела.\n\nУлучшает микроциркуляцию, помогает снизить отёчность и\u00A0возвращает тканям больше подвижности.\n\nПодходит, если хочется уменьшить чувство тяжести и\u00A0мягко поддержать естественное восстановление.",
        duration: "10–25\u00A0минут",
        price: "1\u00A0000\u00A0₽",
      },
    ],
  },


];

const categories = ["Оздоровительные процедуры", "Массаж"];

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

function clean(value: string) {
  return value.replace(/\u00A0/g, " ");
}

function ServiceCard({
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
  const priceLabel = `за ${sessionCounts[activeSession]} ${sessionWord}`;

  return (
    <article className="rounded-[12px] border border-[#daebff] bg-white p-6 sm:p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(28,60,140,0.18)] flex flex-col h-auto xl:min-h-[700px]">
      {/* Sessions — pill switcher */}
      <div className="flex items-stretch gap-1 rounded-[10px] bg-[#EFF6FF] p-1">
        {items.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSession(i)}
            className={`relative flex flex-1 items-center justify-center rounded-[8px] px-2 py-2.5 transition-all duration-300 ${
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

      <div className="xl:flex-1">
        {/* Title */}
        <h3
          className="mt-5 text-[28px] sm:text-[34px] xl:text-[38px] font-light leading-[1.1] text-[#1C3C8C] break-words hyphens-auto"
          style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
        >
          {clean(type.title)}
        </h3>

        {/* Zone / Type chips */}
        {variant.zone && (
          <div className="mt-6">
            <span className="block text-[13px] font-light leading-[20px] text-[#8D9DC5]">
              {clean(type.title) === "Гирудотерапия"
                ? "Тип пиявок:"
                : clean(type.title) === "Банки"
                ? "Тип банок:"
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
                    className={`rounded-[0.5rem] px-3 py-1.5 text-[14px] leading-[20px] transition-all duration-300 ${
                      isActive
                        ? "border border-[#A2CFFE] bg-[#DAEBFF] font-medium text-[#1C3C8C]"
                        : "border border-[rgba(141,157,197,0.5)] bg-transparent font-medium text-[#1C3C8C] hover:border-[#A2CFFE] hover:bg-[#EFF6FF]"
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
        <p className="mt-6 whitespace-pre-line text-[15px] leading-[24px] text-[#8D9DC5] xl:hidden">
          {variant.mobileDescription || variant.description}
        </p>
        <p className="mt-6 hidden whitespace-pre-line text-[15px] leading-[24px] text-[#8D9DC5] xl:block">
          {variant.description}
        </p>

        {/* Selected configuration summary */}
        <p className="mt-6 text-[13px] font-medium leading-[18px] tracking-wide text-[#1C3C8C]">
          {selectedSummary}
        </p>
      </div>


      {/* Price */}
      <div className="mt-5 flex items-center justify-end gap-4 sm:gap-5">
        {hasDiscount && (
          <span
            className="text-[17px] sm:text-[19px] font-light leading-[1.2] text-[#8D9DC5] line-through"
            style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
          >
            {renderPrice(originalPrice)}
          </span>
        )}
        <div className="flex flex-col items-end">
          <span
            className="text-[30px] sm:text-[34px] font-light leading-[1.1] text-[#1C3C8C]"
            style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
          >
            {renderPrice(computedPrice)}
          </span>
          <span className="text-[13px] font-light text-[#8D9DC5]">{priceLabel}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => openBooking(bookingTitle)}
          className="btn-primary flex-1"
        >
          Записаться
        </button>
        <a href="#programs" className="btn-secondary flex-1 inline-flex items-center justify-center text-center">
          Узнать больше
        </a>

        {/* Mobile: compact square arrows with counter */}
        <div className="flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Предыдущая услуга"
            className="btn-secondary h-12 w-12 min-h-0 flex items-center justify-center p-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-[14px] font-medium leading-[1] text-[#1C3C8C]">
            {activeIndex + 1} / {totalCount}
          </span>
          <button
            type="button"
            onClick={onNext}
            aria-label="Следующая услуга"
            className="btn-secondary h-12 w-12 min-h-0 flex items-center justify-center p-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Desktop / tablet: arrows */}
        <div className="hidden lg:contents">
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

const groups = categories.map((label, ci) => ({
  label,
  items: serviceTypes
    .map((t, i) => ({ ...t, index: i }))
    .filter((t) => t.category === ci),
}));

export function Services() {
  const [active, setActive] = useState(0);
  const [zone, setZone] = useState(0);
  const type = serviceTypes[active];


  const selectType = (i: number) => {
    setActive(i);
    setZone(0);
  };


  const prev = () => selectType((active - 1 + serviceTypes.length) % serviceTypes.length);
  const next = () => selectType((active + 1) % serviceTypes.length);

  const renderNav = (isMobile: boolean) => (
    <nav className="flex w-full flex-col gap-6">
      {groups.map((g) => {
        const showLabel = !(isMobile && g.label === "Оздоровительные процедуры");
        return (
          <div key={g.label}>
            {showLabel && (
              <p className="text-[13px] font-light leading-[18px] text-[#B7C5E3]">{g.label}</p>
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
                      className="flex items-center gap-3 text-left"
                    >
                      <span
                        className={`h-2 w-2 rounded-full transition-colors ${
                          isActive ? "bg-[#1C3C8C]" : "bg-[#B7C5E3]"
                        }`}
                      />
                      <span
                        className={`text-[16px] transition-colors ${
                          isActive ? "text-[#1C3C8C]" : "text-[#8D9DC5]"
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
