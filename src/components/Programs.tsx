import { useState } from "react";
import { useBooking } from "@/components/BookingModal";

type ServiceInfo = {
  title: string;
  priceMin: number;
  durationMin: number;
  unit: "сеанс" | "постановка" | "банка";
};

const serviceCatalog: Record<string, ServiceInfo> = {
  lymphatic: { title: "Лимфодренажный", priceMin: 5000, durationMin: 120, unit: "сеанс" },
  lymphaticFace: { title: "Лимфодренажный  •  Лицо", priceMin: 2000, durationMin: 40, unit: "сеанс" },
  classic: { title: "Классический", priceMin: 2000, durationMin: 60, unit: "сеанс" },
  classicFace: { title: "Классический  •  Лицо", priceMin: 2000, durationMin: 40, unit: "сеанс" },
  hirudoMed: { title: "Гирудотерапия  •  Медицинские пиявки", priceMin: 4800, durationMin: 120, unit: "постановка" },
  hirudoCosm: { title: "Гирудотерапия  •  Косметические пиявки", priceMin: 4800, durationMin: 120, unit: "постановка" },
  fireGlass: { title: "Стеклянные банки", priceMin: 2000, durationMin: 10, unit: "банка" },
  airSoft: { title: "Мягкие банки", priceMin: 1000, durationMin: 10, unit: "банка" },
};

type ProgramItem = { key: keyof typeof serviceCatalog; sessions: number };

type Program = {
  name: string;
  description: string;
  items: ProgramItem[];
  validity: string;
};

const DISCOUNT = 0.2;

const programs: Program[] = [
  {
    name: "Лёгкость",
    description: "При отёках и тяжести в теле — мягкое восстановление лимфотока.",
    items: [
      { key: "lymphatic", sessions: 7 },
      { key: "airSoft", sessions: 6 },
    ],
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Свежесть",
    description: "Тонус кожи, поддержка овала и ощущение отдохнувшего лица.",
    items: [
      { key: "lymphaticFace", sessions: 3 },
      { key: "classicFace", sessions: 3 },
      { key: "hirudoCosm", sessions: 6 },
    ],
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Тишина",
    description: "Антистресс и восстановление ресурса — спокойный маршрут из мягких техник.",
    items: [
      { key: "lymphatic", sessions: 3 },
      { key: "classic", sessions: 3 },
      { key: "hirudoCosm", sessions: 6 },
    ],
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Баланс",
    description: "Глубокая проработка мышц для тех, кто много сидит или за рулём.",
    items: [
      { key: "classic", sessions: 6 },
      { key: "fireGlass", sessions: 6 },
      { key: "hirudoMed", sessions: 6 },
    ],
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Свобода",
    description: "Снятие тяжести и усталости — для тех, кто много на ногах.",
    items: [
      { key: "hirudoMed", sessions: 6 },
      { key: "fireGlass", sessions: 8 },
    ],
    validity: "2 месяца с первого сеанса",
  },
];

const formatPrice = (v: number) =>
  `${v.toLocaleString("ru-RU").replace(/\s/g, "\u00A0")}\u00A0`;

