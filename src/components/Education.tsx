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

function EduCard({ item }: { item: EduItem }) {
  return (
    <div className="rounded-[28px] bg-white border border-[#daebff] p-6 sm:p-8 xl:p-10">
      <h3
        className="text-[#1C3C8C] text-[26px] sm:text-[32px] xl:text-[36px] leading-[1.1]"
        style={{ fontFamily: heading }}
      >
        {item.school}
      </h3>
      <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
        {item.items.map((i) => (
          <li key={i} className="text-[#8D9DC5] text-[15px] sm:text-[16px] leading-[1.5] flex gap-2">
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
    <section id="obrazovanie" className="bg-[#EFF6FF] py-[60px] xl:py-[70px]">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
        {/* Left: quote panel */}
        <div className="relative rounded-[28px] bg-[#DAEBFF] overflow-hidden min-h-[420px] xl:min-h-[100%] flex">
          <div className="mt-auto w-full p-4 sm:p-5">
            <div className="rounded-[20px] bg-white p-5 sm:p-7 xl:p-8 flex items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <p className="text-[#1C3C8C] text-[15px] sm:text-[17px] leading-[1.5]">
                  «Я&nbsp;не&nbsp;обещаю мгновенных изменений. Я&nbsp;обещаю внимание, тишину и&nbsp;время, в&nbsp;котором не&nbsp;нужно никуда спешить.»
                </p>
                <p className="mt-3 text-[#8D9DC5] text-[13px] sm:text-[14px] leading-[1.5]">
                  Татьяна Злобина&nbsp;— Мастер кабинета, специалист по&nbsp;оздоровительным практикам
                </p>
              </div>
              <img
                src="/images/signature.png"
                alt=""
                width={1024}
                height={512}
                loading="lazy"
                className="w-[110px] sm:w-[150px] xl:w-[180px] h-auto shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Right: education lists */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="px-2 text-[#8D9DC5] text-[14px] sm:text-[15px]">Основное образование</div>
          <div className="flex flex-col gap-4 sm:gap-5">
            {mainEducation.map((e) => (
              <EduCard key={e.school} item={e} />
            ))}
          </div>
          <div className="px-2 mt-2 text-[#8D9DC5] text-[14px] sm:text-[15px]">Дополнительное образование</div>
          <div className="flex flex-col gap-4 sm:gap-5">
            {extraEducation.map((e) => (
              <EduCard key={e.school} item={e} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
