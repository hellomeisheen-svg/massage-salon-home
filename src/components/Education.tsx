import tatianaPhoto from "@/assets/tatiana-zlobina.jpg.asset.json";
import tatianaSignature from "@/assets/tatiana-signature.svg.asset.json";

type EduItem = { school: string; items: string[]; mobileName?: string };

const mainEducation: EduItem[] = [
  { school: "Школа «Магнат», Владивосток", items: ["Классический массаж"] },
  { school: "Школа мастеров массажа, Москва", items: ["Массаж лица"] },
  {
    school: "Школа векторного массажа и\u00A0соматики, Москва",
    mobileName: "Школа векторного массажа",
    items: ["Векторный массаж", "Лимфатический массаж", "Лимфадренажный массаж"],
  },
  { school: "Академия гирудотерапии, Челябинск", items: ["Гирудотерапия"] },
];

const extraEducation: EduItem[] = [
  { school: "Школа Бахолдиной, Москва", items: ["Баночный массаж"] },
];

function parseSchool(school: string) {
  const idx = school.indexOf(",");
  if (idx === -1) return { name: school, city: "" };
  return {
    name: school.slice(0, idx).trim(),
    city: school.slice(idx + 1).trim(),
  };
}

function EduCard({ item }: { item: EduItem }) {
  const { name, city } = parseSchool(item.school);
  const mobileName = item.mobileName ?? name;
  return (
    <div className="relative rounded-[12px] bg-white border border-[#daebff] px-6 sm:px-7 xl:px-8 py-[30px]">
      {city && (
        <span className="absolute -top-3 right-4 rounded-full bg-[#EFF6FF] border border-[#daebff] px-3.5 py-1.5 text-[14px] font-medium tracking-wide text-[#1C3C8C] leading-none xl:hidden">
          {city}
        </span>
      )}
      <h3 className="font-noto-serif-narrow ds-h4 text-[#1C3C8C] text-[24px] pr-0 sm:pr-24 whitespace-nowrap sm:whitespace-normal sm:text-[28px] xl:text-[28px]">
        <span className="xl:hidden">{mobileName}</span>
        <span className="hidden xl:inline">{item.school}</span>
      </h3>

      <ul className="mt-4 space-y-2 xl:space-y-1.5">
        {item.items.map((i) => (
          <li key={i} className="body-text text-[#566A93] flex gap-2">
            <span aria-hidden>•</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Education() {
  return (
    <section id="obrazovanie" className="scroll-mt-[120px] bg-[#EFF6FF] ds-section">
      <div className="container-1900 mb-8 sm:mb-[70px] xl:mb-[140px] flex flex-col items-center text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]"
        >
          <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
        </svg>
        <h2 className="font-noto-serif-narrow max-w-none sm:max-w-[900px] xl:max-w-[1100px] ds-h1 text-[#1C3C8C]">
          <span className="xl:hidden">За&nbsp;плечами&nbsp;— годы ежедневной практики и&nbsp;регулярное обучение</span>
          <span className="hidden xl:inline">За&nbsp;плечами&nbsp;— годы ежедневной практики, регулярное обучение и&nbsp;спокойный подход к&nbsp;работе с&nbsp;телом</span>
        </h2>
      </div>
      <div className="container-1900 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch xl:grid-cols-2">

        {/* Left: photo + quote panel */}
        <div className="relative min-h-[480px] lg:min-h-0 lg:h-full xl:min-h-0 xl:h-full flex flex-col lg:block xl:block rounded-[12px] border-0 lg:border lg:border-[#DAEBFF] xl:border-0 xl:border xl:border-[#DAEBFF]">
          <img
            src={tatianaPhoto.url}
            alt="Татьяна Злобина — мастер кабинета Седьмое небо"
            loading="lazy"
            className="w-full h-[480px] sm:h-[720px] rounded-[12px] border border-[#DAEBFF] lg:border-0 lg:absolute lg:inset-0 lg:h-full xl:border-0 xl:absolute xl:inset-0 xl:h-full object-cover object-top sm:object-center"
          />
          <div className="relative mt-4 xl:absolute xl:inset-x-0 xl:bottom-0 xl:mt-0 xl:px-8 xl:pb-8">
            <div className="relative rounded-[12px] border border-[#DAEBFF] bg-white xl:bg-[#EFF6FF] p-8 sm:p-12 xl:p-10 shadow-[0_20px_50px_-12px_rgba(74,127,214,0.08)] flex flex-col xl:flex-row xl:items-end justify-between gap-6 xl:gap-8">
              <div className="flex flex-col gap-3 sm:gap-4 xl:w-[760px] xl:shrink-0">
                <blockquote className="font-noto-serif-narrow ds-h4 text-[#1C3C8C] text-[24px] sm:text-[28px] xl:max-w-[760px]">
                  «Иногда достаточно тишины, бережного внимания,<br className="hidden xl:inline" />{" "}
                  и времени, чтобы почувствовать себя лучше.»
                </blockquote>

                <p className="text-[16px] font-light leading-[1.5] text-[#566A93] xl:max-w-[480px]">
                  Татьяна Злобина — Мастер кабинета,
                  <br className="hidden xl:inline" />
                  специалист по оздоровительным практикам
                </p>
              </div>

              <img
                src={tatianaSignature.url}
                alt="Подпись Татьяны Злобиной"
                width={295}
                height={113}
                className="h-auto w-[160px] sm:hidden xl:block xl:w-[225px] shrink-0 self-end xl:absolute xl:bottom-[40px] xl:right-[30px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right: education lists */}
        <div className="flex flex-col gap-6 xl:gap-3">
          <div className="px-2 text-[#566A93] text-[14px] sm:text-[15px]">Основное образование</div>
          <div className="flex flex-col gap-6 xl:gap-3">
            {mainEducation.map((e) => (
              <EduCard key={e.school} item={e} />
            ))}
          </div>
          <div className="px-2 mt-2 xl:mt-1 text-[#566A93] text-[14px] sm:text-[15px]">Дополнительное образование</div>
          <div className="flex flex-col gap-6 xl:gap-3">
            {extraEducation.map((e) => (
              <EduCard key={e.school} item={e} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
