import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const heading = "'Roslindale Cyrillic Display Condensed', serif";

export const otherServices = [
  {
    slug: "girudoterapiya",
    title: "Гирудотерапия",
    description: "Бережная практика с медицинскими пиявками для поддержки самочувствия и ощущения лёгкости.",
    image: "/images/uslugi-girudoterapiya-litsa.jpg",
    imageAlt: "Гирудотерапия в кабинете Татьяны Злобиной",
  },
  {
    slug: "banki",
    title: "Банки",
    description: "Вакуумный массаж стеклянными и мягкими банками для мягкого прогревания и снятия скованности.",
    image: "/images/uslugi-steklyannye-banki.jpg",
    imageAlt: "Массаж банками в кабинете Татьяны Злобиной",
  },
  {
    slug: "vektornyi-massazh",
    title: "Векторный массаж",
    description: "Точная ручная работа с мышцами и фасциями по естественным линиям тела.",
    image: "/images/uslugi-massazh-spiny-i-shei.jpg",
    imageAlt: "Векторный массаж в кабинете Татьяны Злобиной",
  },
  {
    slug: "limfaticheskii-massazh",
    title: "Лимфатический массаж",
    description: "Мягкая работа со всем телом для уменьшения отёчности и внутренней лёгкости.",
    image: "/images/uslugi-limfodrenazhnyi-massazh.jpg",
    imageAlt: "Лимфатический массаж в кабинете Татьяны Злобиной",
  },
  {
    slug: "limfodrenazhnyi-massazh",
    title: "Лимфодренажный массаж",
    description: "Последовательная работа с лимфатической системой от стоп до плеч.",
    image: "/images/uslugi-limfodrenazhnyi-massazh.jpg",
    imageAlt: "Лимфодренажный массаж в кабинете Татьяны Злобиной",
  },
  {
    slug: "klassicheskii-massazh",
    title: "Классический массаж",
    description: "Комплексная проработка тела в спокойном ритме для снятия напряжения и восстановления сил.",
    image: "/images/uslugi-klassicheskii-massazh.jpg",
    imageAlt: "Классический массаж в кабинете Татьяны Злобиной",
  },
  {
    slug: "massazh",
    title: "Массаж",
    description: "Ручная работа с телом в спокойном ритме, техника подбирается под ваше состояние.",
    image: "/images/uslugi-klassicheskii-massazh.jpg",
    imageAlt: "Массаж в кабинете Татьяны Злобиной",
  },
];

export function OtherServices({ exclude }: { exclude?: string }) {
  const items = otherServices.filter((s) => s.slug !== exclude);

  return (
    <section className="bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <div className="flex flex-col items-center text-center">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
            style={{
              borderRadius: "4px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            Смотрите также
          </span>
          <h2
            className="mt-6 ds-h2 text-[#1C3C8C] max-w-[520px]"
            style={{ fontFamily: heading }}
          >
            Другие услуги
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((service) => (
            <Link
              key={service.slug}
              to={`/${service.slug}`}
              className="group flex flex-col ds-card ds-card-hover overflow-hidden"
            >
              <div className="relative h-[200px] overflow-hidden sm:h-[220px]">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3
                  className="text-[22px] font-light leading-[1.2] text-[#1C3C8C] sm:text-[24px]"
                  style={{ fontFamily: heading }}
                >
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] font-light leading-[1.5] text-[#6B7BA8]">
                  {service.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-[#1C3C8C] transition-colors group-hover:text-[#4A7FD6]">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
