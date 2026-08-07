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

import { Sparkles, ShieldCheck, Scissors, Leaf, type LucideIcon } from "lucide-react";

const environmentItems: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: Sparkles,
    title: "Свежее бельё",
    text: "На каждый сеанс я застилаю свежее, выглаженное бельё, чтобы вам было приятно и спокойно с первых минут.",
  },
  {
    Icon: ShieldCheck,
    title: "Одноразовые материалы",
    text: "Все расходные материалы — простыни, салфетки, перчатки — одноразовые и вскрываются при вас для чувства безопасности.",
  },
  {
    Icon: Scissors,
    title: "Стерильные инструменты",
    text: "Все инструменты проходят стерильную обработку по стандартам гигиены, чтобы вы могли полностью довериться процессу.",
  },
  {
    Icon: Leaf,
    title: "Расслабляющая атмосфера",
    text: "В кабинете всегда тихо, без лишних звуков и отвлекающих факторов, чтобы вы могли полностью переключиться и отдохнуть.",
  },
];

export function ApproachCopy() {
  return (
    <section id="advantages-2" className="scroll-mt-[140px] bg-[#EFF6FF] pt-8 pb-[60px] sm:pt-[70px] sm:pb-[70px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-6 xl:h-full">
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
