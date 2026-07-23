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
      { title: "Лимфодренажный  •  Лимфодренажный", duration: "6 сеанс  •  40 минут" },
      { title: "Воздух. Мягкие банки", duration: "6 сеанс  •  40 минут" },
    ],
    originalPrice: 25000,
    price: 12000,
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Свежесть",
    description: "Программа для лёгкости и тонуса — снимает усталость и напряжение.",
    items: [
      { title: "Классический массаж", duration: "3 сеанс  •  60 минут" },
      { title: "Медовое обёртывание", duration: "2 сеанс  •  45 минут" },
      { title: "Ароматерапия", duration: "3 сеанс  •  30 минут" },
    ],
    originalPrice: 28000,
    price: 14000,
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Тишина",
    description: "Для тех, кто хочет замедлиться — работа с нервной системой.",
    items: [
      { title: "Расслабляющий массаж", duration: "4 сеанс  •  60 минут" },
      { title: "Массаж головы", duration: "3 сеанс  •  30 минут" },
      { title: "Стоун-терапия", duration: "2 сеанс  •  50 минут" },
    ],
    originalPrice: 30000,
    price: 15000,
    validity: "2 месяца с первого сеанса",
  },
  {
    name: "Баланс",
    description: "Комплексная работа с телом — возвращение внутреннего баланса.",
    items: [
      { title: "Глубокий массаж", duration: "4 сеанс  •  75 минут" },
      { title: "Мягкие банки", duration: "3 сеанс  •  40 минут" },
      { title: "Дыхательная практика", duration: "2 сеанс  •  45 минут" },
    ],
    originalPrice: 32000,
    price: 16000,
    validity: "3 месяца с первого сеанса",
  },
  {
    name: "Свобода",
    description: "Полный курс восстановления — тело, дыхание и внимание.",
    items: [
      { title: "Комплексный массаж", duration: "6 сеанс  •  90 минут" },
      { title: "Гирудотерапия", duration: "2 сеанс  •  40 минут" },
      { title: "Медитация и работа с дыханием", duration: "3 сеанс  •  30 минут" },
    ],
    originalPrice: 38000,
    price: 19000,
    validity: "3 месяца с первого сеанса",
  },
];

const formatPrice = (v: number) =>
  `${v.toLocaleString("ru-RU").replace(/\s/g, "\u00A0")}\u00A0₽`;

export function Programs() {
  const [active, setActive] = useState(0);
  const program = programs[active];

  const prev = () => setActive((i) => (i - 1 + programs.length) % programs.length);
  const next = () => setActive((i) => (i + 1) % programs.length);

  return (
    <section className="bg-[#EFF6FF] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column */}
          <div>
            <span
              className="inline-block rounded-full px-5 py-2 text-white text-sm"
              style={{ background: "#98BFF6" }}
            >
              Программы восстановления
            </span>
            <h2
              className="mt-8 text-[#1C3C8C] leading-[1.05]"
              style={{
                fontFamily: '"Roslindale Cyrillic Display Condensed", serif',
                fontSize: "clamp(36px, 4vw, 56px)",
              }}
            >
              Программы из нескольких процедур&nbsp;— для глубокой работы с&nbsp;конкретным состоянием.
            </h2>

            <ul className="mt-10 space-y-4">
              {programs.map((p, i) => {
                const isActive = i === active;
                return (
                  <li key={p.name}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="flex items-center gap-3 text-left transition-colors"
                    >
                      <span
                        className="inline-block rounded-full transition-all"
                        style={{
                          width: 8,
                          height: 8,
                          background: isActive ? "#1C3C8C" : "#8D9DC5",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 18,
                          color: isActive ? "#1C3C8C" : "#8D9DC5",
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {p.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right column card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_-20px_rgba(28,60,140,0.15)]">
            <h3
              className="text-[#1C3C8C]"
              style={{
                fontFamily: '"Roslindale Cyrillic Display Condensed", serif',
                fontSize: "clamp(32px, 3vw, 44px)",
                lineHeight: 1.1,
              }}
            >
              {program.name}
            </h3>
            <p
              className="mt-4"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                lineHeight: "26px",
                color: "#8D9DC5",
              }}
            >
              {program.description}
            </p>

            <div className="mt-10 grid grid-cols-[1.3fr_1fr] gap-6 pb-4 border-b border-[#EFF6FF]">
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  color: "#1C3C8C",
                  fontWeight: 600,
                }}
              >
                Что входит
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  color: "#1C3C8C",
                  fontWeight: 600,
                }}
              >
                Длительность
              </div>
            </div>

            <div className="divide-y divide-[#EFF6FF]">
              {program.items.map((it, idx) => (
                <div key={idx} className="grid grid-cols-[1.3fr_1fr] gap-6 py-5">
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      lineHeight: "26px",
                      color: "#1C3C8C",
                    }}
                  >
                    {it.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      lineHeight: "26px",
                      color: "#8D9DC5",
                    }}
                  >
                    {it.duration}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-end justify-end gap-4">
              <span
                style={{
                  fontFamily: '"Roslindale Cyrillic Display Condensed", serif',
                  fontSize: 22,
                  color: "#8D9DC5",
                  textDecoration: "line-through",
                }}
              >
                {formatPrice(program.originalPrice)}
              </span>
              <span
                style={{
                  fontFamily: '"Roslindale Cyrillic Display Condensed", serif',
                  fontSize: 40,
                  color: "#1C3C8C",
                  lineHeight: 1,
                }}
              >
                {formatPrice(program.price)}
              </span>
            </div>

            <p
              className="mt-8"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                color: "#8D9DC5",
              }}
            >
              Срок использования: {program.validity}
            </p>

            <button
              type="button"
              className="mt-6 w-full rounded-2xl py-5 text-white transition-all hover:brightness-105"
              style={{
                background: "#98BFF6",
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Записаться
            </button>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Предыдущая программа"
                className="rounded-2xl border border-[#E4ECF9] py-5 flex items-center justify-center transition-colors hover:bg-[#F5F9FF]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="#8D9DC5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Следующая программа"
                className="rounded-2xl border border-[#E4ECF9] py-5 flex items-center justify-center transition-colors hover:bg-[#F5F9FF]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="#8D9DC5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
