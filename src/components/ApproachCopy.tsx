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

const Decorations = [
  // 1 — Leaf
  <svg
    key="1"
    className="absolute -top-1 left-5 w-6 h-6 text-[#88C1FF]/40 transform -rotate-12 transition-all duration-700 group-hover:rotate-0 group-hover:scale-110"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
  </svg>,
  // 2 — Soft petal
  <svg
    key="2"
    className="absolute top-4 left-6 w-5 h-5 text-[#88C1FF]/35 transform rotate-45 transition-all duration-700 group-hover:scale-125"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12,2C12,2 4,10 4,15C4,19.42 7.58,23 12,23C16.42,23 20,19.42 20,15C20,10 12,2 12,2Z" />
  </svg>,
  // 3 — Branch lines
  <svg
    key="3"
    className="absolute top-1 left-4 w-7 h-7 text-[#88C1FF]/40 transform -rotate-45 transition-all duration-700 group-hover:rotate-12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M12,2 L12,22" />
    <path d="M12,12 L19,8" />
    <path d="M12,12 L5,8" />
    <path d="M12,17 L20,13" />
    <path d="M12,17 L4,13" />
  </svg>,
  // 4 — Abstract curve
  <svg
    key="4"
    className="absolute top-5 left-5 w-6 h-6 text-[#88C1FF]/35 transition-all duration-700 group-hover:opacity-60 group-hover:translate-x-1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M4 12C4 12 7 8 12 8C17 8 20 12 20 12C20 12 17 16 12 16C7 16 4 12 4 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
];

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
                  <div className="relative shrink-0 w-[40px] h-[40px] xl:w-[44px] xl:h-[44px] flex items-center justify-center">
                    {/* Large faded background number */}
                    <span
                      className="absolute -top-3 -left-2 text-[48px] xl:text-[52px] font-light leading-none text-[#88C1FF]/25 select-none pointer-events-none transition-opacity duration-500 group-hover:text-[#88C1FF]/35"
                      style={{ fontFamily: heading }}
                    >
                      {i + 1}
                    </span>
                    {/* Decorative accent */}
                    {Decorations[i]}
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
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
