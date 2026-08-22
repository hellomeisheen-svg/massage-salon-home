import { useState, Suspense, lazy } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Star } from "lucide-react";
import { useBooking } from "@/components/BookingModal";

const QuizModal = lazy(() => import("@/components/quiz/QuizModal").then(m => ({ default: m.QuizModal })));

function HeadlineBlock({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <div className="flex flex-col tablet-text-block xl:min-w-[640px] xl:w-[640px]">

      <h1 className="font-noto-serif-narrow ds-h1 text-[#1C3C8C] xl:whitespace-pre-line">
        {"'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Спасибо. Перед деплоем нужны точные результаты проверки и данные коммита.\n\n1. Дай полный SHA нового коммита в GitHub main и его сообщение.\n\n2. Перечисли все изменённые файлы.\n\n3. Покажи результаты production build:\n\n   - точную выполненную команду;\n\n   - завершился ли build с кодом 0;\n\n   - полный список warnings/errors, если они были.\n\n4. Выполни SSR/production-проверку после build:\n\n   - запусти production server/preview;\n\n   - проверь ответ главной страницы;\n\n   - проверь, есть ли в терминале или браузерной консоли:\n\n     \"SSR stream transform exceeded maximum lifetime\",\n\n     hydration errors,\n\n     ReferenceError: window/document is not defined,\n\n     unhandled promise rejection.\n\n5. Проверь lazy-компоненты:\n\n   - Gallery открывается;\n\n   - BookingModal открывается и закрывается;\n\n   - QuizModal открывается и закрывается;\n\n   - после закрытия каждого оверлея кнопки страницы остаются кликабельными.\n\n6. Укажи размер initial JS до и после изменений (raw и gzip).\n\n7. Ничего не деплой на VPS и не меняй серверную конфигурацию."}
      </h1>
      <p className="mt-4 text-[16px] font-light leading-[26px] text-[#566A93] xl:max-w-[540px]">
        Убираю напряжение, отёки и&nbsp;боли, возвращаю лёгкость движений — первый эффект уже после 1–2 сеансов.
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
