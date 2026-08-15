import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";
import { PriceTable, type ServicePrice } from "@/components/PriceTable";
import { serviceTypes } from "@/components/Services";
import { PriceInclusions, FinalCTA } from "@/components/PriceExtras";
import { useState, useEffect } from "react";

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
  const [activeSection, setActiveSection] = useState("massage");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["massage", "wellness", "programs"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

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

  const programPrices: ServicePrice[] = [
    { 
      zone: "Программа «Лёгкость»", 
      subtitle: "Лимфатический (1), Лимфодренажный (6), Мягкие банки (6)", 
      duration: "13 сеансов", 
      base: 38750 
    },
    { 
      zone: "Программа «Свежесть»", 
      subtitle: "Лимфодренажный Лицо (3), Классический Лицо (3), Косм. пиявки (6)", 
      duration: "12 сеансов", 
      base: 35000 
    },
    { 
      zone: "Программа «Тишина»", 
      subtitle: "Лимфодренажный (3), Классический (3), Косм. пиявки (6)", 
      duration: "12 сеансов", 
      base: 40000 
    },
    { 
      zone: "Программа «Баланс»", 
      subtitle: "Классический (6), Стеклянные банки (6), Мед. пиявки (6)", 
      duration: "18 сеансов", 
      base: 56250 
    },
    { 
      zone: "Программа «Свобода»", 
      subtitle: "Мед. пиявки (6), Стеклянные банки (8)", 
      duration: "14 сеансов", 
      base: 30000 
    },
  ].map(p => ({ ...p, validity: "2 месяца" } as any));

  return (
    <BookingProvider>
      <div className="accent-noto-serif relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header />
        
        <div className="sticky top-20 xl:top-[100px] z-30 bg-[#EFF6FF]/80 backdrop-blur-md border-b border-[#daebff]/40 py-4">
          <div className="container-1900 flex justify-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none px-4">
            {[
              { id: "massage", label: "Массаж" },
              { id: "wellness", label: "Практики" },
              { id: "programs", label: "Программы" }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollTo(nav.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                  activeSection === nav.id
                    ? "bg-[#1C3C8C] text-white shadow-md"
                    : "text-[#566A93] hover:text-[#1C3C8C] hover:bg-white/50"
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>
        </div>

        <main className="container-1900 space-y-24 sm:space-y-32 py-12 sm:py-20">
          <PriceTable id="massage" title="Массаж" prices={massagePrices} />
          <PriceInclusions />
          <PriceTable id="wellness" title="Оздоровительные практики" prices={wellnessPrices} />
          <PriceTable id="programs" title="Программы восстановления" prices={programPrices} />
          <FinalCTA />
        </main>
        
        <Footer />
      </div>
    </BookingProvider>
  );
}