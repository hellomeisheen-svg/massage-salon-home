import ImageReveal from "@/components/ui/image-tiles";

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

const decoImages = [
  {
    src: "/images/uslugi-limfodrenazhnyi-massazh.webp",
    className:
      "absolute left-0 top-[6%] sm:left-[2%] sm:top-[80px] xl:left-[60px] xl:top-[110px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover ds-bento-shadow",
    delay: "0s",
    rot: "-3deg",
  },
  {
    src: "/images/uslugi-massazh-golovy.webp",
    className:
      "absolute right-0 top-[5%] sm:right-[2%] sm:top-[80px] xl:right-[60px] xl:top-[110px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover ds-bento-shadow",
    delay: "0.2s",
    rot: "3deg",
  },
  {
    src: "/images/uslugi-massazh-spiny-i-shei.webp",
    className:
      "absolute left-[8%] bottom-[6%] sm:left-[10%] sm:bottom-[15px] xl:left-[140px] xl:bottom-[20px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover ds-bento-shadow",
    delay: "0.4s",
    rot: "2deg",
  },
  {
    src: "/images/uslugi-girudoterapiya.webp",
    className:
      "absolute right-[8%] bottom-[8%] sm:right-[10%] sm:bottom-[15px] xl:right-[140px] xl:bottom-[20px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover ds-bento-shadow",
    delay: "0.6s",
    rot: "-2deg",
  },
];

export function HabitQuote() {
  return (
    <section className="relative bg-[#EFF6FF] pt-[60px] pb-[60px] sm:pt-[140px] sm:pb-[180px] xl:pt-[180px] xl:pb-[140px] overflow-hidden">
      {/* Decorative photos — Desktop/Tablet (floating) */}
      <div className="container-1900 absolute inset-0 left-1/2 -translate-x-1/2 hidden sm:block pointer-events-none">
        <div className="relative w-full h-full">
          {decoImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt="Уютная атмосфера в массажном кабинете Седьмое небо"
              width={512}
              height={512}
              loading="lazy"
              decoding="async"
              className={`deco-photo ${img.className}`}
              style={{
                ["--deco-delay" as string]: img.delay,
                ["--deco-rot" as string]: img.rot,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-1900 relative z-10 flex flex-col items-center px-4 sm:px-5 text-center">
        <Sparkle className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]" />
        
        <div className="relative z-10 max-w-[900px] xl:max-w-[1100px]">
          <h2 className="font-noto-serif-narrow ds-h1 text-[#1C3C8C]">
            '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Выступи как опытный арт-директор и проведи визуальный аудит текущего макета.\n\nЦель проекта:\n\n[опиши задачу сайта]\n\nБренд и позиционирование:\n\n[опиши бренд]\n\nЦелевая аудитория:\n\n[опиши аудиторию]\n\nЖелаемое впечатление:\n\n[например: современный, технологичный, надёжный, премиальный]\n\nПроверь:\n\n1. Визуальную иерархию страницы.\n\n2. Первый экран и качество визуального позиционирования.\n\n3. Фокус внимания пользователя.\n\n4. Композицию и баланс блоков.\n\n5. Сетку, выравнивания и отступы.\n\n6. Единство типографики.\n\n7. Размеры, начертания и контраст шрифтов.\n\n8. Цветовую палитру и контрастность.\n\n9. Согласованность кнопок, карточек, полей и иконок.\n\n10. Качество и уместность изображений.\n\n11. Соответствие визуального стиля целевой аудитории.\n\n12. Визуальное доверие к бренду.\n\n13. Слишком перегруженные или пустые участки.\n\n14. Повторяющиеся и визуально слабые компоненты.\n\n15. Адаптацию дизайна под мобильные устройства.\n\n16. Состояния hover, focus, active, disabled и error.\n\n17. Читаемость текста поверх изображений.\n\n18. Доступность интерфейса, включая контраст и заметность фокуса.\n\n19. Единообразие визуального языка на всех страницах.\n\n20. Возможные проблемы при передаче макета разработчику.\n\nПравила:\n\n- Оценивай не личный вкус, а соответствие цели, бренду и пользовательскому сценарию.\n\n- Отделяй критические проблемы от субъективных пожеланий.\n\n- Не меняй дизайн автоматически.\n\n- Для каждой рекомендации указывай причину и ожидаемый результат.\n\n- Если предлагаешь новый цвет, размер или отступ, укажи конкретное значение.\n\n- Не выдумывай элементы, которых нет в проекте.\n\nПосле проверки подготовь отчёт:\n\n# Арт-дирекционный аудит\n\n## 1. Краткое резюме\n\n- Общее визуальное качество: от 0 до 100.\n\n- Сила брендинга.\n\n- Читаемость.\n\n- Целостность дизайн-системы.\n\n- Главный визуальный риск.\n\n## 2. Таблица проблем\n\n| Приоритет | Экран или компонент | Проблема | Влияние | Рекомендация |\n\n## 3. Визуальная иерархия\n\nОпиши путь взгляда пользователя от первого экрана до целевого действия.\n\n## 4. Дизайн-система\n\nПроверь:\n\n- цвета;\n\n- шрифты;\n\n- отступы;\n\n- радиусы;\n\n- тени;\n\n- кнопки;\n\n- поля;\n\n- карточки;\n\n- иконки.\n\n## 5. Адаптивность\n\nОтдельно оцени desktop, tablet и mobile.\n\n## 6. Топ-10 визуальных улучшений\n\nДля каждого пункта укажи конкретное изменение и его приоритет.\n\n## 7. План внедрения\n\nРаздели рекомендации на:\n\n- быстрые правки;\n\n- средние изменения;\n\n- полноценный редизайн.
          </h2>
        </div>

        {/* Mobile-only photo tiles with subtle animation - RESTORED from early design */}
        <div className="mt-10 flex w-full justify-center overflow-hidden sm:hidden">
          <ImageReveal
            spread={95}
            leftImage="/images/uslugi-limfodrenazhnyi-massazh.webp"
            middleImage="/images/uslugi-massazh-spiny-i-shei.webp"
            rightImage="/images/uslugi-massazh-golovy.webp"
          />
        </div>
      </div>
    </section>
  );
}
