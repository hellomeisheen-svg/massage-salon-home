import { useState, Suspense, lazy } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Star } from "lucide-react";
import { useBooking } from "@/components/BookingModal";

const QuizModal = lazy(() => import("@/components/quiz/QuizModal").then(m => ({ default: m.QuizModal })));

function HeadlineBlock({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <div className="flex flex-col tablet-text-block xl:min-w-[640px] xl:w-[640px]">

      <h1 className="font-noto-serif-narrow ds-h1 text-[#1C3C8C] xl:whitespace-pre-line">
        {"Массаж, гирудотерапия и\u00a0вакуум в\u00a0Трудовом"}
      </h1>
      <p className="mt-4 text-[16px] font-light leading-[26px] text-[#566A93] xl:max-w-[540px]">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Выступи как опытный арт-директор и проведи визуальный аудит текущего макета.\n\nЦель проекта:\n\n[опиши задачу сайта]\n\nБренд и позиционирование:\n\n[опиши бренд]\n\nЦелевая аудитория:\n\n[опиши аудиторию]\n\nЖелаемое впечатление:\n\n[например: современный, технологичный, надёжный, премиальный]\n\nПроверь:\n\n1. Визуальную иерархию страницы.\n\n2. Первый экран и качество визуального позиционирования.\n\n3. Фокус внимания пользователя.\n\n4. Композицию и баланс блоков.\n\n5. Сетку, выравнивания и отступы.\n\n6. Единство типографики.\n\n7. Размеры, начертания и контраст шрифтов.\n\n8. Цветовую палитру и контрастность.\n\n9. Согласованность кнопок, карточек, полей и иконок.\n\n10. Качество и уместность изображений.\n\n11. Соответствие визуального стиля целевой аудитории.\n\n12. Визуальное доверие к бренду.\n\n13. Слишком перегруженные или пустые участки.\n\n14. Повторяющиеся и визуально слабые компоненты.\n\n15. Адаптацию дизайна под мобильные устройства.\n\n16. Состояния hover, focus, active, disabled и error.\n\n17. Читаемость текста поверх изображений.\n\n18. Доступность интерфейса, включая контраст и заметность фокуса.\n\n19. Единообразие визуального языка на всех страницах.\n\n20. Возможные проблемы при передаче макета разработчику.\n\nПравила:\n\n- Оценивай не личный вкус, а соответствие цели, бренду и пользовательскому сценарию.\n\n- Отделяй критические проблемы от субъективных пожеланий.\n\n- Не меняй дизайн автоматически.\n\n- Для каждой рекомендации указывай причину и ожидаемый результат.\n\n- Если предлагаешь новый цвет, размер или отступ, укажи конкретное значение.\n\n- Не выдумывай элементы, которых нет в проекте.\n\nПосле проверки подготовь отчёт:\n\n# Арт-дирекционный аудит\n\n## 1. Краткое резюме\n\n- Общее визуальное качество: от 0 до 100.\n\n- Сила брендинга.\n\n- Читаемость.\n\n- Целостность дизайн-системы.\n\n- Главный визуальный риск.\n\n## 2. Таблица проблем\n\n| Приоритет | Экран или компонент | Проблема | Влияние | Рекомендация |\n\n## 3. Визуальная иерархия\n\nОпиши путь взгляда пользователя от первого экрана до целевого действия.\n\n## 4. Дизайн-система\n\nПроверь:\n\n- цвета;\n\n- шрифты;\n\n- отступы;\n\n- радиусы;\n\n- тени;\n\n- кнопки;\n\n- поля;\n\n- карточки;\n\n- иконки.\n\n## 5. Адаптивность\n\nОтдельно оцени desktop, tablet и mobile.\n\n## 6. Топ-10 визуальных улучшений\n\nДля каждого пункта укажи конкретное изменение и его приоритет.\n\n## 7. План внедрения\n\nРаздели рекомендации на:\n\n- быстрые правки;\n\n- средние изменения;\n\n- полноценный редизайн.
      </p>
      <div className="mt-[30px] flex flex-col gap-3 sm:flex-row sm:gap-4">
        <a
          href="https://n2418813.yclients.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-[280px] xl:w-[250px] inline-flex items-center justify-center text-center whitespace-nowrap"
        >
          Записаться онлайн
        </a>
        <button
          type="button"
          onClick={onOpenQuiz}
          className="btn-secondary w-full sm:w-[280px] xl:w-[250px] whitespace-nowrap"
        >
          Подобрать процедуру
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        {/* Content card */}
        <div className="flex flex-col ds-card ds-bento-shadow p-5 min-h-[640px] sm:h-[600px] xl:min-h-0 xl:h-auto sm:p-6 xl:p-10 overflow-hidden">
          <div className="flex items-end text-left gap-4 sm:flex-col sm:items-start sm:gap-0 xl:flex-col xl:items-start xl:gap-0">
            <img
              src="/images/tatyana-photo.webp"
              alt="Татьяна Злобина — мастер оздоровительных практик в кабинете Седьмое небо"
              className="h-[90px] w-[70px] sm:h-[110px] sm:w-[85px] xl:h-[110px] xl:w-[85px] rounded-[12px] border border-[#daebff] ds-bento-shadow object-cover flex-shrink-0"
            />
            <div className="flex flex-col">
              <h3 className="font-noto-serif-narrow mt-0 sm:mt-6 xl:mt-6 ds-h4 text-[#1C3C8C] sm:text-[28px] xl:text-[28px]">
                Татьяна Злобина
              </h3>
              <p className="mt-1 sm:mt-3 xl:mt-3 text-[14px] sm:text-[16px] leading-[1.4] sm:leading-[1.6] body-text text-[#566A93] sm:max-w-none xl:max-w-none">
                Мастер кабинета, специалист<br className="hidden sm:block xl:block" /> по{"\u00A0"}оздоровительным практикам
              </p>
            </div>
          </div>
          <div className="mt-auto xl:mt-auto pt-4 sm:pt-12">
            <HeadlineBlock onOpenQuiz={() => setIsQuizOpen(true)} />
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-[420px] overflow-hidden rounded-[12px] border border-[#daebff] ds-bento-shadow sm:h-[520px] md:h-[600px] xl:h-auto xl:min-h-0">
          <img
            className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-top sm:object-center xl:object-top min-[1400px]:object-center"
            alt="Оздоровительные процедуры в кабинете Седьмое небо (Трудовое)"
            src="/images/hero-portrait-solid.webp"
            loading="eager"
            fetchPriority="high"
            width={1280}
            height={853}
          />

        </div>
      </section>
      <Suspense fallback={null}>
        {isQuizOpen && <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />}
      </Suspense>

    </main>
  );
}
