import { ArrowUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import Logo from "@/components/Logo";
import { RatingBlock } from "@/components/RatingBlock";

export type FooterNavItem = { label: string; href?: string; to?: string };

const navItems: FooterNavItem[] = [
  { label: "Услуги", href: "/#services" },
  { label: "Преимущества", href: "/#advantages" },
  { label: "Программы", href: "/#programs" },
  { label: "Обо мне", href: "/#obrazovanie" },
  { label: "Вопросы", href: "/#faq" },
  { label: "Контакты", href: "/#contacts" },
];



const ADDRESS =
  "Приморский край, п. Трудовое, ул. Лермонтова, 46";


function scrollToTop() {
  const start = window.scrollY || document.documentElement.scrollTop;
  if (start === 0) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) {
    window.scrollTo(0, 0);
    return;
  }

  const duration = Math.min(1200, Math.max(500, start * 0.5));
  const startTime = performance.now();
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function Footer({ items = navItems }: { items?: FooterNavItem[] }) {
  return (
    <>
      <footer id="contacts" className="scroll-mt-[120px] bg-[#EFF6FF] pt-[60px] xl:pt-[140px] pb-8">
      <div className="container-1900">
        {/* Top card: map + contacts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* Map */}
          <div className="relative rounded-[12px] overflow-hidden border border-[#daebff] bg-white min-h-[320px] xl:min-h-[440px] ds-bento-shadow">
            <iframe
              title="Карта — расположение кабинета"
              src="https://yandex.ru/map-widget/v1/org/sedmoye_nebo/130811843218/?ll=132.072118%2C43.306027&z=16"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>

          {/* Contacts */}
          <div className="flex flex-col justify-between gap-8 ds-card ds-bento-shadow p-5 xl:p-[30px]">
            <div>
              <h2 className="font-noto-serif-narrow ds-h2 text-[#1c3c8c] tracking-[0.01em]">
                Как найти кабинет
              </h2>
              <p className="mt-4 xl:mt-5 body-text text-[#566A93] max-w-[440px]">
                Уютное пространство в центре посёлка Трудового, где можно прийти чуть раньше, выдохнуть и спокойно настроиться на сеанс.
              </p>
            </div>

            <ul className="flex flex-col gap-5 xl:gap-6">
              <li className="text-[#1c3c8c] leading-[150%] font-light">
                <div className="body-text text-[#566A93] mb-2">Адрес</div>
                <div className="body-text text-[#1c3c8c]">{ADDRESS}</div>
              </li>
              <li className="text-[#1c3c8c] leading-[150%] font-light">
                <div className="body-text text-[#566A93] mb-2">Телефон</div>
                <a href="tel:+79242324611" className="body-text text-[#1c3c8c] hover:opacity-70 transition-opacity text-link-active">
                  +7 924 232 46 11
                </a>

              </li>
              <li className="text-[#1c3c8c] leading-[150%] font-light">
                <div className="body-text text-[#566A93] mb-2">Режим работы</div>
                <div className="body-text text-[#1c3c8c]">пн-сб с 9:00 до 22:00</div>
              </li>
            </ul>

            <RatingBlock className="hidden xl:flex" />

            <a
              href="https://n2418813.yclients.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center w-full"
            >
              Записаться онлайн
            </a>
          </div>
        </div>

        {/* Bottom band */}
        <div className="mt-5 ds-card ds-bento-shadow p-5 xl:p-[30px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brand */}
            <div>
              <Link to="/" aria-label="На главную" className="inline-flex h-12 items-center hover:opacity-70 transition-opacity logo-link-active">
                <Logo className="h-full w-auto" />
              </Link>

              <p className="mt-4 body-text text-[#566A93] max-w-[320px]">
                Кабинет оздоровительных практик Татьяны Злобиной.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <a
                  href="https://max.ru/u/f9LHodD0cOLS1ZC9ThcQkVLRVzcK-MbYZ7JVAg8PC5Tx9LyihgOVdPnzaxM"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Макс — мессенджер Max"
                  className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#daebff] bg-[#EFF6FF] text-[#1c3c8c] hover:bg-[#DAEBFF] transition-colors icon-btn-active"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 720 720"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Nav */}
            <div>
              
              <ul className="mt-4 flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link
                        to={item.to}
                        className="body-text text-[#1c3c8c] hover:opacity-70 transition-opacity text-link-active"
                      >

                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="body-text text-[#1c3c8c] hover:opacity-70 transition-opacity text-link-active"
                      >

                        {item.label}
                      </a>
                    )}
                  </li>
                ))}

              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Наверх"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#daebff] bg-[#EFF6FF] text-[#1c3c8c] hover:bg-[#DAEBFF] transition-colors shrink-0 icon-btn-active"
            >

              <ArrowUp size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-5 pt-5 border-t border-[#daebff] flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
            <p className="text-[13px] text-[#566A93] font-light">
              © {new Date().getFullYear()} Седьмое небо. Все права защищены.
            </p>
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-3 xl:gap-6">
              <a
                href="/privacy-policy"
                className="text-[13px] text-[#566A93] hover:opacity-70 transition-opacity font-light text-link-active"
              >

                Политика конфиденциальности
              </a>
              <p className="text-[13px] text-[#566A93] font-light">
                Информация не является публичной офертой
              </p>
            </div>
          </div>

        </div>
      </div>
      </footer>

      <div className="bg-[#EFF6FF] border-t border-[#daebff] pt-5 !pb-0 xl:!pb-12 xl:pt-5 footer-bottom-padding">
        <div className="container-1900 flex justify-center">
          <p className="text-[13px] text-[#1c3c8c]/80 font-light">
            Сайт разработан —{"'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Проведи аудит и предоставь отчет! Выступи как технический SEO-специалист и проведи полный SEO-аудит текущего проекта.\n\nЦель проекта:\n\n[опиши нишу, услугу или товар]\n\nЦелевая аудитория:\n\n[опиши целевую аудиторию]\n\nОсновной регион продвижения:\n\n[город, страна или несколько регионов]\n\nОсновные ключевые запросы:\n\n[вставь ключевые слова]\n\nПроверь:\n\n1. Структуру страниц и URL.\n\n2. Наличие и уникальность title и meta description.\n\n3. Корректность H1, H2 и иерархии заголовков.\n\n4. Логику размещения ключевых слов.\n\n5. Соответствие текста поисковому намерению пользователя.\n\n6. Дублирование заголовков, мета-тегов и контента.\n\n7. Canonical, robots.txt и sitemap.xml, если они предусмотрены.\n\n8. Индексацию важных страниц.\n\n9. Внутреннюю перелинковку.\n\n10. Alt-тексты изображений.\n\n11. Schema.org и структурированные данные.\n\n12. Open Graph и превью ссылок в социальных сетях.\n\n13. Мобильную версию.\n\n14. Скорость загрузки и возможные проблемы Core Web Vitals.\n\n15. Семантическую HTML-разметку.\n\n16. Доступность элементов для поисковых роботов и пользователей.\n\n17. Локальные SEO-сигналы, если проект ориентирован на конкретный город.\n\n18. Ошибки, которые могут препятствовать индексации.\n\nПравила:\n\n- Сначала только проанализируй проект.\n\n- Не изменяй код, тексты или структуру без моего отдельного подтверждения.\n\n- Если данных недостаточно, укажи, чего именно не хватает.\n\n- Не выдумывай результаты тестов, если ты не можешь их реально выполнить.\n\n- Для каждого обнаруженного нарушения укажи конкретный файл, компонент или блок, если это возможно.\n\n- Разделяй критические, важные и второстепенные проблемы.\n\nПосле проверки подготовь отчёт в формате:\n\n# SEO-аудит\n\n## 1. Общая оценка\n\n- SEO-состояние проекта: от 0 до 100.\n\n- Краткий вывод.\n\n- Главные риски.\n\n## 2. Таблица проблем\n\n| Приоритет | Проблема | Где обнаружена | Почему это важно | Как исправить |\n\n## 3. Что уже сделано хорошо\n\n- ...\n\n## 4. Технические рекомендации\n\n- ...\n\n## 5. Рекомендации по контенту\n\n- ...\n\n## 6. План исправлений\n\nРаздели задачи на:\n\n- Срочно.\n\n- В течение недели.\n\n- В дальнейшем.\n\n## 7. Итог\n\nУкажи 5 наиболее важных действий в правильном порядке."}
            <a
              href="https://cubik-design.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1c3c8c]/80 hover:text-[#1c3c8c] transition-colors font-light"
            >
              CUBIK
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
