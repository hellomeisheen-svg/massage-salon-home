import { Star } from "lucide-react";

const YANDEX_MAPS_URL =
  "https://yandex.ru/maps/org/sedmoye_nebo/130811843218/reviews/";

export function RatingBlock({ className }: { className?: string }) {
  return (
    <a
      href={YANDEX_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex w-fit flex-col items-start gap-2 rounded-[15px] border border-[#daebff] bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:opacity-85 ds-bento-shadow ${className || ""}`}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-[14px] w-[14px] fill-[#A2CFFE] text-[#A2CFFE]"
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-noto-serif-narrow text-[30px] font-bold leading-none tracking-tight text-[#1C3C8C]">
          4,4
        </span>
        <span className="text-[13px] font-medium text-[#566A93]">
          Рейтинг организации в Яндексе
        </span>
      </div>
    </a>
  );
}
