import { createFileRoute } from "@tanstack/react-router";
import { BlogArticlePage } from "@/components/BlogArticlePage";
import { buildSEOHead } from "@/components/SEOHead";
import { blogArticles } from "@/data/blog-articles";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const article = blogArticles.find((a) => a.slug === params.slug);
    const canonicalPath = `/blog/${params.slug}`;
    return buildSEOHead({
      title: article?.seoTitle ?? (article ? `${article.title} — Блог Седьмого неба` : "Статья не найдена — Блог Седьмого неба"),
      description: article?.seoDescription ?? article?.excerpt ?? "",
      canonicalPath,
      ogTitle: article?.title ?? "Блог Седьмого неба",
      ogDescription: article?.seoDescription ?? article?.excerpt ?? "",
      jsonLd: article
        ? [
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Главная", item: "https://7heavenmassage.ru/" },
                { "@type": "ListItem", position: 2, name: "Статья", item: `https://7heavenmassage.ru${canonicalPath}` },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.heading ?? article.title,
              description: article.seoDescription ?? article.excerpt,
              datePublished: article.date,
              dateModified: article.updatedDate ?? article.date,
              author: { "@type": "Organization", name: article.author ?? "Кабинет «Седьмое небо»" },
              publisher: { "@type": "Organization", name: "Седьмое небо" },
              mainEntityOfPage: `https://7heavenmassage.ru${canonicalPath}`,
            },
          ]
        : undefined,
    });
  },
  component: BlogSlugPage,
});

function BlogSlugPage() {
  const { slug } = Route.useParams();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EFF6FF] px-4">
        <div className="w-full max-w-[560px] px-6 py-10 text-center sm:px-10 sm:py-14">
          <h1 className="font-heading text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px]">
            Статья не найдена
          </h1>
          <p className="body-text mx-auto mt-4 max-w-[400px] text-[#566A93]">
            Возможно, статья была перемещена или удалена.
          </p>
          <a href="/" className="btn-primary mt-8 w-full sm:w-auto">
            На главную
          </a>
        </div>
      </div>
    );
  }

  return <BlogArticlePage article={article} />;
}
