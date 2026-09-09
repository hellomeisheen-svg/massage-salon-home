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

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header items={blogNav} />
        <main className="ds-section">
          <div className="container-1900 max-w-[820px]">
            <nav aria-label="Хлебные крошки" className="text-[14px] text-[#566A93]">
              <Link to="/" className="hover:opacity-70 transition-opacity">
                Главная
              </Link>
              <span className="px-2">/</span>
              <span className="text-[#1C3C8C]">Статья</span>
            </nav>

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

            <h1 className="mt-6 font-heading ds-h2 text-[#1C3C8C]">
              {article.heading ?? article.title}
            </h1>

            <div className="mt-5 border-y border-[#DAEBFF] py-4 text-[14px] text-[#566A93]">
              <p><strong>Об авторе:</strong> {article.author ?? "Информация об авторе не указана"}</p>
              <p className="mt-1"><strong>Дата публикации:</strong> {article.formattedDate}</p>
              {article.updatedDate && <p className="mt-1"><strong>Дата обновления:</strong> {article.formattedDate}</p>}
            </div>

            <div className="mt-8 body-text text-[#566A93]">
              <p className="text-[18px] leading-[1.6]">{article.excerpt}</p>
              <ArticleBody body={article.body} />
              <p className="mt-8 rounded-[12px] border border-[#DAEBFF] bg-white/60 p-4 text-[14px] leading-[1.6]">
                Информация на странице носит ознакомительный характер и не заменяет консультацию врача.
              </p>
              <Link to="/girudoterapiya" className="mt-6 inline-flex text-[15px] font-medium text-[#1C3C8C] hover:opacity-70">
                Подробнее о гирудотерапии
              </Link>
            </div>

            <div className="mt-12 border-t border-[#DAEBFF] pt-8">
              <Link to="/" className="inline-flex items-center gap-2 text-[15px] font-medium text-[#1C3C8C] transition-opacity hover:opacity-65">
                <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                Вернуться на главную
              </Link>
            </div>
          </div>
        </main>
        <Footer items={blogFooterNav} />
      </div>
    </BookingProvider>
  );
}

function ArticleBody({ body }: { body: string }) {
  const blocks = body.split("\n\n");
  return (
    <div className="mt-6 text-[16px] leading-[1.7] [&>p]:mt-4 [&>h2]:mt-8 [&>h2]:font-heading [&>h2]:text-[28px] [&>h2]:leading-[1.2] [&>h2]:text-[#1C3C8C] [&>ul]:mt-4 [&>ol]:mt-4 [&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-6 [&>ol]:pl-6">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) return <h2 key={index}>{block.slice(3)}</h2>;
        if (block.startsWith("- ")) return <ul key={index}>{block.split("\n").map((item) => <li key={item}>{item.slice(2)}</li>)}</ul>;
        if (/^\d+\. /.test(block)) return <ol key={index}>{block.split("\n").map((item) => <li key={item}>{item.replace(/^\d+\. /, "")}</li>)}</ol>;
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}

export default BlogArticlePage;
