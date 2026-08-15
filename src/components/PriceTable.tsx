import { useState } from "react";
import { formatPrice, renderPrice, pluralize } from "@/components/Services";
import { useBooking } from "@/components/BookingModal";


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
          <div className="hidden lg:block overflow-x-auto scrollbar-none">
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
          <div className="lg:hidden p-5 sm:p-8">
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
                      activeTab === i ? "font-normal text-[#1C3C8C]" : "font-light text-[#566A93]"
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

            <div className="mt-6 space-y-3">
              {prices.map((p) => {
                const count = sessionCounts[activeTab];
                const discount = discountValues[activeTab];
                const totalBase = p.base * count;
                const currentPrice = Math.round(totalBase * (1 - discount));
                const sessionWord = pluralize(count, ["сеанс", "сеанса", "сеансов"]);
                
                // Specific data for leech therapy based on context
                const isHirudo = p.zone.toLowerCase().includes("пиявк");
                const leeches = count === 1 ? 6 : (count === 3 ? 16 : (count === 6 ? 74 : 0));
                
                return (
                  <div key={p.zone} className="bg-white p-4 rounded-[12px] border border-[#daebff]/50">
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-baseline gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-noto-serif-narrow text-[18px] font-light leading-[1.1] text-[#1C3C8C] truncate">
                            {p.zone}
                          </div>
                          <div className="mt-0.5 text-[11px] font-light text-[#566A93]">
                            {p.duration}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="inline-flex rounded-full bg-[#daebff]/40 px-2 py-0.5 text-[10px] font-light text-[#566A93]">
                            {count} {sessionWord}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-baseline justify-between pt-2.5 border-t border-[#daebff]/40">
                        <div className="flex items-baseline gap-2">
                          <span className="font-noto-serif-narrow text-[22px] font-light text-[#1C3C8C]">
                            {renderPrice(formatPrice(currentPrice))}
                          </span>
                          {discount > 0 && (
                            <span className="font-noto-serif-narrow text-[13px] font-light text-[#566A93] line-through">
                              {renderPrice(formatPrice(totalBase))}
                            </span>
                          )}
                        </div>
                        {isHirudo && (
                          <div className="text-[11px] font-light text-[#566A93]">
                            {leeches} {pluralize(leeches, ["пиявка", "пиявки", "пиявок"])}
                          </div>
                        )}
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
