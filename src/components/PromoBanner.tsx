import { useBooking } from "@/components/BookingModal";
import type { ReactNode } from "react";

interface PromoBannerProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  buttonText?: string;
}

const defaultTitle = "'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Выступи как опытный арт-директор и проведи визуальный аудит текущего макета.\n\nЦель проекта:\n\n[опиши задачу сайта]\n\nБренд и позиционирование:\n\n[опиши бренд]\n\nЦелевая аудитория:\n\n[опиши аудиторию]\n\nЖелаемое впечатление:\n\n[например: современный, технологичный, надёжный, премиальный]\n\nПроверь:\n\n1. Визуальную иерархию страницы.\n\n2. Первый экран и качество визуального позиционирования.\n\n3. Фокус внимания пользователя.\n\n4. Композицию и баланс блоков.\n\n5. Сетку, выравнивания и отступы.\n\n6. Единство типографики.\n\n7. Размеры, начертания и контраст шрифтов.\n\n8. Цветовую палитру и контрастность.\n\n9. Согласованность кнопок, карточек, полей и иконок.\n\n10. Качество и уместность изображений.\n\n11. Соответствие визуального стиля целевой аудитории.\n\n12. Визуальное доверие к бренду.\n\n13. Слишком перегруженные или пустые участки.\n\n14. Повторяющиеся и визуально слабые компоненты.\n\n15. Адаптацию дизайна под мобильные устройства.\n\n16. Состояния hover, focus, active, disabled и error.\n\n17. Читаемость текста поверх изображений.\n\n18. Доступность интерфейса, включая контраст и заметность фокуса.\n\n19. Единообразие визуального языка на всех страницах.\n\n20. Возможные проблемы при передаче макета разработчику.\n\nПравила:\n\n- Оценивай не личный вкус, а соответствие цели, бренду и пользовательскому сценарию.\n\n- Отделяй критические проблемы от субъективных пожеланий.\n\n- Не меняй дизайн автоматически.\n\n- Для каждой рекомендации указывай причину и ожидаемый результат.\n\n- Если предлагаешь новый цвет, размер или отступ, укажи конкретное значение.\n\n- Не выдумывай элементы, которых нет в проекте.\n\nПосле проверки подготовь отчёт:\n\n# Арт-дирекционный аудит\n\n## 1. Краткое резюме\n\n- Общее визуальное качество: от 0 до 100.\n\n- Сила брендинга.\n\n- Читаемость.\n\n- Целостность дизайн-системы.\n\n- Главный визуальный риск.\n\n## 2. Таблица проблем\n\n| Приоритет | Экран или компонент | Проблема | Влияние | Рекомендация |\n\n## 3. Визуальная иерархия\n\nОпиши путь взгляда пользователя от первого экрана до целевого действия.\n\n## 4. Дизайн-система\n\nПроверь:\n\n- цвета;\n\n- шрифты;\n\n- отступы;\n\n- радиусы;\n\n- тени;\n\n- кнопки;\n\n- поля;\n\n- карточки;\n\n- иконки.\n\n## 5. Адаптивность\n\nОтдельно оцени desktop, tablet и mobile.\n\n## 6. Топ-10 визуальных улучшений\n\nДля каждого пункта укажи конкретное изменение и его приоритет.\n\n## 7. План внедрения\n\nРаздели рекомендации на:\n\n- быстрые правки;\n\n- средние изменения;\n\n- полноценный редизайн.";
const defaultSubtitle =
  "Первый визит со\u00A0скидкой 20%. Подберём формат под\u00A0ваше состояние и\u00A0обсудим всё заранее\u00A0— без\u00A0спешки и\u00A0шаблонов.";

export function PromoBanner({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  buttonText = "Записаться",
}: PromoBannerProps) {
  const { openBooking } = useBooking();
  return (
    <section className="bg-brand-surface ds-section overflow-hidden">
      <div className="container-1900 px-4 sm:px-5">
        <div
          className="relative overflow-hidden rounded-[12px] border px-6 py-14 xl:px-24 xl:py-[60px] ds-bento-shadow"
          style={{ backgroundColor: "#DAEBFF", borderColor: "#daebff" }}
        >
          <img
            src="/images/banner-clouds.svg"
            alt="Декоративные облака"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full -translate-y-[10px] select-none"
          />

          <img
            src="/images/banner-clouds-bottom.svg"
            alt="Декоративные элементы фона"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden w-full translate-y-[120px] select-none xl:block"
          />
          <img
            src="/images/banner-ellipse.svg"
            alt="Фоновый градиент"
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 z-[1] hidden h-full w-[140%] max-w-none -translate-x-1/2 select-none xl:block xl:w-[995px]"
            style={{ objectFit: "fill" }}
          />

          {/* Decorative background sparkles */}
          {[
            "absolute left-[6%] top-[18%] h-4 w-4 xl:h-5 xl:w-5",
            "absolute left-[14%] bottom-[22%] h-3 w-3 xl:h-4 xl:w-4",
            "absolute right-[8%] top-[24%] h-5 w-5 xl:h-6 xl:w-6",
            "absolute right-[14%] bottom-[18%] h-3 w-3 xl:h-4 xl:w-4",
            "absolute left-[42%] top-[10%] h-3 w-3 xl:h-4 xl:w-4",
            "absolute right-[40%] bottom-[12%] h-4 w-4 xl:h-5 xl:w-5",
          ].map((cls, i) => (
            <svg
              key={i}
              className={`${cls} pointer-events-none z-[2] text-white/70`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
            </svg>
          ))}

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="font-noto-serif-narrow ds-h2 text-brand-ink">
              {title}
            </h2>

            <p className="mt-4 max-w-[600px] body-text text-brand-ink/60">
              {subtitle}
            </p>

            <div className="mt-8 w-full sm:mt-10 sm:w-auto">
              <button
                type="button"
                onClick={() => openBooking()}
                className="btn-primary w-full sm:w-[250px] px-16"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
