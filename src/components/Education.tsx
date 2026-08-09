import tatianaPhoto from "@/assets/tatiana-zlobina.jpg.asset.json";

const heading = "'Roslindale Cyrillic Display Condensed', serif";

type EduItem = { school: string; items: string[] };

const mainEducation: EduItem[] = [
  { school: "Школа «Магнат», Владивосток", items: ["Классический массаж"] },
  { school: "Школа мастеров массажа, Москва", items: ["Массаж лица"] },
  {
    school: "Школа векторного массажа и\u00A0соматики, Москва",
    items: ["Векторный массаж", "Лимфатический массаж", "Лимфадренажный массаж"],
  },
  { school: "Академия гирудотерапии, Челябинск", items: ["Гирудотерапия"] },
];

const extraEducation: EduItem[] = [
  { school: "Международная школа Бахолдиной, Москва", items: ["Баночный массаж"] },
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
  return (
    <div className="relative rounded-[12px] bg-white border border-[#daebff] px-6 sm:px-7 xl:px-8 py-[30px]">
      {city && (
        <span className="absolute -top-3 right-4 rounded-full bg-[#EFF6FF] border border-[#daebff] px-3.5 py-1.5 text-[14px] font-medium tracking-wide text-[#1C3C8C] leading-none xl:hidden">
          {city}
        </span>
      )}
      <h3
        className="text-[#1C3C8C] text-[20px] sm:text-[32px] xl:text-[26px] leading-[1.2] pr-0 sm:pr-24 whitespace-nowrap sm:whitespace-normal"
        style={{ fontFamily: heading }}
      >
        <span className="xl:hidden">{name}</span>
        <span className="hidden xl:inline">{item.school}</span>
      </h3>

      <ul className="mt-4 space-y-2 xl:space-y-1.5">
        {item.items.map((i) => (
          <li key={i} className="body-text text-[#8D9DC5] flex gap-2">
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
    <section id="obrazovanie" className="bg-[#EFF6FF] py-[60px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900 mb-8 sm:mb-[70px] xl:mb-[140px] flex flex-col items-center text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]"
        >
          <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
        </svg>
        <h2
          className="max-w-none sm:max-w-[900px] xl:max-w-[1100px] text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px] sm:leading-[1.18] xl:text-[54px] xl:leading-[1.15]"
          style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
        >
          За&nbsp;плечами&nbsp;— годы ежедневной практики, регулярное обучение и&nbsp;спокойный подход к&nbsp;работе с&nbsp;телом
        </h2>
      </div>
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 items-stretch">

        {/* Left: photo + quote panel */}
        <div className="relative rounded-[12px] min-h-[480px] sm:min-h-[800px] xl:min-h-0 xl:h-full flex flex-col sm:block">
          <img
            src={tatianaPhoto.url}
            alt="Татьяна Злобина — мастер кабинета Седьмое небо"
            loading="lazy"
            className="w-full h-[480px] rounded-[12px] sm:absolute sm:inset-0 sm:h-full object-cover object-top sm:object-center"
          />
          <div className="relative sm:absolute inset-x-0 bottom-0 mt-4 sm:mt-0">
            <div className="rounded-[12px] bg-white border border-[#daebff] p-5 sm:p-7 xl:p-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              <div className="flex-1">
                <p className="text-[#1C3C8C] text-[15px] sm:text-[18px] xl:text-[20px] leading-[1.5]">
                  «Я&nbsp;не&nbsp;обещаю мгновенных изменений. Я&nbsp;обещаю внимание, тишину и&nbsp;время, в&nbsp;котором не&nbsp;нужно никуда спешить.»
                </p>
                <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] leading-[1.4] text-[#8D9DC5]">
                  Татьяна Злобина&nbsp;— Мастер кабинета, специалист по&nbsp;оздоровительным практикам
                </p>
              </div>
              <img
                src="/images/signature.svg"
                alt=""
                loading="lazy"
                className="w-[180px] sm:w-[240px] xl:w-[260px] h-auto shrink-0 self-end sm:self-auto"
              />
            </div>
          </div>
        </div>

        {/* Right: education lists */}
        <div className="flex flex-col gap-6 sm:gap-4 xl:gap-3">
          <div className="px-2 text-[#8D9DC5] text-[14px] sm:text-[15px]">Основное образование</div>
          <div className="flex flex-col gap-6 sm:gap-4 xl:gap-3">
            {mainEducation.map((e) => (
              <EduCard key={e.school} item={e} />
            ))}
          </div>
          <div className="px-2 mt-2 xl:mt-1 text-[#8D9DC5] text-[14px] sm:text-[15px]">Дополнительное образование</div>
          <div className="flex flex-col gap-6 sm:gap-4 xl:gap-3">
            {extraEducation.map((e) => (
              <EduCard key={e.school} item={e} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
