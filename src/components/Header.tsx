import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navigationItems: { label: string; href: string }[] = [
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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const isDesktop = () => window.matchMedia("(min-width: 1280px)").matches;
    let lastY = window.scrollY;
    const onScroll = () => {
      if (!isDesktop()) {
        setPinned(false);
        setVisible(true);
        lastY = window.scrollY;
        return;
      }
      const y = window.scrollY;
      const heroThreshold = window.innerHeight * 0.8;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (y < heroThreshold) {
        setPinned(false);
        setVisible(true);
      } else {
        setPinned((wasPinned) => {
          if (!wasPinned) {
            // Only pin (start showing) when the user scrolls UP past the hero.
            if (goingUp) {
              setVisible(true);
              return true;
            }
            return false;
          }
          if (goingDown) setVisible(false);
          else if (goingUp) setVisible(true);
          return true;
        });
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    const offset = pinned && visible ? "100px" : "0px";
    document.documentElement.style.setProperty("--header-offset", offset);
  }, [pinned, visible]);

  return (
    <>
      <header
      className={`${pinned ? "fixed transition-transform duration-300 ease-out" : "fixed xl:absolute"} top-0 left-0 z-50 w-full bg-transparent pt-4 sm:pt-5 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >

      <div className="container-1900 relative">
      {/* Desktop header */}
      <div className="hidden h-20 w-full items-center justify-between rounded-[12px] border border-[#daebff] bg-white px-5 py-2.5 xl:flex xl:px-[30px]">
        {/* Logo */}
        <div className="flex h-10 w-20 items-center">
          <span
            className="text-[28px] leading-none font-bold italic"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: "#1c3c8c",
            }}
          >
            Logo
          </span>
        </div>

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
          className="btn-primary w-[250px] inline-flex items-center justify-center"
        >
          Онлайн запись
        </a>
      </div>

      {/* Mobile / tablet header */}
      <div className="flex h-16 w-full items-center justify-between rounded-[12px] border border-[#daebff] bg-white px-4 py-2.5 xl:hidden">
        {/* Logo */}
        <div className="flex h-8 items-center">
          <span
            className="text-[24px] leading-none font-bold italic"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: "#1c3c8c",
            }}
          >
            Logo
          </span>
        </div>

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
      </div>
    </header>

    {/* Mobile menu panel */}
    {menuOpen && (
      <div className="fixed inset-x-4 top-[88px] bottom-4 z-40 xl:hidden">
        <div className="flex h-full flex-col rounded-[12px] border border-[#daebff] bg-white p-4">
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
  </>);
}

