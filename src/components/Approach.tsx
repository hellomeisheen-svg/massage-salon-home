

const environmentItems: { title: string; text: string }[] = [
  {
    title: "Свежее бельё",
    text: "На каждый сеанс я застилаю свежее, выглаженное бельё, чтобы вам было приятно и спокойно с первых минут.",
  },
  {
    title: "Одноразовые материалы",
    text: "Простыни, салфетки и перчатки — одноразовые. Упаковку вскрываю при вас для чувства безопасности.",
  },
  {
    title: "Стерильность инструментов",
    text: "Все инструменты проходят стерильную обработку по стандартам гигиены. Вы можете полностью довериться процессу.",
  },
  {
    title: "Тихая обстановка",
    text: "В кабинете нет посторонних звуков и звонков. Вы можете полностью переключиться и отдохнуть.",
  },
];

const NumberBadge = ({ number }: { number: number }) => (
  <div className="relative flex shrink-0 items-center justify-center w-[44px] h-[44px] xl:w-[40px] xl:h-[40px]" aria-label={`Преимущество №${number}`}>
    {/* Decorative outer ring */}
    <span className="absolute -inset-2 rounded-[12px] border border-[#88C1FF]/20" aria-hidden="true" />
    {/* Main badge ring */}
    <span className="ds-counter relative flex h-full w-full items-center justify-center rounded-[12px] border border-[#88C1FF] bg-white text-[#1C3C8C]">
      {number}
    </span>
  </div>
);

export function Approach() {
  return (
    <section id="advantages-2" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-6 xl:h-full">
          {/* Подход мастера */}
          <div className="relative h-[420px] sm:h-[720px] xl:h-full ds-card ds-bento-shadow overflow-hidden rounded-[12px]">
            <img
              src="/images/approach-master.webp"
              alt="Татьяна работает с клиенткой в светлом массажном кабинете"
              width={1024}
              height={1024}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right column — Среда вокруг */}
        <div className="ds-card ds-bento-shadow p-6 sm:p-8 xl:p-12 rounded-[12px]">
          <h3 className="font-noto-serif-narrow ds-h2 text-left text-[#1C3C8C] leading-tight px-0">
            Всё, чтобы вы чувствовали себя спокойно и&nbsp;комфортно с&nbsp;первых минут
          </h3>

          <ul className="mt-[120px] flex flex-col gap-12 sm:mt-[140px] sm:text-left xl:mt-[140px] xl:gap-[40px]">
            {environmentItems.map((item, i) => (
              <li key={i} className="group">
                  <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[auto_1fr] sm:items-start sm:gap-x-6 sm:gap-y-2 sm:text-left">
                    <div className="pb-2 sm:row-span-2 sm:pb-0">
                      <NumberBadge number={i + 1} />
                    </div>
                    <h4 className="font-noto-serif-narrow ds-h4 text-[#1C3C8C] text-[24px] sm:text-[28px] xl:text-[28px]">
                      {item.title}
                    </h4>
                    <p className="body-text text-[#566A93] sm:max-w-[560px] xl:max-w-none">
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
