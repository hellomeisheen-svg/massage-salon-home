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
      <div className="hero-card-actions mt-auto pt-8 xl:mt-[30px] xl:pt-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
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
    </div>

  );
}

export function Hero() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        {/* Content card */}
        <div className="ds-bento-shadow flex min-h-0 flex-col ds-card p-5 sm:min-h-[520px] sm:p-6 xl:min-h-0 xl:p-10 hero-bento-card">
          <div className="hero-breadcrumb-slot xl:hidden" aria-hidden="true" />
          
          <div className="mt-8 mb-8 flex flex-col items-start text-left hero-specialist-block xl:mt-0">
            <img
              src="/images/tatyana-photo.webp"
              alt="Татьяна Злобина"
              className="h-[80px] w-[62px] xl:h-[110px] xl:w-[85px] rounded-[12px] border border-[#daebff] ds-bento-shadow object-cover"
            />
            <h3 className="font-noto-serif-narrow mt-4 text-[22px] sm:text-[24px] font-bold text-[#1C3C8C] xl:mt-6 xl:ds-h4 xl:text-[28px]">
              Татьяна Злобина
            </h3>
            <p className="mt-2 body-text text-[#566A93] xl:mt-3">
              Мастер кабинета, специалист<br />по{"\u00A0"}оздоровительным практикам
            </p>
          </div>
          
          <div className="hero-service-content">
            <div className="service-badge-slot" aria-hidden="true" />
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
