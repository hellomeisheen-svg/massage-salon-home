import { formatPrice, renderPrice } from "@/components/Services";

export type ServicePrice = {
  zone: string;
  subtitle: string;
  /** Длительность одного сеанса, например «2 часа» */
  duration: string;
  /** Цена одного сеанса */
  base: number;
};

export function PriceTable({ prices }: { prices: ServicePrice[] }) {
  return (
    <section id="prices" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <h2 className="font-noto-serif-narrow text-center ds-h2 text-[#1C3C8C]">
          Форматы и стоимость
        </h2>

        <div className="mt-8 sm:mt-10 ds-card overflow-hidden">
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto scrollbar-none">
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

          {/* Mobile */}
          <div className="sm:hidden divide-y divide-[#daebff]">
            {prices.map((p) => (
              <PriceTableMobileRow key={p.zone} p={p} />
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-[14px] font-light text-[#566A93]">
          Цены указаны с учётом скидки при покупке курса. Оплатить можно на месте.
        </p>
      </div>
    </section>
  );
}

function PriceTableMobileRow({ p }: { p: ServicePrice }) {
  const price3 = Math.round(p.base * 3 * (1 - 0.1));
  const price6 = Math.round(p.base * 6 * (1 - 0.15));
  return (
    <div className="px-4 py-5">
      <div className="min-w-0">
        <div className="font-noto-serif-narrow text-[30px] font-light leading-[1.25] text-[#1C3C8C]">
          {p.zone}
        </div>
        <div className="mt-1 text-[13px] font-light leading-[18px] text-[#566A93]">
          {p.duration}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div>
          <div className="text-[11px] font-medium text-[#566A93]">1 сеанс</div>
          <div className="font-noto-serif-narrow mt-1 text-[15px] font-light text-[#1C3C8C]">
            {renderPrice(formatPrice(p.base))}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-medium text-[#566A93]">
            3 сеанса
            <span className="ml-1 rounded-full bg-[#1C3C8C] px-1.5 py-0.5 text-[9px] font-semibold text-white">
              -10%
            </span>
          </div>
          <div className="font-noto-serif-narrow mt-1 text-[15px] font-light text-[#1C3C8C]">
            {renderPrice(formatPrice(price3))}
          </div>
          <div className="font-noto-serif-narrow text-[11px] font-light text-[#566A93] line-through">
            {renderPrice(formatPrice(p.base * 3))}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-medium text-[#566A93]">
            6 сеансов
            <span className="ml-1 rounded-full bg-[#1C3C8C] px-1.5 py-0.5 text-[9px] font-semibold text-white">
              -15%
            </span>
          </div>
          <div className="font-noto-serif-narrow mt-1 text-[15px] font-light text-[#1C3C8C]">
            {renderPrice(formatPrice(price6))}
          </div>
          <div className="font-noto-serif-narrow text-[11px] font-light text-[#566A93] line-through">
            {renderPrice(formatPrice(p.base * 6))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
