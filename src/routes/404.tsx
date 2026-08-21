import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/404")({
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFF6FF] text-[#1C3C8C] p-6 text-center">
      <h1 className="font-noto-serif-narrow text-[60px] sm:text-[80px] leading-none mb-4">404</h1>
      <p className="text-[18px] sm:text-[22px] text-[#566A93] mb-8">Кажется, эта страница ушла в отпуск</p>
      <Link to="/" className="btn-primary px-8">Вернуться к услугам</Link>
    </div>
  );
}