
const stats = [
  {
    value: "500 +",
    label: "Довольных клиентов",
    description: "Снова выбрали кабинет для заботы о себе",
  },
  {
    value: "5 +",
    label: "Лет практики",
    description: "Работа с телом, банками и гирудотерапией",
  },
  {
    value: "95 %",
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
      id="advantages"
      className="scroll-mt-[120px] bg-[#EFF6FF] pt-[60px] pb-0 sm:pt-[140px] sm:pb-0 xl:pt-[140px] xl:pb-0"
    >
      <div className="container-1900">
        <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:gap-5 xl:items-start">
          {/* Left: label + heading */}
          <div className="text-center xl:text-left">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
              style={{
                borderRadius: "12px",
                backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
              }}
            >
              Преимущества
            </span>

            <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0">
              Бережная работа с телом: опыт, диалог, внимание
            </h2>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-12 xl:pt-2">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-noto-serif-narrow text-[48px] font-light leading-[1] tracking-[-0.04em] text-[#1C3C8C] sm:text-[56px] xl:text-[72px]">
                  {stat.value}
                </span>
                <span className="mt-2 text-[15px] font-medium leading-[1.3] text-[#1C3C8C] sm:text-[16px]">
                  {stat.label}
                </span>
                <span className="mt-1 text-[14px] font-light leading-[1.35] text-[#566A93] sm:text-[15px]">
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
