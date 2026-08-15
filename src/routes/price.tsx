import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";
import { PriceTable, type ServicePrice } from "@/components/PriceTable";
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
    { 
      zone: "Программа «Лёгкость»", 
      subtitle: "Лимфатический (1)\nЛимфодренажный (6)\nМягкие банки (6)", 
      duration: "13 сеансов", 
      base: 38750 
    },
    { 
      zone: "Программа «Свежесть»", 
      subtitle: "Лимфодренажный Лицо (3)\nКлассический Лицо (3)\nКосм. пиявки (6)", 
      duration: "12 сеансов", 
      base: 35000 
    },
    { 
      zone: "Программа «Тишина»", 
      subtitle: "Лимфодренажный (3)\nКлассический (3)\nКосм. пиявки (6)", 
      duration: "12 сеансов", 
      base: 40000 
    },
    { 
      zone: "Программа «Баланс»", 
      subtitle: "Классический (6)\nСтеклянные банки (6)\nМед. пиявки (6)", 
      duration: "18 сеансов", 
      base: 56250 
    },
    { 
      zone: "Программа «Свобода»", 
      subtitle: "Мед. пиявки (6)\nСтеклянные банки (8)", 
      duration: "14 сеансов", 
      base: 30000 
    },
  ].map(p => ({ ...p, validity: "2 месяца" } as any));

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
