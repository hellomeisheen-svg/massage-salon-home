import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { BookingProvider } from "@/components/BookingModal";

export const notFoundMeta = {
  title: "404 — Страница не найдена",
  description:
    "Запрашиваемая страница не существует или была перемещена. Вернитесь на главную кабинета Татьяны Злобиной.",
};

export const notFoundHead = () => ({
  meta: [
    { title: notFoundMeta.title },
    { name: "description", content: notFoundMeta.description },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: notFoundMeta.title },
    {
      property: "og:description",
      content:
        "Запрашиваемая страница не существует или была перемещена. Вернитесь на главную.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});

export function NotFoundPage() {
  return (
    <BookingProvider>
      <div className="relative flex min-h-screen flex-col bg-[#EFF6FF]">
        <Header items={[]} showServicesMenu={false} />

        <main className="flex min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-80px)] items-center justify-center px-4 sm:px-5">
          <div className="w-full max-w-[640px] px-6 py-10 text-center sm:px-10 sm:py-14">
            <span className="font-noto-serif-narrow block text-[80px] font-light leading-none tracking-tight text-[#1C3C8C] sm:text-[120px]">
              404
            </span>

            <h1 className="font-noto-serif-narrow mt-6 text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px] xl:text-[44px]">
              Страница не найдена
            </h1>

            <p className="body-text mx-auto mt-4 max-w-[480px] text-[#566A93]">
              Запрашиваемая страница не существует или была перемещена. Проверьте адрес или вернитесь на главную.
            </p>

            <div className="mt-8 flex justify-center">
              <Link to="/" className="btn-primary w-full sm:w-[280px] xl:w-[250px] inline-flex items-center justify-center text-center whitespace-nowrap">
                На главную
              </Link>
            </div>
          </div>
        </main>
      </div>
    </BookingProvider>
  );
}
