import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

type Article = {
  tag: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  imageAlt: string;
};

const articles: Article[] = [
  {
    tag: "Восстановление",
    title: "Как понять, что телу нужен отдых",
    excerpt:
      "Тяжесть, усталость и напряжение не всегда проходят после сна. Разбираемся, на какие сигналы стоит обратить внимание.",
    body:
      "Если тело долго остаётся в напряжении, ему может быть сложно самостоятельно перейти в состояние восстановления. Обратите внимание на качество сна, ощущение тяжести, скованность движений и желание постоянно менять положение. Мягкая работа с телом, спокойный ритм и регулярные паузы помогают вернуть ощущение контакта с собой.",
    image: "/images/fresh-linen.webp",
    imageAlt: "Свежие льняные полотенца в кабинете",
  },
  {
    tag: "Уход за собой",
    title: "Почему важен бережный подход",
    excerpt:
      "Оздоровительная практика — это не про силу воздействия, а про точность, внимание и уважение к состоянию человека.",
    body:
      "У каждого человека свой ритм восстановления. Поэтому перед сеансом важно обсудить самочувствие, запрос и ограничения, а во время процедуры — оставаться внимательными к ощущениям. Бережный подход помогает расслабиться глубже и сделать встречу действительно поддерживающей.",
    image: "/images/oils.webp",
    imageAlt: "Масло для массажа",
  },
  {
    tag: "Атмосфера",
    title: "Как подготовиться к первому сеансу",
    excerpt:
      "Несколько простых рекомендаций, чтобы прийти спокойно, не торопиться и получить максимум пользы от встречи.",
    body:
      "Запланируйте небольшой запас времени до и после сеанса, выберите удобную одежду и заранее расскажите о важных особенностях самочувствия. Не нужно готовиться специально или выбирать процедуру самостоятельно: на встрече мы всё обсудим и подберём подходящий формат.",
    image: "/images/ambience.webp",
    imageAlt: "Спокойная атмосфера кабинета",
  },
];

export function Blog() {
  const [activeArticle, setActiveArticle] = useState<number | null>(null);

  return (
    <section id="blog" className="scroll-mt-[120px] bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <div className="flex flex-col items-center text-center xl:items-start xl:text-left">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
            style={{
              borderRadius: "12px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            Блог
          </span>
          <div className="mt-6 flex w-full flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <h2 className="font-heading ds-h2 text-[#1C3C8C] max-w-[620px]">
              Небольшие заметки о теле, заботе и восстановлении
            </h2>
            <p className="body-text max-w-[380px] text-[#566A93] xl:pb-1">
              Простые и понятные рекомендации, которые помогают лучше слышать себя каждый день.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {articles.map((article, index) => {
            const isOpen = activeArticle === index;

            return (
              <article
                key={article.title}
                className="ds-card ds-bento-shadow flex flex-col overflow-hidden border border-[#DAEBFF]"
              >
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  className="h-[210px] w-full object-cover transition-transform duration-500 hover:scale-[1.03] sm:h-[240px]"
                />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#7194C8]">
                    {article.tag}
                  </span>
                  <h3 className="mt-3 font-noto-serif-narrow text-[28px] leading-[1.12] text-[#1C3C8C]">
                    {article.title}
                  </h3>
                  <p className="mt-4 body-text text-[#566A93]">{article.excerpt}</p>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-[#DAEBFF] pt-5 body-text text-[#566A93]">
                        {article.body}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="mt-6 inline-flex w-fit items-center gap-2 text-[15px] font-medium text-[#1C3C8C] transition-opacity hover:opacity-65"
                  >
                    {isOpen ? "Свернуть" : "Читать заметку"}
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4 rotate-180" strokeWidth={1.8} />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Blog;