function pluralize(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
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

function formatSessionLine(sessionCount: number, duration: string) {
  if (sessionCount === 1) {
    return duration ? `1 сеанс · ${duration}` : "1 сеанс";
  }
  const sessionWord = pluralize(sessionCount, ["сеанс", "сеанса", "сеансов"]);
  return duration ? `${sessionCount}\u00A0${sessionWord} · ${duration}` : `${sessionCount}\u00A0${sessionWord}`;
}

function computeItem(it: ProgramItem) {
  const info = serviceCatalog[it.key];
  const isHirudo = it.key === "hirudoMed" || it.key === "hirudoCosm";
  const totalMin = isHirudo ? 0 : info.durationMin * it.sessions;
  const subtotal = info.priceMin * it.sessions;
  const durationText = totalMin > 0 ? formatDurationValue(totalMin).text : "";
  return {
    title: info.title,
    duration: formatSessionLine(it.sessions, durationText),
    subtotal,
  };
}

function Ruble() {
  return <span className="font-[system-ui,sans-serif] font-extralight">₽</span>;
}



type ProgramsProps = {
  prioritizeKeys?: string[];
};

export function Programs({ prioritizeKeys }: ProgramsProps = {}) {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);

  const orderedPrograms = prioritizeKeys
    ? [...programs].sort((a, b) => {
        const aHas = a.items.some((i) => prioritizeKeys.includes(i.key));
        const bHas = b.items.some((i) => prioritizeKeys.includes(i.key));
        return Number(bHas) - Number(aHas);
      })
    : programs;

  const program = orderedPrograms[active];
  const computedItems = program.items.map(computeItem);
  const originalPrice = computedItems.reduce((s, i) => s + i.subtotal, 0);
  const price = Math.round(originalPrice * (1 - DISCOUNT));

  const prev = () => setActive((i) => (i - 1 + orderedPrograms.length) % orderedPrograms.length);
  const next = () => setActive((i) => (i + 1) % orderedPrograms.length);

  return (
    <section id="programs" className="scroll-mt-[120px] bg-[#EFF6FF] ds-section">
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
            Программы восстановления
          </span>
          <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0" data-no-typo>
            Программы из нескольких процедур — для глубокой работы с состоянием
          </h2>

          <ul className="mt-8 hidden xl:flex flex-col gap-3 items-start">
            {orderedPrograms.map((p, i) => {
              const isActive = i === active;
              return (
                <li key={p.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
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
                      {p.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right column — program card */}
        <article className="ds-card ds-bento-shadow p-5 sm:p-8 flex flex-col h-[560px] sm:h-[671px] xl:h-auto xl:min-h-[700px] border border-[#DAEBFF]">
          <h3 className="font-noto-serif-narrow ds-h3 text-[#1C3C8C]">
            {program.name}
          </h3>
          <p className="mt-2 sm:mt-3 body-text text-[#566A93]">
            {program.description}
          </p>

          {/* Program content: fills fixed card and scrolls if needed */}
          <div className="flex-1 min-h-0 xl:min-h-fit xl:overflow-visible overflow-hidden">
            {/* Desktop / tablet: two-column table */}
            <div className="hidden sm:block h-full overflow-y-auto xl:h-auto xl:overflow-visible">
              <div className="mt-8 grid grid-cols-[1.3fr_1fr] gap-6 pb-4 border-b border-[#daebff]">
                <div className="text-[15px] font-semibold text-[#1C3C8C]">Что входит</div>
                <div className="text-[15px] font-semibold text-[#1C3C8C]">Длительность</div>
              </div>
              <div className="divide-y divide-[#daebff]">
                {computedItems.map((it, idx) => (
                  <div key={idx} className="grid grid-cols-[1.3fr_1fr] gap-6 py-5">
                    <div className="body-text text-[#566A93]">{it.title}</div>
                    <div className="body-text text-[#566A93]">{it.duration}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: stacked blocks */}
            <div className="sm:hidden pt-2 divide-y divide-[#daebff] h-full overflow-y-auto">
              {computedItems.map((it, idx) => (
                <div key={idx} className="py-3">
                  <div className="text-[16px] leading-[22px] text-[#1C3C8C]">{it.title}</div>
                  <div className="mt-1 text-[13px] leading-[18px] text-[#566A93]">{it.duration}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
              <span className="ds-price-old">
                {formatPrice(originalPrice)}
                <Ruble />
              </span>
              <span className="font-noto-serif-narrow ds-price text-[#1C3C8C]">
                {formatPrice(price)}
                <Ruble />
              </span>
            </div>

          <p className="hidden sm:block mt-6 text-[13px] leading-[18px] sm:text-[15px] sm:leading-normal text-[#566A93]">
            Срок использования: {program.validity}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => openBooking(program.name)}
              className="btn-primary w-full sm:flex-1"
            >
              Записаться
            </button>
            <div className="grid grid-cols-2 gap-3 sm:contents">
              <button
                type="button"
                onClick={prev}
                aria-label="Предыдущая программа"
                className="btn-secondary sm:min-w-[80px] sm:flex-none flex items-center justify-center active:opacity-60 transition-opacity"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Следующая программа"
                className="btn-secondary sm:min-w-[80px] sm:flex-none flex items-center justify-center active:opacity-60 transition-opacity"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          </div>
        </article>
      </div>
    </section>
  );
}
