import { useState } from "react";
import { Plus } from "lucide-react";



const items = [
  {
    q: "Впервые: с чего начать?",
    a: "Начнём со знакомства с кабинетом: короткая беседа о самочувствии и целях, а затем — мягкий пробный сеанс, чтобы вы почувствовали формат работы.",
  },
  {
    q: "Как выбрать процедуру?",
    a: "Не обязательно выбирать заранее — на первой встрече мы вместе подберём практику под ваше состояние и запрос.",
  },
  {
    q: "Что надеть и как готовиться?",
    a: "Приходите в удобной одежде. Специальной подготовки не требуется — бельё, полотенца и всё необходимое уже подготовлено в кабинете.",
  },
  {
    q: "Есть ли противопоказания?",
    a: "Да, у каждой практики есть свои ограничения. Перед сеансом мы обязательно уточним состояние здоровья и подберём безопасный вариант работы.",
  },
  {
    q: "Можно при беременности?",
    a: "Некоторые практики допустимы, но требуют согласования с врачом. Расскажите о сроке и самочувствии — подберём мягкий вариант.",
  },
  {
    q: "Как часто можно приходить?",
    a: "Ритм подбирается индивидуально: от разовой поддержки до курса из нескольких сеансов с интервалом в неделю.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ds-card shadow-[var(--shadow-card)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[var(--shadow-card-hover)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 xl:p-7 text-left"
      >
        <span className="font-noto-serif-narrow ds-h3 text-[var(--color-primary)] text-[18px] sm:text-[24px] xl:text-[28px] font-light">
          {q}
        </span>
        <span
          className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-[var(--radius-button)] bg-[var(--color-bg-main)] border border-[var(--color-border)] flex items-center justify-center transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-primary)]" strokeWidth={2} />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 xl:px-7 pb-5 sm:pb-6 xl:pb-7 text-[var(--color-text-main)] max-w-[720px] text-[15px] sm:text-[16px] leading-[1.6]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-[120px] bg-[var(--color-bg-main)] py-[var(--space-8)] xl:py-[var(--space-10)]">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 items-stretch">
        {/* Left column */}
        <div className="flex flex-col items-center xl:items-start text-center xl:text-left h-full">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
            style={{
              borderRadius: "4px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            FAQs
          </span>
          <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[var(--color-primary)] max-w-[520px] mx-auto xl:mx-0">
            Отвечаю на&nbsp;самые важные вопросы
          </h2>

          <div className="mt-8 xl:mt-auto ds-card p-6 sm:p-7 w-full xl:w-[80%] mx-auto xl:mx-0 text-left bg-[var(--color-bg-card)] shadow-[var(--shadow-card)]">
            <img
              src="/images/tatyana-photo.webp"
              alt="Татьяна Злобина"
              className="h-[90px] w-[70px] xl:h-[110px] xl:w-[85px] rounded-[var(--radius-sm)] border border-[var(--color-border)] object-cover"
            />
            <h3 className="font-noto-serif-narrow mt-6 text-[22px] sm:text-[28px] font-light text-[var(--color-primary)]">
              Татьяна Злобина
            </h3>
            <p className="mt-3 body-text text-[#566A93]">
              Мастер кабинета, специалист по&nbsp;оздоровительным практикам
            </p>
            <p className="mt-6 body-text text-[#1C3C8C]">
              Остались вопросы? Напишите мне&nbsp;— я&nbsp;всё подробно расскажу.
            </p>
            <a
              href="https://max.ru/u/f9LHodD0cOLS1ZC9ThcQkVLRVzcK-MbYZ7JVAg8PC5Tx9LyihgOVdPnzaxM"
              target="_blank"
              rel="noopener noreferrer"
              className="ds-button-primary mt-6 w-full inline-flex items-center justify-center"
            >
              Получить консультацию
            </a>
          </div>
        </div>

        {/* Right column: accordion card */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {items.map((it) => (
            <FaqItem key={it.q} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
