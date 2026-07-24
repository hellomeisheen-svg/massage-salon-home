const heading = "'Roslindale Cyrillic Display Condensed', serif";

const practices = [
  "Векторный",
  "Лимфатический",
  "Лимфодренажный",
  "Классический",
  "Гирудотерапия",
  "Банки",
];

const environmentItems = [
  {
    icon: "🧻",
    title: "Свежее бельё на\u00A0каждый сеанс",
    text: "На\u00A0каждый сеанс я\u00A0застилаю свежее, выглаженное бельё, чтобы вам было приятно и\u00A0спокойно с\u00A0первых минут.",
  },
  {
    icon: "🧤",
    title: "Одноразовые расходные материалы",
    text: "Все расходные материалы\u00A0— простыни, салфетки, перчатки\u00A0— одноразовые и\u00A0вскрываются при\u00A0вас для\u00A0чувства безопасности.",
  },
  {
    icon: "🫙",
    title: "Сертифицированные масла и\u00A0кремы",
    text: "Для\u00A0работы я\u00A0выбираю только сертифицированные масла и\u00A0кремы, мягкие к\u00A0коже и\u00A0подходящие даже при\u00A0повышенной чувствительности.",
  },
  {
    icon: "🧪",
    title: "Стерильная обработка инструментов",
    text: "Все инструменты проходят стерильную обработку по\u00A0стандартам гигиены, чтобы вы\u00A0могли полностью довериться процессу.",
  },
  {
    icon: "🌿",
    title: "Тихая и\u00A0расслабляющая атмосфера",
    text: "В\u00A0кабинете всегда тихо, без\u00A0лишних звуков и\u00A0отвлекающих факторов, чтобы вы\u00A0могли полностью переключиться и\u00A0отдохнуть.",
  },
];

export function Approach() {
  return (
    <section className="bg-[#EFF6FF] py-[70px]">
      <div className="container-1900 px-5 grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6 xl:grid xl:grid-rows-2 xl:gap-6 xl:h-full">
          {/* Подход мастера */}
          <div className="rounded-2xl border border-[#daebff] bg-white p-8 sm:p-10 xl:p-12 min-h-[380px] xl:min-h-0 xl:h-full flex flex-col justify-between">
            <h3
              className="text-[38px] xl:text-[44px] font-light leading-[1.1] text-[#1C3C8C]"
              style={{ fontFamily: heading }}
            >
              Подход мастера
            </h3>
            <p className="mt-8 text-[16px] leading-[26px] text-[#8D9DC5] max-w-[440px]">
              Каждый сеанс&nbsp;— это спокойный диалог с&nbsp;вашим телом. Я&nbsp;слушаю, что&nbsp;нужно сегодня, и&nbsp;подбираю технику под&nbsp;ваше состояние, а&nbsp;не&nbsp;наоборот.
            </p>
          </div>

          {/* Палитра практик */}
          <div className="relative rounded-2xl border border-[#daebff] bg-white p-8 sm:p-10 xl:p-12 min-h-[420px] xl:min-h-0 xl:h-full overflow-hidden">
            <h3
              className="relative z-10 text-[38px] xl:text-[44px] font-light leading-[1.1] text-[#1C3C8C]"
              style={{ fontFamily: heading }}
            >
              Палитра практик
            </h3>

            <div className="absolute inset-0">
              <img
                src="/images/card.jpg"
                alt=""
                className="w-full h-full object-cover object-[66%_15%] sm:object-[66%_center]"
              />
            </div>


            {/* Floating practice pills — two infinite marquee rows */}
            <div className="absolute inset-x-0 bottom-6 flex flex-col gap-3 overflow-hidden">
              <div className="marquee-track">
                {[...practices, ...practices, ...practices, ...practices].map((p, i) => (
                  <span
                    key={`r1-${i}`}
                    className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 min-h-[48px] text-[16px] xl:text-[18px] font-normal leading-none text-[#1C3C8C] shadow-[0_8px_20px_-8px_rgba(28,60,140,0.25)] whitespace-nowrap"
                    style={{ fontFamily: heading }}
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div className="marquee-track reverse">
                {[...practices, ...practices, ...practices, ...practices].map((p, i) => (
                  <span
                    key={`r2-${i}`}
                    className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 min-h-[48px] text-[16px] xl:text-[18px] font-normal leading-none text-[#1C3C8C] shadow-[0_8px_20px_-8px_rgba(28,60,140,0.25)] whitespace-nowrap"
                    style={{ fontFamily: heading }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column — Среда вокруг */}
        <div className="rounded-2xl border border-[#daebff] bg-white p-8 sm:p-10 xl:p-12">
          <h3
            className="text-[38px] xl:text-[44px] font-light leading-[1.1] text-[#1C3C8C]"
            style={{ fontFamily: heading }}
          >
            Среда вокруг
          </h3>

          <ul className="mt-[140px] flex flex-col gap-8">
            {environmentItems.map((item, i) => (
              <li key={i} className="flex gap-5">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[26px]">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4
                    className="text-[22px] xl:text-[24px] font-normal leading-[1.2] text-[#1C3C8C]"
                    style={{ fontFamily: heading }}
                  >
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[16px] leading-[26px] text-[#8D9DC5]">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
