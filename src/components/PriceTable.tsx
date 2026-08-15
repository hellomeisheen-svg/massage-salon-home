import { useState } from "react";
import { formatPrice, renderPrice, pluralize } from "@/components/Services";

export type ServicePrice = {
  zone: string;
  subtitle: string;
  /** Длительность одного сеанса, например «2 часа» */
  duration: string;
  /** Цена одного сеанса */
  base: number;
};

export function PriceTable({ prices, bookingPrefix }: { prices: ServicePrice[], bookingPrefix?: string }) {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState(0);

  const sessionCounts = [1, 3, 6];
  const discountValues = [0, 0.1, 0.15];
  const tabLabels = ["1\u00A0сеанс", "3\u00A0сеанса", "6\u00A0сеансов"];
  const sessionDiscounts = [null, "-10%", "-15%"];

  return (
    <section id="prices" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <h2 className="font-noto-serif-narrow text-center ds-h2 text-[#1C3C8C]">
          Форматы и стоимость
        </h2>

        <div className="mt-8 sm:mt-10 ds-card overflow-hidden">
          {/* Desktop */}
          <div className="hidden xl:block overflow-x-auto scrollbar-none">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#EFF6FF]">
                  <th className="px-4 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                    Формат
                  </th>
                  <th className="px-4 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                    Длительность
                  </th>
                  <th className="px-4 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                    1 сеанс
                  </th>
                  <th className="px-4 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                    <span className="flex items-center gap-2">
                      3 сеанса
                      <span className="rounded-full bg-[#1C3C8C] px-2 py-0.5 text-[10px] font-semibold text-white">
                        -10%
                      </span>
                    </span>
                  </th>
                  <th className="px-4 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                    <span className="flex items-center gap-2">
                      6 сеансов
                      <span className="rounded-full bg-[#1C3C8C] px-2 py-0.5 text-[10px] font-semibold text-white">
                        -15%
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#daebff]">
                {prices.map((p) => (
                  <PriceTableRow key={p.zone} p={p} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Tabs */}
          <div className="xl:hidden p-5 sm:p-8">
            <div className="flex items-stretch gap-1 rounded-[10px] bg-[#EFF6FF] p-1">
              {tabLabels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`relative flex flex-1 items-center justify-center rounded-[8px] px-2 py-2.5 transition-all duration-300 ${
                    activeTab === i ? "bg-white shadow-[0_2px_8px_rgba(28,60,140,0.08)]" : "bg-transparent"
                  }`}
                >
                  <span
                    className={`whitespace-nowrap text-[13px] tracking-tight transition-colors duration-300 ${
                      activeTab === i ? "font-medium text-[#1C3C8C]" : "font-light text-[#566A93]"
                    }`}
                  >
                    {label}
                  </span>
                  {sessionDiscounts[i] && (
                    <span className="absolute -top-1 right-1 rounded-full bg-[#1C3C8C] px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white">
                      {sessionDiscounts[i]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 divide-y divide-[#daebff]">
              {prices.map((p) => {
                const count = sessionCounts[activeTab];
                const discount = discountValues[activeTab];
                const totalBase = p.base * count;
                const currentPrice = Math.round(totalBase * (1 - discount));
                const sessionWord = pluralize(count, ["сеанс", "сеанса", "сеансов"]);
                
                return (
                  <div key={p.zone} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-noto-serif-narrow text-[24px] font-light leading-[1.25] text-[#1C3C8C]">
                          {p.zone}
                        </div>
                        <div className="mt-1 text-[13px] font-light leading-[18px] text-[#566A93]">
                          {count === 1 ? p.duration : `В пакете: ${count}\u00A0${sessionWord} · ${p.duration}`}
                        </div>
                      </div>
                      
                      <div className="flex flex-row items-center justify-end sm:flex-col sm:items-end gap-3 sm:gap-1">
                        {discount > 0 && (
                          <span className="font-noto-serif-narrow text-[15px] font-light text-[#566A93] line-through">
                            {renderPrice(formatPrice(totalBase))}
                          </span>
                        )}
                        <div className="flex flex-col items-end">
                          <span className="font-noto-serif-narrow text-[28px] font-light text-[#1C3C8C]">
                            {renderPrice(formatPrice(currentPrice))}
                          </span>
                          <span className="text-[12px] font-light text-[#566A93]">
                            за {count} {sessionWord}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        <p className="mt-6 text-center text-[14px] font-light text-[#566A93]">
          Цены указаны с учётом скидки при покупке курса. Оплатить можно на месте.
        </p>

        <div className="mt-10 flex justify-center">
          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={() => openBooking(bookingPrefix || "Форматы и стоимость")}
              className="btn-primary w-full sm:w-[280px] xl:w-[250px] px-16"
            >
              Записаться
            </button>
          </div>
        </div>
      </div>
    </section>

  );
}

// Убран неиспользуемый компонент MobileRow, так как табы теперь встроены в основной компонент


function PriceTableRow({ p }: { p: ServicePrice }) {
  return (
    <tr className="group transition-colors hover:bg-[#F7FBFF]">
      <td className="px-4 py-5 xl:px-8">
        <div className="font-noto-serif-narrow text-[18px] xl:text-[24px] font-light leading-[1.25] text-[#1C3C8C]">
          {p.zone}
        </div>
        <div className="mt-1 text-[13px] font-light leading-[18px] text-[#566A93] sm:hidden">
          {p.subtitle}
        </div>
      </td>
      <td className="px-4 py-5 text-[15px] xl:text-[18px] font-light text-[#566A93] xl:px-8">
        {p.duration}
      </td>
      <td className="font-noto-serif-narrow px-4 py-5 text-[18px] xl:text-[24px] font-light text-[#1C3C8C] xl:px-8">
        {renderPrice(formatPrice(p.base))}
      </td>
      <td className="px-4 py-5 xl:px-8">
        <PriceTableCell base={p.base} count={3} discount={0.1} />
      </td>
      <td className="px-4 py-5 xl:px-8">
        <PriceTableCell base={p.base} count={6} discount={0.15} />
      </td>
    </tr>
  );
}

function PriceTableCell({
  base,
  count,
  discount,
}: {
  base: number;
  count: number;
  discount: number;
}) {
  const total = base * count;
  const current = Math.round(total * (1 - discount));
  return (
    <div className="flex items-center gap-2">
      <span className="font-noto-serif-narrow text-[13px] xl:text-[15px] font-light text-[#566A93] line-through">
        {renderPrice(formatPrice(total))}
      </span>
      <span className="font-noto-serif-narrow text-[18px] xl:text-[24px] font-light text-[#1C3C8C]">
        {renderPrice(formatPrice(current))}
      </span>
    </div>
  );
}
