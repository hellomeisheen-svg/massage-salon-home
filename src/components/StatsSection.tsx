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
      <div className="container-1900">
        <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:gap-5 xl:items-start">
          {/* Left: label + heading */}
          <div>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium tracking-wide text-white"
              style={{
                borderRadius: "4px",
                backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
              }}
            >
              Преимущества
            </span>

            <h2
              className="mt-6 text-[30px] font-light leading-[1.1] text-[#1C3C8C] sm:text-[38px] xl:text-[54px] xl:leading-[1.08]"
              style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
            >
              Бережная работа с телом, в которой важны опыт, понятный диалог и внимание к вашему запросу.
            </h2>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-12 xl:pt-2">
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
