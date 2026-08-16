import { useState } from "react";
import { Star } from "lucide-react";
import { QuizModal } from "@/components/quiz/QuizModal";

const YANDEX_MAPS_URL =
  "https://yandex.ru/maps/org/sedmoye_nebo/130811843218/reviews/";

function RatingBlock() {
  return (
    <a
      href={YANDEX_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-fit items-center gap-3.5 rounded-[15px] border border-[#daebff] bg-white px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:opacity-85 ds-bento-shadow"
    >
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#A2CFFE]/15">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-[#A2CFFE]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-noto-serif-narrow text-[24px] font-bold leading-none tracking-tight text-[#1C3C8C]">
            4,7
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-[14px] w-[14px] fill-[#A2CFFE] text-[#A2CFFE]"
              />
            ))}
          </div>
        </div>
        <span className="text-[12px] font-medium leading-none text-[#566A93]">
          Рейтинг организации в Яндексе
        </span>
      </div>
    </a>
  );
}

function HeadlineBlock({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <div className="flex flex-col tablet-text-block xl:min-w-[640px] xl:w-[640px]">

      <h1 className="font-noto-serif-narrow ds-h1 text-[#1C3C8C] xl:whitespace-pre-line">
        {"Массаж, гирудотерапия и\u00a0банки во\u00a0Владивостоке"}
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
          Онлайн запись
        </a>
        <button
          type="button"
          onClick={onOpenQuiz}
          className="btn-secondary w-full sm:w-[280px] xl:w-[250px] whitespace-nowrap"
        >
          Подобрать программу
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
        <div className="flex min-h-0 flex-col ds-card ds-bento-shadow p-5 sm:min-h-[520px] sm:p-6 xl:min-h-0 xl:p-10">
          <RatingBlock />
          <div className="mt-[100px] pt-0 sm:mt-[140px] xl:mt-auto xl:pt-[140px]">
            <HeadlineBlock onOpenQuiz={() => setIsQuizOpen(true)} />
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-[420px] overflow-hidden rounded-[12px] border border-[#daebff] ds-bento-shadow sm:h-[520px] xl:h-auto xl:min-h-0">
          <img
            className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-top sm:object-center"
            alt="Оздоровительные процедуры"
            src="/images/hero-portrait-solid.webp"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </main>
  );
}
