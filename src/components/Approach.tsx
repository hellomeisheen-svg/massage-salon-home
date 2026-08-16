

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
    <span className="absolute -inset-2 rounded-[var(--radius-sm)] border border-[var(--color-primary-action)]/10" />
    {/* Main badge ring */}
    <span className="ds-counter relative flex h-full w-full items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-primary-action)]/30 bg-[var(--color-bg-main)] text-[var(--color-primary)] font-medium">
      {number}
    </span>
  </div>
);

export function Approach() {
  return (
    <section id="advantages-2" className="scroll-mt-[140px] bg-[var(--color-bg-main)] py-[var(--space-8)] xl:py-[var(--space-10)]">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-6 xl:h-full">
          {/* Подход мастера */}
          <div className="relative h-[420px] sm:h-[720px] xl:h-full ds-card overflow-hidden border-[var(--color-border)] shadow-[var(--shadow-card)] rounded-[var(--radius-card)] hover:translate-y-0">
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
        <div className="ds-card p-6 sm:p-8 xl:p-12 bg-[var(--color-bg-card)] border-[var(--color-border)] shadow-[var(--shadow-card)] rounded-[var(--radius-card)] hover:translate-y-0">
          <h3 className="font-noto-serif-narrow ds-h2 text-left text-[var(--color-primary)] leading-tight px-0 font-light">
            Всё, чтобы вы чувствовали себя спокойно и&nbsp;комфортно с&nbsp;первых минут
          </h3>

          <ul className="mt-[120px] flex flex-col gap-8 sm:mt-[140px] sm:text-left xl:mt-[140px] xl:gap-[40px]">
            {environmentItems.map((item, i) => (
              <li key={i} className="group">
                  <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[auto_1fr] sm:items-start sm:gap-x-6 sm:gap-y-2 sm:text-left">
                    <div className="pb-2 sm:row-span-2 sm:pb-0">
                      <NumberBadge number={i + 1} />
                    </div>
                    <h4 className="font-noto-serif-narrow ds-h3 text-[var(--color-primary)] text-[22px] sm:text-[24px] xl:text-[26px] font-light">
                      {item.title}
                    </h4>
                    <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[var(--color-text-main)] sm:max-w-[560px] xl:max-w-none">
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
