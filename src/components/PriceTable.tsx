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

export function PriceTable({ prices, title = "Форматы и стоимость", id }: { prices: ServicePrice[], title?: string, id?: string }) {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState(0);

  const sessionCounts = [1, 3, 6];
  const discountValues = [0, 0.1, 0.15];
  const tabLabels = ["1\u00A0сеанс", "3\u00A0сеанса", "6\u00A0сеансов"];
  const sessionDiscounts = [null, "-10%", "-15%"];

  return (
    <section id={id || "prices"} className="scroll-mt-[140px] ds-section opacity-0 animate-in fade-in duration-700 fill-mode-forwards">
      <div className="container-1900">
        <h2 className="font-noto-serif-narrow text-center ds-h2 text-[#1C3C8C] mb-8 sm:mb-12">
          {title}
        </h2>

        <div className="ds-card ds-bento-shadow overflow-hidden bg-white/50 backdrop-blur-sm border border-[#daebff]">
          {/* Desktop */}
          <div className="hidden lg:block overflow-x-auto scrollbar-none">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#EFF6FF]">
                  <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                    {title === "Программы восстановления" ? "Программа" : "Формат"}
                  </th>
                  <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                    {title === "Программы восстановления" ? "Что входит" : "Длительность"}
                  </th>
                  <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                    {title === "Программы восстановления" ? "Срок" : "1 сеанс"}
                  </th>
                  {title !== "Программы восстановления" && (
                    <>
                      <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                        <span className="flex items-center gap-2">
                          3 сеанса
                          <span className="rounded-[12px] bg-[#1C3C8C] px-2 py-0.5 text-[10px] font-semibold text-white">
                            -10%
                          </span>
                        </span>
                      </th>
                      <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                        <span className="flex items-center gap-2">
                          6 сеансов
                          <span className="rounded-[12px] bg-[#1C3C8C] px-2 py-0.5 text-[10px] font-semibold text-white">
                            -15%
                          </span>
                        </span>
                      </th>
                    </>
                  )}
                  {title === "Программы восстановления" && (
                    <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                      Стоимость
                    </th>
                  )}
                  <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                    {/* Кнопка записи */}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#daebff]">
                {prices.map((p) => (
                  <PriceTableRow key={p.zone} p={p} isProgram={title === "Программы восстановления"} />
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Program List */}
          {title === "Программы восстановления" && (
            <div className="lg:hidden divide-y divide-[#daebff]">
              {prices.map((p) => {
                const basePrice = Math.round(p.base * 0.8);
                const originalPrice = p.base;
                return (
                  <div key={p.zone} className="p-5 space-y-4 bg-white">
                    <div>
                      <div className="font-noto-serif-narrow text-[20px] font-light text-[#1C3C8C]">
                        {p.zone}
                      </div>
                      <div className="mt-2 text-[14px] font-light text-[#566A93] whitespace-pre-line leading-relaxed">
                        {p.subtitle}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#daebff]/40">
                      <div className="text-[13px] font-light text-[#566A93]">
                        {(p as any).validity || "2 месяца"}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-noto-serif-narrow text-[14px] font-light text-[#566A93] line-through">
                          {renderPrice(formatPrice(originalPrice))}
                        </span>
                        <span className="font-noto-serif-narrow text-[22px] font-light text-[#1C3C8C]">
                          {renderPrice(formatPrice(basePrice))}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => openBooking(p.zone)}
                        className="btn-primary w-full py-2.5 text-[14px]"
                      >
                        Записаться
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mobile & Tablet Tabs */}
          <div className={`${title === "Программы восстановления" ? "hidden" : "lg:hidden"} p-5 sm:p-8`}>
            <div className="flex items-stretch gap-1 rounded-[12px] bg-[#EFF6FF] p-1">
              {tabLabels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`relative flex flex-1 items-center justify-center rounded-[12px] px-2 py-2.5 transition-all duration-300 ${
                    activeTab === i ? "bg-white shadow-tab-active" : "bg-transparent hover:bg-white/40"
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
                    <span className="absolute -top-1 right-1 rounded-[12px] bg-[#1C3C8C] px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white">
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
                const isHirudo = p.zone.toLowerCase().includes("пиявк");
                
                // Specific data for leech therapy
                const hirudoRow = isHirudo ? (p as any) : null;
                const leeches = hirudoRow?.leechCounts ? hirudoRow.leechCounts[activeTab] : 0;
                const leechWord = pluralize(leeches, ["пиявка", "пиявки", "пиявок"]);
                
                const totalBase = hirudoRow?.perLeech ? leeches * p.base : p.base * count;
                const currentPrice = Math.round(totalBase * (1 - discount));
                const sessionWord = pluralize(count, ["сеанс", "сеанса", "сеансов"]);
                
                return (
                  <div key={p.zone} className="bg-white p-4 rounded-[12px] border border-[#daebff]">
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-baseline gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-noto-serif-narrow text-[18px] font-light leading-[1.1] text-[#1C3C8C] flex flex-wrap items-center gap-x-2">
                            {p.zone.includes(" • ") ? (
                              <>
                                <span>{p.zone.split(" • ")[0]}</span>
                                <span className="inline-flex items-center justify-center rounded-[12px] bg-[#DAEBFF] px-2 py-0.5 text-[10px] font-light leading-none text-[#566A93]">
                                  {p.zone.split(" • ")[1]}
                                </span>
                              </>
                            ) : (
                              p.zone
                            )}
                          </div>
                          <div className="mt-0.5 text-[11px] font-light text-[#566A93]">
                            {isHirudo ? (
                              <span className="lg:hidden">
                                {count} {sessionWord} · {leeches} {leechWord}
                              </span>
                            ) : (
                              p.duration
                            )}
                          </div>
                        </div>
                        <div className={`text-right shrink-0 ${isHirudo ? 'hidden lg:block' : ''}`}>
                          <div className="inline-flex rounded-[12px] bg-[#DAEBFF] px-2 py-0.5 text-[10px] font-light text-[#566A93]">
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
                          <div className="hidden lg:block text-[11px] font-light text-[#566A93]">
                            {leeches} {leechWord}
                          </div>
                        )}
                      </div>
                      <div className="mt-5 pt-4 border-t border-[#daebff]/40">
                        <button
                          type="button"
                          onClick={() => openBooking(p.zone)}
                          className="btn-primary w-full py-2.5 text-[14px]"
                        >
                          Записаться
                        </button>
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

function PriceTableRow({ p, isProgram = false }: { p: ServicePrice, isProgram?: boolean }) {
  const { openBooking } = useBooking();
  const isHirudo = p.zone.toLowerCase().includes("пиявк");
  const basePrice = Math.round(p.base * (isProgram ? 0.8 : 1)); // В Programs.tsx цена уже со скидкой, но в PriceTable мы передаем базу
  const originalPrice = p.base;

  return (
    <tr className="group transition-colors hover:bg-[#F7FBFF]">
      <td className="px-6 py-5 xl:px-8">
        <div className="font-noto-serif-narrow text-[18px] xl:text-[24px] font-light leading-[1.25] text-[#1C3C8C] flex items-center gap-x-3">
          {p.zone.includes(" • ") ? (
            <>
              <span>{p.zone.split(" • ")[0]}</span>
              <span className="inline-flex items-center justify-center rounded-[12px] bg-[#DAEBFF] px-2.5 py-0.5 text-[11px] xl:text-[12px] font-light tracking-tight text-[#566A93]/80 border border-[#daebff]/30">
                {p.zone.split(" • ")[1]}
              </span>
            </>
          ) : (
            p.zone
          )}
        </div>
        <div className="mt-1 text-[13px] font-light leading-[18px] text-[#566A93] sm:hidden">
          {p.subtitle}
        </div>
      </td>
      <td className="px-6 py-5 text-[15px] xl:text-[18px] font-light text-[#566A93] xl:px-8 max-w-[300px]">
        {isProgram ? (
          <div className="whitespace-pre-line">{p.subtitle}</div>
        ) : (
          p.zone.toLowerCase().includes("пиявк") ? "" : p.duration
        )}
      </td>
      <td className="font-noto-serif-narrow px-6 py-5 text-[15px] xl:text-[18px] font-light text-[#566A93] xl:px-8">
        {isProgram ? (p as any).validity || "2 месяца" : renderPrice(formatPrice(p.base))}
      </td>
      {!isProgram ? (
        <>
          <td className="px-6 py-5 xl:px-8">
            <PriceTableCell base={p.base} count={3} discount={0.1} />
          </td>
          <td className="px-6 py-5 xl:px-8">
            <PriceTableCell base={p.base} count={6} discount={0.15} />
          </td>
        </>
      ) : (
        <td className="px-6 py-5 xl:px-8">
          <div className="flex items-center gap-2">
            <span className="font-noto-serif-narrow text-[13px] xl:text-[15px] font-light text-[#566A93]/40 line-through decoration-[#566A93]/20">
              {renderPrice(formatPrice(originalPrice))}
            </span>
            <span className="font-noto-serif-narrow text-[18px] xl:text-[24px] font-light text-[#1C3C8C]">
              {renderPrice(formatPrice(basePrice))}
            </span>
          </div>
        </td>
      )}
      <td className="px-6 py-5 xl:px-8">
        <button
          type="button"
          onClick={() => openBooking(p.zone)}
          className="btn-primary px-5 py-2 text-[14px]"
        >
          Записаться
        </button>
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
      <span className="font-noto-serif-narrow text-[18px] xl:text-[24px] font-light text-[#1C3C8C]">
        {renderPrice(formatPrice(current))}
      </span>
      {discount > 0 && (
        <span className="font-noto-serif-narrow text-[13px] xl:text-[15px] font-light text-[#566A93]/40 line-through decoration-[#566A93]/20">
          {renderPrice(formatPrice(total))}
        </span>
      )}
    </div>
  );
}
