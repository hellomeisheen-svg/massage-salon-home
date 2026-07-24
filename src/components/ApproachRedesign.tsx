const heading = "'Roslindale Cyrillic Display Condensed', serif";

const environmentItems = [
  {
    title: "Свежее бельё на каждый сеанс",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
  },
  {
    title: "Одноразовые расходные материалы",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    title: "Сертифицированные масла и кремы",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Стерильная обработка инструментов",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Тихая и расслабляющая атмосфера",
    fullWidth: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  },
];

const practiceTags = [
  "Банки",
  "Векторный",
  "Лимфатический",
  "Лимфодренажный",
  "Классический",
  "Спортивный",
  "Миофасциальный",
  "Релакс",
];

// Two different orderings so the visible sequence doesn't obviously repeat
const practiceSequence = [
  "Классический",
  "Банки",
  "Миофасциальный",
  "Лимфодренажный",
  "Релакс",
  "Векторный",
  "Спортивный",
  "Лимфатический",
  "Миофасциальный",
  "Релакс",
  "Классический",
  "Спортивный",
  "Банки",
  "Лимфатический",
  "Векторный",
  "Лимфодренажный",
];

export function ApproachRedesign() {
  return (
    <section className="bg-white py-[70px]">
      <div className="container-1900 px-5">
        <div className="flex flex-col gap-16 xl:gap-24">
          {/* Environment */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: heading + quote */}
            <div className="flex flex-col gap-8 lg:col-span-5">
              <p className="max-w-lg text-xl leading-[1.5] text-[#6B7BA8] lg:text-2xl">
                «Каждый сеанс&nbsp;— это спокойный диалог с&nbsp;вашим телом...»
              </p>
              <h2
                className="text-[56px] font-light leading-[0.9] text-[#1C3C8C] lg:text-[96px]"
                style={{ fontFamily: heading }}
              >
                Среда вокруг
              </h2>
            </div>

            {/* Right: cards grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-7">
              {environmentItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-6 rounded-[40px] bg-[#EEF3FF] p-8 xl:p-10 ${
                    item.fullWidth ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1C3C8C]/20 text-[#1C3C8C]">
                    {item.icon}
                  </div>
                  <p className="text-[18px] leading-snug text-[#1C3C8C] xl:text-[20px]">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Practices marquee */}
          <div className="flex flex-col gap-8 overflow-hidden xl:gap-10">
            <div className="flex items-center gap-6">
              <h3
                className="whitespace-nowrap text-[32px] font-light text-[#1C3C8C] xl:text-[40px]"
                style={{ fontFamily: heading }}
              >
                Палитра практик
              </h3>
              <div className="h-px flex-grow bg-[#1C3C8C]/10" />
            </div>

            <div className="relative">
              {/* Edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent xl:w-32" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent xl:w-32" />

              <div className="marquee-track">
                {[0, 1].map((set) => (
                  <div key={set} className="flex gap-4 px-2">
                    {practiceSequence.map((tag, i) => (
                      <span
                        key={`${set}-${i}`}
                        className="inline-flex min-h-[60px] items-center justify-center whitespace-nowrap rounded-lg border border-[#EEF3FF] bg-white px-6 py-4 text-base leading-[1.5] text-[#1C3C8C] shadow-[0_4px_14px_rgba(28,60,140,0.08)]"
                        style={{ fontFamily: heading }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
