import { useState } from "react";

type Program = {
  name: string;
  description: string;
  items: { title: string; duration: string }[];
  originalPrice: number;
  price: number;
  validity: string;
};

const programs: Program[] = [
  {
    name: "Лёгкость",
    description: "При отёках и тяжести в теле — мягкое восстановление лимфотока.",
    items: [
      { title: "Лимфатический массаж", duration: "1 сеанс  •  40 минут" },
      { title: "Лимфодренажный", duration: "6 сеанс  •  40 минут" },
      { title: "Воздух. Мягкие банки", duration: "6 сеанс  •  40 минут" },
    ],
    originalPrice: 25000,
    price: 12000,
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Свежесть",
    description: "Тонус кожи, поддержка овала и ощущение отдохнувшего лица.",
    items: [
      { title: "Лимфодренажный  •  Лицо", duration: "3 сеанса  •  40 минут" },
      { title: "Классический  •  Лицо", duration: "3 сеанса  •  40 минут" },
      { title: "Гирудотерапия  •  Косметические пиявки", duration: "6 постановок  •  10 минут" },
    ],
    originalPrice: 25000,
    price: 12000,
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Тишина",
    description: "Антистресс и восстановление ресурса — спокойный маршрут из мягких техник.",
    items: [
      { title: "Лимфодренажный", duration: "3 сеанса  •  40 минут" },
      { title: "Лимфодренажный", duration: "3 сеанса  •  40 минут" },
      { title: "Косметические пиявки", duration: "6 постановок  •  10 минут" },
    ],
    originalPrice: 25000,
    price: 12000,
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Баланс",
    description: "Глубокая проработка мышц для тех, кто много сидит или за рулём.",
    items: [
      { title: "Классический массаж", duration: "6 сеансов  •  40 минут" },
      { title: "Стихия Огонь. Стеклянные банки", duration: "6 банок  •  10 минут" },
      { title: "Гирудотерапия. Медицинские пиявки", duration: "6 постановок  •  10 минут" },
    ],
    originalPrice: 25000,
    price: 12000,
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Свобода",
    description: "Снятие тяжести и усталости — для тех, кто много на ногах.",
    items: [
      { title: "Гирудотерапия. Медицинские пиявки", duration: "6 сеансов  •  40 минут" },
      { title: "Гирудотерапия. Медицинские пиявки", duration: "8 банок  •  10 минут" },
    ],
    originalPrice: 25000,
    price: 12000,
    validity: "2 месяца с первого сеанса",
  },
];

const heading = "'Roslindale Cyrillic Display Condensed', serif";

const formatPrice = (v: number) =>
  `${v.toLocaleString("ru-RU").replace(/\s/g, "\u00A0")}\u00A0`;

function Ruble() {
  return <span className="font-[system-ui,sans-serif] font-extralight">₽</span>;
}

export function Programs() {
  const [active, setActive] = useState(0);
  const program = programs[active];

  const prev = () => setActive((i) => (i - 1 + programs.length) % programs.length);
  const next = () => setActive((i) => (i + 1) % programs.length);

  return (
    <section className="bg-[#EFF6FF] py-[60px] sm:py-[70px]">
      <div className="container-1900 px-5 grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16 items-start">
        {/* Left column */}
        <div className="xl:sticky self-start flex flex-col items-center xl:items-start text-center xl:text-left" style={{ top: "calc(var(--header-offset, 0px) + 20px)" }}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium tracking-wide text-white"
            style={{
              borderRadius: "4px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            Программы восстановления
          </span>
          <h2
            className="mt-6 text-[30px] sm:text-[38px] xl:text-[44px] font-light leading-[1.15] text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0"
            style={{ fontFamily: heading }}
          >
            Программы из&nbsp;нескольких процедур&nbsp;— для глубокой работы с&nbsp;конкретным состоянием
          </h2>

          <ul className="mt-8 hidden xl:flex flex-col gap-3 items-start">
            {programs.map((p, i) => {
              const isActive = i === active;
              return (
                <li key={p.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
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
                      {p.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right column — program card */}
        <article className="rounded-2xl border border-[#daebff] bg-white p-6 sm:p-10 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(28,60,140,0.18)] flex flex-col sm:h-[820px] xl:h-[860px]">
          <h3
            className="text-[30px] sm:text-[38px] xl:text-[42px] font-light leading-[1.1] text-[#1C3C8C]"
            style={{ fontFamily: heading }}
          >
            {program.name}
          </h3>
          <p className="mt-3 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#8D9DC5]">
            {program.description}
          </p>

          {/* Desktop / tablet: two-column table */}
          <div className="hidden sm:block">
            <div className="mt-8 grid grid-cols-[1.3fr_1fr] gap-6 pb-4 border-b border-[#daebff]">
              <div className="text-[15px] font-semibold text-[#1C3C8C]">Что входит</div>
              <div className="text-[15px] font-semibold text-[#1C3C8C]">Длительность</div>
            </div>
            <div className="divide-y divide-[#daebff]">
              {program.items.map((it, idx) => (
                <div key={idx} className="grid grid-cols-[1.3fr_1fr] gap-6 py-5">
                  <div className="text-[16px] leading-[26px] text-[#8D9DC5]">{it.title}</div>
                  <div className="text-[16px] leading-[26px] text-[#8D9DC5]">{it.duration}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: stacked blocks */}
          <div className="sm:hidden mt-6 border-t border-[#daebff] divide-y divide-[#daebff]">
            {program.items.map((it, idx) => (
              <div key={idx} className="py-4">
                <div className="text-[16px] leading-[22px] text-[#1C3C8C]">{it.title}</div>
                <div className="mt-1 text-[13px] leading-[18px] text-[#8D9DC5]">{it.duration}</div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 flex flex-wrap items-baseline justify-start sm:justify-end gap-x-4 text-[26px] font-light text-[#1C3C8C]"
            style={{ fontFamily: heading }}
          >
            <span className="text-[18px] text-[#8D9DC5] line-through">
              {formatPrice(program.originalPrice)}
              <Ruble />
            </span>
            <span>
              {formatPrice(program.price)}
              <Ruble />
            </span>
          </div>

          <p className="mt-6 text-[13px] leading-[18px] sm:text-[15px] sm:leading-normal text-[#8D9DC5]">
            Срок использования: {program.validity}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button type="button" className="btn-primary w-full sm:flex-1">
              Записаться
            </button>
            <div className="grid grid-cols-2 gap-3 sm:contents">
              <button
                type="button"
                onClick={prev}
                aria-label="Предыдущая программа"
                className="btn-secondary sm:min-w-[80px] sm:flex-none flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Следующая программа"
                className="btn-secondary sm:min-w-[80px] sm:flex-none flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
