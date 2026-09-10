import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";
import type { BlogArticle } from "@/data/blog-articles";

const blogNav = [
  { label: "Услуги", href: "/#services" },
  { label: "Преимущества", href: "/#advantages" },
  { label: "Программы", href: "/#programs" },
  { label: "Обо мне", href: "/#obrazovanie" },
  { label: "Вопросы", href: "/#faq" },
  { label: "Блог", href: "/#blog" },
  { label: "Контакты", href: "/#contacts" },
];

const blogFooterNav = [
  { label: "Главная", to: "/" },
  ...blogNav.filter((i) => i.label !== "Контакты"),
];

type Section = { label: string; blocks: string[] };

function parseBody(body: string): { intro: string[]; sections: Section[] } {
  const blocks = body.split("\n\n");
  const intro: string[] = [];
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const block of blocks) {
    if (block.startsWith("## ")) {
      if (current) sections.push(current);
      current = { label: block.slice(3), blocks: [] };
    } else if (current) {
      current.blocks.push(block);
    } else {
      intro.push(block);
    }
  }
  if (current) sections.push(current);
  return { intro, sections };
}

function Block({ block }: { block: string }) {
  if (block.startsWith("### ")) return <h3 className="mt-6 font-heading text-[22px] leading-[1.2] text-[#1C3C8C]">{block.slice(4)}</h3>;
  if (block.startsWith("- ")) return <ul className="mt-4 list-disc pl-6">{block.split("\n").map((item, i) => <li key={i} className="mt-1">{item.slice(2)}</li>)}</ul>;
  if (/^\d+\. /.test(block)) return <ol className="mt-4 list-decimal pl-6">{block.split("\n").map((item, i) => <li key={i} className="mt-1">{item.replace(/^\d+\. /, "")}</li>)}</ol>;
  return <p className="mt-4">{block}</p>;
}

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  const { intro, sections } = parseBody(article.body);

  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header items={blogNav} />
        <main className="ds-section">
          <div className="container-1900">
            <nav aria-label="Хлебные крошки" className="text-[14px] text-[#566A93]">
              <Link to="/" className="hover:opacity-70 transition-opacity">
                Главная
              </Link>
              <span className="px-2">/</span>
              <span className="text-[#1C3C8C]">Статья</span>
            </nav>
          </div>

          <ArticleLayout article={article} intro={intro} sections={sections} />
        </main>
        <Footer items={blogFooterNav} />
      </div>
    </BookingProvider>
  );
}

function ArticleLayout({ article, intro, sections }: { article: BlogArticle; intro: string[]; sections: Section[] }) {
  const [active, setActive] = useState(-1);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const anchor = window.innerHeight * 0.35;
      let current = -1;
      refs.current.forEach((el: HTMLDivElement | null, i: number) => {
        if (el && el.getBoundingClientRect().top <= anchor) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = refs.current[i];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const nav = (
    <nav className="flex w-full flex-col gap-3 items-start">
      {sections.map((s, i) => {
        const isActive = i === active;
        return (
          <button
            key={s.label}
            type="button"
            onClick={() => goTo(i)}
            aria-current={isActive}
            className="flex items-center gap-3 text-left group/nav"
          >
            <span
              className={`h-2 w-2 rounded-[12px] transition-colors ${
                isActive ? "bg-[#1C3C8C]" : "bg-[#B7C5E3] group-hover/nav:bg-[#1C3C8C]/50"
              }`}
            />
            <span
              className={`text-[16px] transition-colors ${
                isActive ? "text-[#1C3C8C]" : "text-[#566A93] group-hover/nav:text-[#1C3C8C]"
              }`}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <section className="ds-section">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-20 items-start relative">
        {/* Left sticky sidebar */}
        <div className="self-start xl:sticky xl:top-[124px] flex flex-col items-center xl:items-start text-center xl:text-left z-10">
          <div className="mt-8 flex items-center gap-3">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
              style={{
                borderRadius: "12px",
                backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
              }}
            >
              {article.tag}
            </span>
            <time dateTime={article.date} className="text-[14px] text-[#9BB3D6]">
              {article.formattedDate}
            </time>
          </div>

          <h1 className="mt-6 font-heading ds-h2 text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0">
            {article.heading ?? article.title}
          </h1>

          <div className="mt-5 border-y border-[#DAEBFF] py-4 text-[14px] text-[#566A93] text-left max-w-[520px] w-full">
            <p><strong>Об авторе:</strong> {article.author ?? "Информация об авторе не указана"}</p>
            <p className="mt-1"><strong>Дата публикации:</strong> {article.formattedDate}</p>
            {article.updatedDate && <p className="mt-1"><strong>Дата обновления:</strong> {article.formattedDate}</p>}
          </div>

          <div className="mt-8 hidden xl:block w-full max-w-[520px] text-left">
            {nav}
          </div>
        </div>

        {/* Right content card */}
        <div className="flex flex-col gap-4">
          <div className="ds-bento-shadow ds-card p-6 sm:p-8 xl:p-10">
            {/* Intro */}
            <div className="text-[#566A93] text-[16px] leading-[1.7]">
              {intro.map((block, i) => <Block key={i} block={block} />)}
            </div>

            {/* Sections */}
            <div className="mt-10 flex flex-col gap-10 sm:gap-12">
              {sections.map((s, i) => (
                <div
                  key={s.label}
                  ref={(el) => { refs.current[i] = el; }}
                  className="scroll-mt-[140px]"
                >
                  <h2 className="font-heading text-[26px] sm:text-[28px] leading-[1.2] text-[#1C3C8C]">
                    {s.label}
                  </h2>
                  <div className="mt-5 text-[#566A93] text-[16px] leading-[1.7]">
                    {s.blocks.map((block, j) => <Block key={j} block={block} />)}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 rounded-[12px] border border-[#DAEBFF] bg-white/60 p-4 text-[14px] leading-[1.6]">
              Информация на странице носит ознакомительный характер и не заменяет консультацию врача.
            </p>
          </div>

          {/* Mobile nav */}
          <div className="xl:hidden ds-bento-shadow ds-card p-5 sm:p-6">
            <p className="font-heading text-[18px] text-[#1C3C8C] mb-4">Содержание</p>
            {nav}
          </div>

          <Link to="/" className="inline-flex items-center gap-2 text-[15px] font-medium text-[#1C3C8C] transition-opacity hover:opacity-65">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
            Вернуться на главную
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogArticlePage;
