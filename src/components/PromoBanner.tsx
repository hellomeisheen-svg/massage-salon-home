import { useBooking } from "@/components/BookingModal";
import type { ReactNode } from "react";

interface PromoBannerProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  buttonText?: string;
}

const defaultTitle = "Знакомство с\u00A0кабинетом по\u00A0комфортной цене";
const defaultSubtitle =
  "Первый визит со\u00A0скидкой 20%. Подберём формат под\u00A0ваше состояние и\u00A0обсудим всё заранее\u00A0— без\u00A0спешки и\u00A0шаблонов.";

export function PromoBanner({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  buttonText = "Записаться",
}: PromoBannerProps) {
  const { openBooking } = useBooking();
  return (
    <section className="bg-brand-surface ds-section overflow-hidden">
      <div className="container-1900 px-4 sm:px-5">
        <div
          className="relative overflow-hidden rounded-[12px] border px-6 py-14 xl:px-24 xl:py-[60px] ds-bento-shadow"
          style={{ backgroundColor: "#DAEBFF", borderColor: "#daebff" }}
        >
          <img src="/images/banner-clouds.svg"
            alt=""
            role="presentation"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full -translate-y-[10px] select-none" loading="lazy" decoding="async" />

          <img src="/images/banner-clouds-bottom.svg"
            alt=""
            role="presentation"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden w-full translate-y-[120px] select-none xl:block" loading="lazy" decoding="async" />
          <img src="/images/banner-ellipse.svg"
            alt="Фоновый градиент"
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 z-[1] hidden h-full w-[140%] max-w-none -translate-x-1/2 select-none xl:block xl:w-[995px]"
            style={{ objectFit: "fill" }} loading="lazy" decoding="async" />

          {/* Decorative background sparkles */}
          {[
            "absolute left-[6%] top-[18%] h-4 w-4 xl:h-5 xl:w-5",
            "absolute left-[14%] bottom-[22%] h-3 w-3 xl:h-4 xl:w-4",
            "absolute right-[8%] top-[24%] h-5 w-5 xl:h-6 xl:w-6",
            "absolute right-[14%] bottom-[18%] h-3 w-3 xl:h-4 xl:w-4",
            "absolute left-[42%] top-[10%] h-3 w-3 xl:h-4 xl:w-4",
            "absolute right-[40%] bottom-[12%] h-4 w-4 xl:h-5 xl:w-5",
          ].map((cls, i) => (
            <svg
              key={i}
              className={`${cls} pointer-events-none z-[2] text-white/70`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
            </svg>
          ))}

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="font-noto-serif-narrow ds-h2 text-brand-ink">
              {title}
            </h2>

            <p className="mt-4 max-w-[600px] body-text text-brand-ink/60">
              {subtitle}
            </p>

            <div className="mt-8 w-full sm:mt-10 sm:w-auto">
              <button
                type="button"
                onClick={() => openBooking()}
                className="btn-primary w-full sm:w-[250px] px-16"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
