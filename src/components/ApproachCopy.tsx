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
  <div className="relative flex items-center justify-center w-[44px] h-[44px] xl:w-[48px] xl:h-[48px]">
    <span
      className="flex items-center justify-center w-full h-full rounded-full border border-[#88C1FF] text-[18px] xl:text-[20px] font-light leading-none text-[#1C3C8C]"
      style={{ fontFamily: heading }}
    >
      {number}
    </span>
    <span className="absolute -bottom-0.5 -right-0.5 w-[7px] h-[7px] rounded-full bg-[#88C1FF]" />
  </div>
);

export function ApproachCopy() {
  return (
    <section id="advantages-2" className="scroll-mt-[140px] bg-[#EFF6FF] pt-8 pb-[60px] sm:pt-[70px] sm:pb-[70px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-6 xl:h-full">
          {/* Подход мастера */}
          <div className="relative rounded-[12px] border border-[#daebff] bg-white min-h-[380px] xl:min-h-0 xl:h-full overflow-hidden">
            <img
              src={approachMasterAsset.url}
              alt="Татьяна работает с клиенткой в светлом массажном кабинете"
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 w-full h-full object-cover"
            />
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
            {environmentItems.map((item, i) => (
              <li key={i} className="group">
                <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-start xl:gap-5">
                  <NumberBadge number={i + 1} />
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
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
