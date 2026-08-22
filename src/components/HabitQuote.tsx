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
            {"'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Выступи как senior full-stack-разработчик и проведи технический аудит текущего проекта.\n\nСтек проекта:\n\n[укажи используемый стек, если известен]\n\nОсновные функции:\n\n[опиши функциональность]\n\nОграничения:\n\n[например: не менять API, сохранить PostgreSQL, не менять UI]\n\nПроверь:\n\n1. Архитектуру проекта и структуру компонентов.\n\n2. Повторяющийся код.\n\n3. Неиспользуемые файлы, импорты, стили и зависимости.\n\n4. Качество JavaScript/TypeScript-кода.\n\n5. Ошибки в React/Vue-компонентах, если применимо.\n\n6. Управление состоянием.\n\n7. Обработку loading, empty, error и success-состояний.\n\n8. Валидацию данных на клиенте и сервере.\n\n9. Обработку ошибок API.\n\n10. Безопасность пользовательского ввода.\n\n11. XSS, SQL injection, CSRF и утечки секретов.\n\n12. Правильность работы с авторизацией и ролями.\n\n13. Производительность запросов к базе данных.\n\n14. Возможные N+1-запросы.\n\n15. Индексы и оптимизацию PostgreSQL-запросов, если доступна база.\n\n16. Размер JavaScript-бандла.\n\n17. Лишние перерисовки и загрузку компонентов.\n\n18. Изображения, lazy loading и кэширование.\n\n19. Семантическую HTML-разметку.\n\n20. Адаптивность и совместимость с браузерами.\n\n21. Логи, мониторинг и удобство отладки.\n\n22. Готовность проекта к production-деплою.\n\n23. Переменные окружения и конфигурацию.\n\n24. Возможные проблемы CI/CD и сборки.\n\nПравила:\n\n- Сначала проведи аудит и ничего не изменяй.\n\n- Не удаляй и не переписывай код без моего подтверждения.\n\n- Не предлагай оптимизацию, которая ухудшит читаемость или стабильность.\n\n- Для каждой проблемы укажи файл, компонент, функцию или строку, если они доступны.\n\n- Разделяй реальные ошибки, потенциальные риски и рекомендации.\n\n- При предложении изменения показывай безопасный вариант решения.\n\n- Сохраняй существующую бизнес-логику.\n\n- Не раскрывай секреты и не выводи значения ключей доступа.\n\nПосле проверки подготовь отчёт:\n\n# Full-stack технический аудит\n\n## 1. Общая оценка\n\n- Качество архитектуры: от 0 до 10.\n\n- Производительность: от 0 до 10.\n\n- Безопасность: от 0 до 10.\n\n- Поддерживаемость: от 0 до 10.\n\n- Готовность к production: от 0 до 10.\n\n## 2. Критические проблемы\n\n| Приоритет | Файл или компонент | Проблема | Риск | Рекомендуемое решение |\n\n## 3. Frontend-аудит\n\nОпиши проблемы компонентов, состояния, производительности и UI-состояний.\n\n## 4. Backend-аудит\n\nОпиши проблемы API, авторизации, валидации и обработки ошибок.\n\n## 5. Database-аудит\n\nОпиши проблемы запросов, схемы, индексов и производительности PostgreSQL.\n\n## 6. Безопасность\n\nСоставь отдельный список уязвимостей с уровнем риска.\n\n## 7. План оптимизации\n\nРаздели задачи на:\n\n- критические исправления;\n\n- быстрые улучшения;\n\n- рефакторинг;\n\n- долгосрочные улучшения.\n\n## 8. Безопасный порядок внедрения\n\nУкажи, какие изменения можно сделать первыми, чтобы не сломать проект."}
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
