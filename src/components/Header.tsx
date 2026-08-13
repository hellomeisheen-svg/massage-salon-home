import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import Logo from "@/components/Logo";

type NavItem = { label: string; href: string };

const defaultNavigationItems: NavItem[] = [
  { label: "Услуги", href: "#services" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Программы", href: "#programs" },
  { label: "Обо мне", href: "#obrazovanie" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const servicePages = [
  { label: "Гирудотерапия", to: "/girudoterapiya" },
  { label: "Акупунктурный кетгут", to: "/ketgut" },
  { label: "Банки", to: "/banki" },
  { label: "Классический массаж", to: "/klassicheskii-massazh" },
  { label: "Лимфатический массаж", to: "/limfaticheskii-massazh" },
  { label: "Лимфодренажный массаж", to: "/limfodrenazhnyi-massazh" },
  { label: "Векторный массаж", to: "/vektornyi-massazh" },
] as const;


export function Header({
  items,
  showServicesMenu = true,
}: {
  items?: NavItem[];
  showServicesMenu?: boolean;
} = {}) {
  const navigationItems = items ?? defaultNavigationItems;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
        <Link to="/" aria-label="На главную" className="flex h-12 items-center hover:opacity-70 transition-opacity">
          <Logo className="h-full w-auto" />
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
        <Link to="/" aria-label="На главную" onClick={() => setMenuOpen(false)} className="flex h-10 items-center hover:opacity-70 transition-opacity">
          <Logo className="h-full w-auto" />
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
                <li>
                  <Link
                    to="/#services"
                    onClick={() => {
                      setMenuOpen(false);
                      setServicesOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-normal leading-[150%] text-[#1c3c8c] hover:bg-[#EFF6FF] transition-colors"
                  >
                    Все услуги
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="mt-3 flex items-center gap-3 border-t border-[#daebff] pt-3">
              <a
                href="tel:+79242324611"
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium leading-[150%] text-[#1c3c8c] hover:opacity-70 transition-opacity"
              >
                +7 924 232 46 11
              </a>
              <a
                href="https://max.ru/u/f9LHodD0cOLS1ZC9ThcQkVLRVzcK-MbYZ7JVAg8PC5Tx9LyihgOVdPnzaxM"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Макс — мессенджер"
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-[0.5rem] border border-[#daebff] bg-[#EFF6FF] text-[#1c3c8c] hover:bg-[#DAEBFF] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 720 720"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
                </svg>
              </a>
            </div>
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
