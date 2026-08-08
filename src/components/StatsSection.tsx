const Sparkle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
  </svg>
);

const stats = [
  {
    value: "500+",
    label: "Довольных клиентов",
    description: "Снова выбрали кабинет для заботы о себе",
  },
  {
    value: "10+",
    label: "Лет практики",
    description: "Работа с телом, банками и гирудотерапией",
  },
  {
    value: "95%",
    label: "Возвращаются",
    description: "После первого курса приходят на поддержку",
  },
  {
    value: "24/7",
    label: "Онлайн-запись",
    description: "Через YCLIENTS в любое время",
  },
];

export function StatsSection() {
  return (
    <section
      id="stats"
      className="bg-[#EFF6FF] pt-[60px] pb-0 sm:pt-[70px] sm:pb-0 xl:pt-[140px] xl:pb-0"
    >
      <div className="container-1900 px-4 sm:px-5 xl:px-8">
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-16 xl:items-start">
          {/* Left: label + heading */}
          <div className="xl:w-[55%]">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Sparkle className="h-6 w-6 text-[#1C3C8C]" />
              <span className="text-sm sm:text-base font-light text-[#1C3C8C] tracking-[-0.02em]">
                Внимание к каждому состоянию и мягкая забота на каждом сеансе
              </span>
            </div>

            <h2
              className="text-[30px] font-light leading-[1.1] text-[#1C3C8C] sm:text-[38px] xl:text-[54px] xl:leading-[1.08]"
              style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
            >
              Кабинет, где забота о теле переплетается с вниманием к состоянию, а{"\u00A0"}
              каждый визит помогает{"\u00A0"}
              <span className="bg-gradient-to-r from-[#4A7FD6] to-[#88C1FF] bg-clip-text text-transparent">
                вернуться к себе
              </span>
            </h2>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-12 xl:w-[45%] xl:pt-2">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-[48px] font-light leading-[1] tracking-[-0.04em] text-[#1C3C8C] sm:text-[56px] xl:text-[72px]"
                  style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
                >
                  {stat.value}
                </span>
                <span className="mt-2 text-[15px] font-medium leading-[1.3] text-[#1C3C8C] sm:text-[16px]">
                  {stat.label}
                </span>
                <span className="mt-1 text-[14px] font-light leading-[1.35] text-[#4A7FD6] sm:text-[15px]">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
