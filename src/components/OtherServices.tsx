import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const heading = "'Roslindale Cyrillic Display Condensed', serif";

export const otherServices = [
  {
    slug: "girudoterapiya",
    title: "Гирудотерапия",
    description: "Бережная работа с медицинскими пиявками",
  },
  {
    slug: "banki",
    title: "Банки",
    description: "Вакуумный массаж стеклянными и мягкими банками",
  },
  {
    slug: "vektornyi-massazh",
    title: "Векторный массаж",
    description: "Точная работа с мышцами и фасциями",
  },
  {
    slug: "limfaticheskii-massazh",
    title: "Лимфатический массаж",
    description: "Мягкая работа для уменьшения отёчности",
  },
  {
    slug: "limfodrenazhnyi-massazh",
    title: "Лимфодренажный массаж",
    description: "Последовательная работа от стоп до плеч",
  },
  {
    slug: "klassicheskii-massazh",
    title: "Классический массаж",
    description: "Комплексная проработка тела",
  },
  {
    slug: "massazh",
    title: "Массаж",
    description: "Ручная работа в спокойном ритме",
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

        <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((service) => (
            <Link
              key={service.slug}
              to={`/${service.slug}`}
              className="group flex flex-col justify-between ds-card ds-card-hover p-4 sm:p-5"
            >
              <div>
                <h3
                  className="text-[18px] font-light leading-[1.25] text-[#1C3C8C] sm:text-[20px]"
                  style={{ fontFamily: heading }}
                >
                  {service.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[13px] font-light leading-[1.4] text-[#6B7BA8]">
                  {service.description}
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1C3C8C] transition-colors group-hover:text-[#4A7FD6]">
                Подробнее
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
