import approachMasterAsset from "@/assets/approach-master.jpg.asset.json";
const heading = "'Roslindale Cyrillic Display Condensed', serif";

const environmentItems: { title: string; text: string }[] = [
  {
    title: "Свежее бельё",
    text: "На каждый сеанс я застилаю свежее, выглаженное бельё, чтобы вам было приятно и спокойно с первых минут.",
  },
  {
    title: "Одноразовые материалы",
    text: "Все расходные материалы — простыни, салфетки, перчатки — одноразовые и вскрываются при вас для чувства безопасности.",
  },
  {
    title: "Стерильные инструменты",
    text: "Все инструменты проходят стерильную обработку по стандартам гигиены, чтобы вы могли полностью довериться процессу.",
  },
  {
    title: "Расслабляющая атмосфера",
    text: "В кабинете всегда тихо, без лишних звуков и отвлекающих факторов, чтобы вы могли полностью переключиться и отдохнуть.",
  },
];

const NumberBadge = ({ number }: { number: number }) => (
  <div className="relative flex shrink-0 items-center justify-center w-[44px] h-[44px] xl:w-[40px] xl:h-[40px]">
    {/* Decorative outer ring */}
    <span className="absolute -inset-2 rounded-[12px] border border-[#88C1FF]/20" />
    {/* Main badge ring */}
    <span
      className="relative flex h-full w-full items-center justify-center rounded-[12px] border border-[#88C1FF] bg-white text-[18px] xl:text-[16px] font-light leading-none text-[#1C3C8C]"
      style={{ fontFamily: heading }}
    >
      {number}
    </span>
  </div>
);

export function ApproachCopy() {
  return (
    <section id="advantages-2" className="scroll-mt-[140px] bg-[#EFF6FF] pt-8 pb-[60px] sm:pt-[70px] sm:pb-[70px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-6 xl:h-full">
          {/* Подход мастера */}
          <div className="relative h-[420px] sm:h-[720px] xl:h-full rounded-[12px] border border-[#daebff] bg-white overflow-hidden">
            <img
              src={approachMasterAsset.url}
              alt="Татьяна работает с клиенткой в светлом массажном кабинете"
              loading="lazy"
              width={896}
              height={1200}
              data-reveal-zoom
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right column — Среда вокруг */}
        <div className="rounded-[12px] border border-[#daebff] bg-white p-6 sm:p-8 xl:p-12">
          <h3
            className="text-[30px] font-light leading-[1.1] text-[#1C3C8C] sm:text-left sm:text-[38px] xl:text-[44px]"
            style={{ fontFamily: heading }}
          >
            Всё, чтобы вы чувствовали себя спокойно, безопасно и комфортно с первых минут
          </h3>

          <ul className="mt-[120px] flex flex-col gap-8 sm:mt-[140px] sm:text-left xl:mt-[140px] xl:gap-[40px]">
            {environmentItems.map((item, i) => (
              <li key={i} className="group">
                  <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[auto_1fr] sm:items-start sm:gap-x-6 sm:gap-y-2 sm:text-left">
                    <div className="pb-2 sm:row-span-2 sm:pb-0">
                      <NumberBadge number={i + 1} />
                    </div>
                    <h4
                      className="text-[22px] font-normal leading-[1] text-[#1C3C8C] xl:text-[24px]"
                      style={{ fontFamily: heading }}
                    >
                      {item.title}
                    </h4>
                    <p className="body-text text-[#8D9DC5] sm:max-w-[560px] xl:max-w-none">
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
