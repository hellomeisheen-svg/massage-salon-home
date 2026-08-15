import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";
import { PriceTable } from "@/components/PriceTable";
import { serviceTypes } from "@/components/Services";

export const Route = createFileRoute("/price")({
  head: () => ({
    meta: [
      { title: "Прайс-лист — Седьмое небо" },
      {
        name: "description",
        content: "Полный перечень услуг и цен кабинета оздоровительных практик Седьмое небо: массаж, гирудотерапия, банки, кетгут.",
      },
      { property: "og:title", content: "Прайс-лист — Седьмое небо" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://7heavenmassage.ru/price" }],
  }),
  component: PricePage,
});

function PricePage() {
  // Собираем все услуги в один список для таблицы цен
  const allPrices = serviceTypes.flatMap(type => 
    type.variants.map(v => ({
      zone: type.variants.length > 1 ? `${type.title} • ${v.zone}` : type.title,
      subtitle: v.subtitle,
      duration: v.duration,
      base: parseInt(v.price.replace(/[^\d]/g, "")) || 0
    }))
  );

  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header />
        <main className="container-1900 py-10 sm:py-16">
          <PriceTable prices={allPrices} />
        </main>
        <Footer />
      </div>
    </BookingProvider>
  );
}
