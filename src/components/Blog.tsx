import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { blogArticles } from "@/data/blog-articles";

export function Blog() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 1);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [blogArticles.length]);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | undefined;
    if (!el || !card) return;
    const step = card.offsetWidth + 12;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const Controls = ({ className }: { className: string }) => (
    <div className={className}>
      <button
        type="button"
        onClick={() => scroll(-1)}
        disabled={!canPrev}
        aria-label="Предыдущие статьи"
        className="h-12 w-12 rounded-[12px] border border-[#daebff] bg-white flex items-center justify-center text-[#1C3C8C] transition-[background-color,opacity] hover:bg-[#EFF6FF] active:opacity-60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        disabled={!canNext}
        aria-label="Следующие статьи"
        className="h-12 w-12 rounded-[12px] border border-[#daebff] bg-white flex items-center justify-center text-[#1C3C8C] transition-[background-color,opacity] hover:bg-[#EFF6FF] active:opacity-60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );

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

        <Controls className="hidden xl:flex justify-end gap-2 mt-6" />

        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="mt-8 xl:mt-4 flex gap-3 overflow-x-auto scrollbar-none scroll-smooth py-6 px-1"
        >
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group ds-card ds-bento-shadow flex flex-col overflow-hidden border border-[#DAEBFF] flex-[0_0_100%] sm:flex-[0_0_calc((100%-0.75rem)/2)] xl:flex-[0_0_calc((100%-3*0.75rem)/4)] snap-start"
            >
              <div className="h-[160px] w-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  className="h-[160px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#7194C8]">
                  {article.tag}
                </span>
                <h3 className="mt-2 font-noto-serif-narrow text-[20px] leading-[1.15] text-[#1C3C8C]">
                  {article.title}
                </h3>
                <p className="mt-2 body-text text-[#566A93] line-clamp-2">{article.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1C3C8C] transition-opacity group-hover:opacity-70">
                  Читать заметку
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.8} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Controls className="flex xl:hidden justify-center gap-2 mt-6" />
      </div>
    </section>
  );
}

export default Blog;
