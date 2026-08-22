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
      "absolute left-0 top-[6%] sm:left-[2%] sm:top-[80px] xl:left-[60px] xl:top-[110px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover shadow-quote-photo",
    delay: "0s",
    rot: "-3deg",
  },
  {
    src: "/images/uslugi-massazh-golovy.webp",
    className:
      "absolute right-0 top-[5%] sm:right-[2%] sm:top-[80px] xl:right-[60px] xl:top-[110px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover shadow-quote-photo",
    delay: "0.2s",
    rot: "3deg",
  },
  {
    src: "/images/uslugi-massazh-spiny-i-shei.webp",
    className:
      "absolute left-[8%] bottom-[6%] sm:left-[10%] sm:bottom-[15px] xl:left-[140px] xl:bottom-[20px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover shadow-quote-photo",
    delay: "0.4s",
    rot: "2deg",
  },
  {
    src: "/images/uslugi-girudoterapiya.webp",
    className:
      "absolute right-[8%] bottom-[8%] sm:right-[10%] sm:bottom-[15px] xl:right-[140px] xl:bottom-[20px] h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[85px] xl:w-[85px] rounded-[12px] object-cover shadow-quote-photo",
    delay: "0.6s",
    rot: "-2deg",
  },
];


export function QuoteBlock() {
  return (
    <section className="relative bg-[#EFF6FF] pt-[60px] pb-[60px] sm:pt-[140px] sm:pb-[180px] xl:pt-[180px] xl:pb-[140px] overflow-hidden">
      {/* Decorative photos — constrained to container width */}
      <div className="container-1900 absolute inset-0 left-1/2 -translate-x-1/2 hidden sm:block pointer-events-none">
        <div className="relative w-full h-full">
          {decoImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt="'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Проведи аудит и предоставь отчет! Выступи как технический SEO-специалист и проведи полный SEO-аудит текущего проекта.\n\nЦель проекта:\n\n[опиши нишу, услугу или товар]\n\nЦелевая аудитория:\n\n[опиши целевую аудиторию]\n\nОсновной регион продвижения:\n\n[город, страна или несколько регионов]\n\nОсновные ключевые запросы:\n\n[вставь ключевые слова]\n\nПроверь:\n\n1. Структуру страниц и URL.\n\n2. Наличие и уникальность title и meta description.\n\n3. Корректность H1, H2 и иерархии заголовков.\n\n4. Логику размещения ключевых слов.\n\n5. Соответствие текста поисковому намерению пользователя.\n\n6. Дублирование заголовков, мета-тегов и контента.\n\n7. Canonical, robots.txt и sitemap.xml, если они предусмотрены.\n\n8. Индексацию важных страниц.\n\n9. Внутреннюю перелинковку.\n\n10. Alt-тексты изображений.\n\n11. Schema.org и структурированные данные.\n\n12. Open Graph и превью ссылок в социальных сетях.\n\n13. Мобильную версию.\n\n14. Скорость загрузки и возможные проблемы Core Web Vitals.\n\n15. Семантическую HTML-разметку.\n\n16. Доступность элементов для поисковых роботов и пользователей.\n\n17. Локальные SEO-сигналы, если проект ориентирован на конкретный город.\n\n18. Ошибки, которые могут препятствовать индексации.\n\nПравила:\n\n- Сначала только проанализируй проект.\n\n- Не изменяй код, тексты или структуру без моего отдельного подтверждения.\n\n- Если данных недостаточно, укажи, чего именно не хватает.\n\n- Не выдумывай результаты тестов, если ты не можешь их реально выполнить.\n\n- Для каждого обнаруженного нарушения укажи конкретный файл, компонент или блок, если это возможно.\n\n- Разделяй критические, важные и второстепенные проблемы.\n\nПосле проверки подготовь отчёт в формате:\n\n# SEO-аудит\n\n## 1. Общая оценка\n\n- SEO-состояние проекта: от 0 до 100.\n\n- Краткий вывод.\n\n- Главные риски.\n\n## 2. Таблица проблем\n\n| Приоритет | Проблема | Где обнаружена | Почему это важно | Как исправить |\n\n## 3. Что уже сделано хорошо\n\n- ...\n\n## 4. Технические рекомендации\n\n- ...\n\n## 5. Рекомендации по контенту\n\n- ...\n\n## 6. План исправлений\n\nРаздели задачи на:\n\n- Срочно.\n\n- В течение недели.\n\n- В дальнейшем.\n\n## 7. Итог\n\nУкажи 5 наиболее важных действий в правильном порядке."
              width={512}
              height={512}
              loading="lazy"
              className={`deco-photo ${img.className}`}
              style={{
                ["--deco-delay" as string]: img.delay,
                ["--deco-rot" as string]: img.rot,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-1900 relative z-10 flex flex-col items-center sm:px-5 text-center">
        <Sparkle className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]" />
        <h2 className="font-noto-serif-narrow max-w-none sm:max-w-[900px] text-center xl:w-[min(calc(100%-160px),1250px)] xl:max-w-[1250px] xl:mx-auto ds-h1 text-[#1C3C8C]">
          «Иногда достаточно тишины и&nbsp;бережного внимания, чтобы почувствовать себя лучше»
        </h2>

        <div className="mt-6 hidden sm:flex xl:hidden flex-col items-center gap-1">
          <div className="font-noto-serif-narrow ds-h4 text-[#1c3c8c]">
            Татьяна Злобина
          </div>
          <p className="text-[16px] font-light leading-[26px] text-[#566A93]">
            Мастер кабинета, специалист по&nbsp;оздоровительным практикам
          </p>
        </div>

        {/* Mobile-only photo tiles with subtle animation */}
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
