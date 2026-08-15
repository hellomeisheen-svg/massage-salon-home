import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";
import { PriceTable } from "@/components/PriceTable";
import { serviceTypes } from "@/components/Services";
import { Programs } from "@/components/Programs";

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
      { property: "og:url", content: "https://7heavenmassage.ru/price" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://7heavenmassage.ru/price" }],
  }),
  component: PricePage,
});

function PricePage() {
  // Категория "Оздоровительные практики"
  const wellnessPrices = serviceTypes
    .filter(type => type.category === 0)
    .flatMap(type => 
      type.variants.map(v => ({
        zone: type.variants.length > 1 ? `${type.title} • ${v.zone}` : type.title,
        subtitle: v.subtitle,
        duration: v.duration,
        base: parseInt(v.price.replace(/[^\d]/g, "")) || 0
      }))
    );

  // Категория "Массаж"
  const massagePrices = serviceTypes
    .filter(type => type.category === 1)
    .flatMap(type => 
      type.variants.map(v => ({
        zone: type.variants.length > 1 ? `${type.title} • ${v.zone}` : type.title,
        subtitle: v.subtitle,
        duration: v.duration,
        base: parseInt(v.price.replace(/[^\d]/g, "")) || 0
      }))
    );

  // Категория "Программы восстановления" (имитируем структуру ServicePrice)
  // На основе данных из Programs.tsx (заглушка для демонстрации в таблице)
  const programPrices: ServicePrice[] = [
    { zone: "Программа «Лёгкость»", subtitle: "Восстановление лимфотока", duration: "13 сеансов", base: 31000 },
    { zone: "Программа «Свежесть»", subtitle: "Тонус кожи и овал лица", duration: "12 сеансов", base: 28000 },
    { zone: "Программа «Тишина»", subtitle: "Антистресс и ресурс", duration: "12 сеансов", base: 32000 },
    { zone: "Программа «Баланс»", subtitle: "Глубокая проработка мышц", duration: "18 сеансов", base: 45000 },
    { zone: "Программа «Свобода»", subtitle: "Снятие тяжести в ногах", duration: "14 сеансов", base: 24000 },
  ].map(p => ({ ...p, base: Math.round(p.base / 0.8) })); // Учитываем, что в Programs.tsx цена уже со скидкой 20%

  return (
    <BookingProvider>
      <div className="accent-noto-serif relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header />
        <main className="container-1900 space-y-20 py-10 sm:py-16">
          <PriceTable title="Массаж" prices={massagePrices} />
          <PriceTable title="Оздоровительные практики" prices={wellnessPrices} />
          <PriceTable title="Программы восстановления" prices={programPrices} />
        </main>
        <Footer />
      </div>
    </BookingProvider>
  );
}
