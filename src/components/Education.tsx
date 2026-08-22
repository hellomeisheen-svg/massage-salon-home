


type EduItem = { school: string; items: string[]; mobileName?: string };

const mainEducation: EduItem[] = [
  { school: "Школа «Магнат», Владивосток", items: ["Классический массаж"] },
  { school: "Школа мастеров массажа, Москва", items: ["Массаж лица"] },
  {
    school: "Школа векторного массажа и\u00A0соматики, Москва",
    mobileName: "Школа векторного массажа",
    items: ["Векторный массаж", "Лимфодренажный массаж"],
  },
  { school: "Академия гирудотерапии, Челябинск", items: ["Гирудотерапия"] },
];

const extraEducation: EduItem[] = [
  { school: "Академия Бахолдиной, Москва", items: ["Баночный массаж", "Акупунктурный кетгут"] },
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
    <div className="relative rounded-[12px] ds-bento-shadow bg-white border border-[#daebff] px-6 sm:px-7 xl:px-8 py-6 sm:py-[30px]">
      {city && (
        <span className="absolute -top-3 right-4 rounded-[12px] bg-[#EFF6FF] border border-[#daebff] px-3.5 py-1.5 text-[14px] font-medium tracking-wide text-[#1C3C8C] leading-none xl:hidden">
          {city}
        </span>
      )}
      <h3 className="font-noto-serif-narrow ds-h4 text-[#1C3C8C] text-[24px] pr-0 sm:pr-24 whitespace-nowrap sm:whitespace-normal xl:whitespace-nowrap sm:text-[28px] xl:text-[28px]">
        <span className="xl:hidden">{mobileName}</span>
        <span className="hidden xl:inline">{item.school}</span>
      </h3>

      <ul className="mt-4 sm:mt-5 xl:mt-6 xl:space-y-1.5">
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
      <div className="container-1900 mb-8 sm:mb-10 xl:mb-[140px] flex flex-col items-center text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]"
        >
          <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
        </svg>
        <h2 className="font-noto-serif-narrow max-w-none sm:max-w-[900px] xl:max-w-[1100px] ds-h1 text-[#1C3C8C]">
          '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Выступи как опытный арт-директор и проведи визуальный аудит текущего макета.\n\nЦель проекта:\n\n[опиши задачу сайта]\n\nБренд и позиционирование:\n\n[опиши бренд]\n\nЦелевая аудитория:\n\n[опиши аудиторию]\n\nЖелаемое впечатление:\n\n[например: современный, технологичный, надёжный, премиальный]\n\nПроверь:\n\n1. Визуальную иерархию страницы.\n\n2. Первый экран и качество визуального позиционирования.\n\n3. Фокус внимания пользователя.\n\n4. Композицию и баланс блоков.\n\n5. Сетку, выравнивания и отступы.\n\n6. Единство типографики.\n\n7. Размеры, начертания и контраст шрифтов.\n\n8. Цветовую палитру и контрастность.\n\n9. Согласованность кнопок, карточек, полей и иконок.\n\n10. Качество и уместность изображений.\n\n11. Соответствие визуального стиля целевой аудитории.\n\n12. Визуальное доверие к бренду.\n\n13. Слишком перегруженные или пустые участки.\n\n14. Повторяющиеся и визуально слабые компоненты.\n\n15. Адаптацию дизайна под мобильные устройства.\n\n16. Состояния hover, focus, active, disabled и error.\n\n17. Читаемость текста поверх изображений.\n\n18. Доступность интерфейса, включая контраст и заметность фокуса.\n\n19. Единообразие визуального языка на всех страницах.\n\n20. Возможные проблемы при передаче макета разработчику.\n\nПравила:\n\n- Оценивай не личный вкус, а соответствие цели, бренду и пользовательскому сценарию.\n\n- Отделяй критические проблемы от субъективных пожеланий.\n\n- Не меняй дизайн автоматически.\n\n- Для каждой рекомендации указывай причину и ожидаемый результат.\n\n- Если предлагаешь новый цвет, размер или отступ, укажи конкретное значение.\n\n- Не выдумывай элементы, которых нет в проекте.\n\nПосле проверки подготовь отчёт:\n\n# Арт-дирекционный аудит\n\n## 1. Краткое резюме\n\n- Общее визуальное качество: от 0 до 100.\n\n- Сила брендинга.\n\n- Читаемость.\n\n- Целостность дизайн-системы.\n\n- Главный визуальный риск.\n\n## 2. Table of Problems\n\n| Приоритет | Экран или компонент | Проблема | Влияние | Рекомендация |\n\n## 3. Визуальная иерархия\n\nОпиши путь взгляда пользователя от первого экрана до целевого действия.\n\n## 4. Дизайн-система\n\nПроверь:\n\n- цвета;\n\n- шрифты;\n\n- отступы;\n\n- радиусы;\n\n- тени;\n\n- кнопки;\n\n- поля;\n\n- карточки;\n\n- иконки.\n\n## 5. Адаптивность\n\nОтдельно оцени desktop, tablet и mobile.\n\n## 6. Топ-10 визуальных улучшений\n\nДля каждого пункта укажи конкретное изменение и его приоритет.\n\n## 7. План внедрения\n\nРаздели рекомендации на:\n\n- быстрые правки;\n\n- средние изменения;\n\n- полноценный редизайн.
        </h2>
      </div>
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 items-stretch">

        {/* Left: photo + quote panel */}
        <div className="relative xl:min-h-0 xl:h-full flex flex-col xl:rounded-[12px] xl:overflow-hidden xl:border xl:border-[#DAEBFF]">
          <img
            src="/images/tatiana-zlobina.webp"
            alt="Татьяна Злобина — мастер кабинета Седьмое небо"
            loading="lazy"
            className="w-full h-[480px] sm:h-[720px] rounded-[12px] border border-[#DAEBFF] ds-bento-shadow xl:border-0 xl:rounded-none xl:absolute xl:inset-0 xl:h-full object-cover object-top sm:object-center"
          />
          <div className="relative mt-4 sm:mt-5 xl:absolute xl:inset-x-0 xl:bottom-0 xl:mt-0 xl:p-[clamp(16px,2vw,32px)]">
            <div className="relative overflow-hidden rounded-[12px] border border-[#DAEBFF] bg-white xl:bg-white/95 xl:backdrop-blur-sm p-6 sm:p-12 xl:p-[clamp(24px,4vw,48px)] shadow-[0_20px_50px_-12px_rgba(74,127,214,0.08)] hidden">
              <div className="flex flex-col gap-6 sm:gap-8">
                <div className="flex flex-col gap-3 sm:gap-4 xl:gap-3 relative z-10">
                  <blockquote className="font-noto-serif-narrow ds-h4 text-[#1C3C8C] text-[20px] sm:text-[28px] xl:text-[clamp(20px,2.2vw,32px)] leading-[1.2] w-full">
                    «Иногда достаточно тишины и бережного внимания, чтобы почувствовать себя лучше»
                  </blockquote>
                  <p className="text-[14px] sm:text-[16px] xl:text-[clamp(14px,1.1vw,16px)] font-light leading-[1.5] text-[#566A93] max-w-[480px]">
                    Татьяна Злобина — Мастер кабинета,
                    <br className="hidden sm:inline" />
                    специалист по оздоровительным практикам
                  </p>
                </div>

                <div className="flex justify-end xl:hidden xl:flex-shrink-0 pointer-events-none relative z-20 xl:mb-[-10px]">
                  <img
                    src="/images/tatiana-signature.svg"
                    alt="Подпись Татьяны Злобиной"
                    className="h-auto w-[120px] sm:w-[180px] xl:w-[clamp(140px,12vw,225px)] opacity-80 xl:opacity-100"
                    loading="lazy"
                  />
                </div>
              </div>
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
