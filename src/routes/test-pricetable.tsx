import { createFileRoute } from "@tanstack/react-router";
import { PriceTable } from "@/components/PriceTable";
import { BookingProvider } from "@/components/BookingModal";

export const Route = createFileRoute("/test-pricetable")({
  head: () => ({
    meta: [{ title: "PriceTable shadow test" }],
  }),
  component: TestPage,
});

const samplePrices = [
  { zone: "Спина и шея", subtitle: "Для снятия напряжения", duration: "60 мин", base: 2500 },
  { zone: "Всё тело", subtitle: "Полноценный сеанс", duration: "90 мин", base: 4000 },
];

function TestPage() {
  return (
    <BookingProvider>
      <main className="min-h-screen bg-[#EFF6FF] py-20">
        <PriceTable prices={samplePrices} />
      </main>
    </BookingProvider>
  );
}
