const heading = "'Roslindale Cyrillic Display Condensed', serif";

const practices = [
  "Векторный",
  "Лимфатический",
  "Лимфодренажный",
  "Классический",
  "Гирудотерапия",
  "Банки",
];

const practicesRow1 = [
  "Классический",
  "Банки",
  "Векторный",
  "Лимфодренажный",
  "Гирудотерапия",
  "Лимфатический",
  "Векторный",
  "Классический",
  "Лимфодренажный",
  "Банки",
  "Лимфатический",
  "Гирудотерапия",
];

const practicesRow2 = [
  "Лимфодренажный",
  "Гирудотерапия",
  "Классический",
  "Лимфатический",
  "Банки",
  "Векторный",
  "Гирудотерапия",
  "Лимфодренажный",
  "Векторный",
  "Классический",
  "Лимфатический",
  "Банки",
];

import { Sparkles, ShieldCheck, Droplets, Scissors, Leaf, type LucideIcon } from "lucide-react";

const environmentItems: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: Sparkles,
    title: "Свежее бельё на\u00A0каждый сеанс",
    text: "На\u00A0каждый сеанс я\u00A0застилаю свежее, выглаженное бельё, чтобы вам было приятно и\u00A0спокойно с\u00A0первых минут.",
  },
  {
    Icon: ShieldCheck,
    title: "Одноразовые расходные материалы",
    text: "Все расходные материалы\u00A0— простыни, салфетки, перчатки\u00A0— одноразовые и\u00A0вскрываются при\u00A0вас для\u00A0чувства безопасности.",
  },
  {
    Icon: Droplets,
    title: "Сертифицированные масла и\u00A0кремы",
    text: "Для\u00A0работы я\u00A0выбираю только сертифицированные масла и\u00A0кремы, мягкие к\u00A0коже и\u00A0подходящие даже при\u00A0повышенной чувствительности.",
  },
  {
    Icon: Scissors,
    title: "Стерильная обработка инструментов",
    text: "Все инструменты проходят стерильную обработку по\u00A0стандартам гигиены, чтобы вы\u00A0могли полностью довериться процессу.",
  },
  {
    Icon: Leaf,
    title: "Тихая и\u00A0расслабляющая атмосфера",
    text: "В\u00A0кабинете всегда тихо, без\u00A0лишних звуков и\u00A0отвлекающих факторов, чтобы вы\u00A0могли полностью переключиться и\u00A0отдохнуть.",
  },
];

export function ApproachCopy() {
  return (
    <section id="advantages-2" className="scroll-mt-[140px] bg-[#EFF6FF] pt-8 pb-[60px] sm:pt-[70px] sm:pb-[70px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-6 xl:grid xl:grid-rows-2 xl:gap-6 xl:h-full">
          {/* Подход мастера */}
          <div className="rounded-[12px] border border-[#daebff] bg-white p-8 sm:p-10 xl:p-12 min-h-[380px] xl:min-h-0 xl:h-full flex flex-col justify-between">
            <h3
              className="text-[30px] sm:text-[38px] xl:text-[44px] font-light leading-[1.1] text-[#1C3C8C]"
              style={{ fontFamily: heading }}
            >
              Подход мастера
            </h3>
            <p className="mt-8 text-[16px] leading-[26px] text-[#8D9DC5] max-w-[440px]">
              Каждый сеанс&nbsp;— это спокойный диалог с&nbsp;вашим телом. Я&nbsp;слушаю, что&nbsp;нужно сегодня, и&nbsp;подбираю технику под&nbsp;ваше состояние, а&nbsp;не&nbsp;наоборот.
            </p>
          </div>

          {/* Палитра практик */}
          <div className="relative rounded-[12px] border border-[#daebff] bg-white p-8 sm:p-10 xl:p-12 min-h-[420px] xl:min-h-0 xl:h-full overflow-hidden">
            <h3
              className="relative z-10 text-[30px] sm:text-[38px] xl:text-[44px] font-light leading-[1.1] text-[#1C3C8C]"
              style={{ fontFamily: heading }}
            >
              Палитра практик
            </h3>

            <div className="absolute inset-0">
              <img
                src="/images/card.jpg"
                alt=""
                className="w-full h-full object-cover object-[38%_100%] sm:object-[66%_center]"
              />
              <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-white/85 via-white/40 to-transparent sm:hidden" />
              <div className="absolute inset-0 hidden sm:block bg-[radial-gradient(ellipse_60%_55%_at_0%_0%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.75)_35%,rgba(255,255,255,0.25)_65%,transparent_85%)]" />
            </div>


            {/* Floating practice pills — two infinite marquee rows */}
            <div className="absolute inset-x-0 bottom-6 flex flex-col gap-3 overflow-hidden">
              <div className="marquee-track">
                {[...practicesRow1, ...practicesRow1].map((p, i) => (
                  <span
                    key={`r1-${i}`}
                    className="inline-flex min-h-[60px] w-[200px] sm:w-[250px] items-center justify-center whitespace-nowrap rounded-lg bg-white px-6 py-4 text-[20px] leading-[1.5] text-[#1C3C8C] shadow-[0_8px_20px_-8px_rgba(28,60,140,0.25)] shrink-0"
                    style={{ fontFamily: heading }}
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div className="marquee-track reverse">
                {[...practicesRow2, ...practicesRow2].map((p, i) => (
                  <span
                    key={`r2-${i}`}
                    className="inline-flex min-h-[60px] w-[200px] sm:w-[250px] items-center justify-center whitespace-nowrap rounded-lg bg-white px-6 py-4 text-[20px] leading-[1.5] text-[#1C3C8C] shadow-[0_8px_20px_-8px_rgba(28,60,140,0.25)] shrink-0"
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
        <div className="rounded-[12px] border border-[#daebff] bg-white p-8 sm:p-10 xl:p-12">
          <h3
            className="text-[30px] sm:text-[38px] xl:text-[44px] font-light leading-[1.1] text-[#1C3C8C]"
            style={{ fontFamily: heading }}
          >
            Среда вокруг
          </h3>

          <ul className="mt-[120px] sm:mt-[140px] flex flex-col gap-8">
            {environmentItems.map((item, i) => {
              const Icon = item.Icon;
              return (
                <li key={i}>
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <div className="shrink-0 w-[40px] h-[40px] xl:w-[44px] xl:h-[44px] rounded-[0.5rem] bg-[#EFF6FF] border border-[#daebff] flex items-center justify-center">
                      <Icon className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-[#1C3C8C]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4
                        className="text-[22px] xl:text-[24px] font-normal leading-[1] text-[#1C3C8C]"
                        style={{ fontFamily: heading }}
                      >
                        {item.title}
                      </h4>
                      <p className="mt-4 text-[16px] leading-[1.5] text-[#8D9DC5] xl:max-w-[600px]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}

          </ul>
        </div>
      </div>
    </section>
  );
}
