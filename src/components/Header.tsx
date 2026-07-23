import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigationItems = [
  "Услуги",
  "Преимущества",
  "Программы",
  "Обо мне",
  "Вопросы",
  "Контакты",
];

const logoStyle = {
  fontFamily: "'Roslindale Display Condensed', serif",
  color: "#1c3c8c",
  letterSpacing: "0.01em",
} as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#EFF6FF] pt-4 sm:pt-5">
      <div className="container-1900">
      {/* Desktop header */}
      <div className="hidden h-20 w-full items-center justify-between rounded-xl border border-[#daebff] bg-white px-5 py-2.5 xl:flex xl:px-[30px]">
        {/* Logo */}
        <a href="/" aria-label="Татьяна Злобина — на главную" className="flex h-10 items-center">
          <span
            className="text-[34px] leading-none font-light"
            style={logoStyle}
          >
            Татьяна&nbsp;Злобина
          </span>
        </a>

        {/* Navigation */}
        <nav aria-label="Основная навигация">
          <ul className="flex items-center gap-[30px]">
            {navigationItems.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="text-base font-normal leading-[150%] text-[#1c3c8c] hover:opacity-70 transition-opacity"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <button type="button" className="btn-primary w-[250px]">
          Онлайн запись
        </button>
      </div>

      {/* Mobile / tablet header */}
      <div className="flex h-16 w-full items-center justify-between rounded-xl border border-[#daebff] bg-white px-4 py-2.5 xl:hidden">
        {/* Logo */}
        <a href="/" aria-label="Татьяна Злобина — на главную" className="flex h-8 items-center">
          <span
            className="text-[22px] leading-none font-light"
            style={logoStyle}
          >
            Татьяна&nbsp;Злобина
          </span>
        </a>

        {/* Hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#1c3c8c] hover:bg-[#EFF6FF] transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="mt-2 rounded-xl border border-[#daebff] bg-white p-4 xl:hidden">
          <nav aria-label="Мобильная навигация">
            <ul className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-base font-normal leading-[150%] text-[#1c3c8c] hover:bg-[#EFF6FF] transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            Онлайн запись
          </button>
        </div>
      )}
      </div>
    </header>
  );
}
