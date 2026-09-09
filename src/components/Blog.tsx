import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { blogArticles } from "@/data/blog-articles";

export function Blog() {
  return (
    <section id="blog" className="scroll-mt-[120px] bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <div className="flex flex-col items-center text-center">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
            style={{
              borderRadius: "12px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            Блог
          </span>
          <h2 className="font-heading mt-6 ds-h2 text-[#1C3C8C] max-w-[620px]">
            Небольшие заметки о теле, заботе и восстановлении
          </h2>
          <p className="mt-5 body-text max-w-[480px] text-[#566A93]">
            Простые и понятные рекомендации, которые помогают лучше слышать себя каждый день.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogArticles.map((article) => (
            <article
              key={article.slug}
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

                <Link
                  to={`/blog/${article.slug}`}
                  className="mt-6 inline-flex w-fit items-center gap-2 text-[15px] font-medium text-[#1C3C8C] transition-opacity hover:opacity-65"
                >
                  Читать заметку
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
