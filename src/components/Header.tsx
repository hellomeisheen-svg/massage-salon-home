import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-wide.png";

type NavItem = { label: string; href: string };

const defaultNavigationItems: NavItem[] = [
  { label: "Услуги", href: "#services" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Программы", href: "#programs" },
  { label: "Обо мне", href: "#obrazovanie" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];


const logoStyle = {
  fontFamily: "'Roslindale Cyrillic Display Condensed', serif",
  color: "#1c3c8c",
  letterSpacing: "0.01em",
} as const;

export function Header({ items }: { items?: NavItem[] } = {}) {
  const navigationItems = items ?? defaultNavigationItems;
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      setHeroPassed(rect.bottom <= 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", "100px");
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-transparent pt-4 sm:pt-5">

      <div className="container-1900 relative">
      {/* Desktop header */}
      <div className="hidden h-20 w-full items-center justify-between ds-card px-5 py-2.5 xl:flex xl:px-[30px]">
        {/* Logo */}
        <Link to="/" aria-label="На главную" className="flex h-10 w-20 items-center hover:opacity-70 transition-opacity">
          <span
            className="text-[28px] leading-none font-bold italic"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: "#1c3c8c",
            }}
          >
            Logo
          </span>
        </Link>

        {/* Navigation */}
        <nav aria-label="Основная навигация">
          <ul className="flex items-center gap-[30px]">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-base font-normal leading-[150%] text-[#1c3c8c] hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <a
          href="https://n2418813.yclients.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-header-cta w-[250px] ${heroPassed ? "btn-header-cta-active" : ""}`}
        >
          Онлайн запись
        </a>
      </div>

      {/* Mobile / tablet header */}
      <div className="flex h-16 w-full items-center justify-between ds-card px-4 py-2.5 xl:hidden">
        {/* Logo */}
        <Link to="/" aria-label="На главную" onClick={() => setMenuOpen(false)} className="flex h-8 items-center hover:opacity-70 transition-opacity">
          <span
            className="text-[24px] leading-none font-bold italic"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: "#1c3c8c",
            }}
          >
            Logo
          </span>
        </Link>

        {/* Hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-[0.5rem] text-[#1c3c8c] hover:bg-[#EFF6FF] transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile / tablet menu panel — same width as the header */}
      {menuOpen && (
        <div className="absolute inset-x-4 sm:inset-x-5 top-[calc(100%+8px)] z-40 h-[calc(100dvh-104px)] sm:h-[calc(100dvh-108px)] xl:hidden">
          <div className="flex h-full flex-col ds-card p-4">
            <nav className="flex-1 overflow-y-auto" aria-label="Мобильная навигация">
              <ul className="flex flex-col gap-1">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-normal leading-[150%] text-[#1c3c8c] hover:bg-[#EFF6FF] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href="https://n2418813.yclients.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-3 w-full inline-flex items-center justify-center"
            >
              Онлайн запись
            </a>
          </div>
        </div>
      )}
      </div>
    </header>
  </>);
}
