import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "404 — Страница не найдена" },
      {
        name: "description",
        content:
          "Запрашиваемая страница не существует или была перемещена. Вернитесь на главную кабинета Татьяны Злобиной.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "404 — Страница не найдена" },
      {
        property: "og:description",
        content:
          "Запрашиваемая страница не существует или была перемещена. Вернитесь на главную.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <BookingProvider>
      <div className="relative flex min-h-screen flex-col bg-[#EFF6FF]">
        <Header />

        <main className="flex flex-1 items-start justify-center px-4 pb-24 pt-36 sm:px-5 sm:pt-44">
          <div className="w-full max-w-[560px] px-6 py-10 text-center sm:px-10 sm:py-14">
            <span
              className="block text-[80px] font-light leading-none tracking-tight text-[#1C3C8C] sm:text-[120px]"
              style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
            >
              404
            </span>

            <h1 className="ds-h2 mt-6 text-[#1C3C8C]">Страница не найдена</h1>

            <p className="body-text mx-auto mt-4 max-w-[400px] text-[#6B7BA8]">
              Запрашиваемая страница не существует или была перемещена. Проверьте адрес или вернитесь на главную.
            </p>

            <div className="mt-8 flex justify-center">
              <Link to="/" className="btn-primary w-full sm:w-auto">
                На главную
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </BookingProvider>
  );
}
