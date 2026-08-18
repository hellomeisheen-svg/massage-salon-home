import { useState } from "react";
import { RatingBlock } from "@/components/RatingBlock";
import { QuizModal } from "@/components/quiz/QuizModal";


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
          <div className="flex flex-col items-start text-left">
            <div className="h-[120px] w-[110px] shrink-0 overflow-hidden rounded-[15px] border border-[#daebff] bg-white p-0.5">
              <img
                src="/images/tatyana-photo-portrait.webp"
                alt="Татьяна Злобина"
                className="h-full w-full object-cover rounded-[13px]"
              />
            </div>
            <div className="mt-8 flex flex-col items-start gap-4">
              <span className="font-noto-serif-narrow text-[34px] font-medium leading-[1.2] text-[#1C3C8C] sm:text-[42px]">
                Татьяна Злобина
              </span>
              <div className="flex flex-col gap-1.5 text-[18px] font-light leading-snug text-[#566A93] sm:text-[22px]">
                <span>Мастер кабинета, специалист</span>
                <span>по{"\u00A0"}оздоровительным практикам</span>
              </div>
            </div>
          </div>
          <div className="mt-[60px] pt-0 sm:mt-[80px] xl:mt-auto xl:pt-[80px]">
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
