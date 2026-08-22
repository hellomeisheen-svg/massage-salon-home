import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import Logo from "@/components/Logo";

type NavItem = { label: string; href: string };

const defaultNavigationItems: NavItem[] = [
  { label: "Услуги", href: "/#services" },
    { label: "Преимущества", href: "/#advantages" },
    { label: "Программы", href: "/#programs" },
  { label: "Обо мне", href: "/#obrazovanie" },
  { label: "Вопросы", href: "/#faq" },
  { label: "Контакты", href: "/#contacts" },
];

const servicePages = [
  { label: "Гирудотерапия", to: "/girudoterapiya" },
  { label: "Акупунктурный кетгут", to: "/ketgut" },
  { label: "Вакуумный массаж", to: "/vakuumnyi-massazh" },
  { label: "Векторный массаж", to: "/vektornyi-massazh" },
  { label: "Классический массаж", to: "/klassicheskii-massazh" },
  { label: "Лимфатический массаж", to: "/limfaticheskii-massazh" },
  
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
    
    const handleScroll = () => {
      if (!hero) return;
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
      {/* Blur overlay moved outside header and correctly layered */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-[#EFF6FF]/40 backdrop-blur-[8px] xl:hidden pointer-events-auto" 
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header className="fixed top-0 left-0 z-[70] w-full transition-colors duration-300 bg-transparent pt-4 sm:pt-5" style={{ backgroundColor: heroPassed ? 'rgba(239, 246, 255, 0.8)' : 'transparent', backdropFilter: heroPassed ? 'blur(8px)' : 'none' }}>
        <div className="container-1900 relative">
          {/* Desktop header */}
          <div className="hidden h-20 w-full items-center justify-between ds-card ds-bento-shadow px-5 py-2.5 xl:flex xl:px-[30px]">
            <Link to="/" aria-label="На главную" className="flex h-12 items-center hover:opacity-70 transition-opacity logo-link-active">
              <Logo className="h-full w-auto" />
            </Link>

            <nav aria-label="Основная навигация">
              <ul className="flex items-center gap-[30px]">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-base font-normal leading-[150%] text-[#1c3c8c] hover:opacity-70 transition-opacity text-link-active"
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
              className={`btn-header-cta w-[250px] ${heroPassed ? "btn-header-cta-active" : ""}`}
            >
              Записаться онлайн
            </a>
          </div>

          {/* Mobile / tablet header */}
          {/* Using a higher z-index for the inner elements to ensure they stay above the global overlay if needed, 
              but since it's inside a z-70 header, it's already above the z-60 overlay */}
          <div className="relative z-10 flex h-16 w-full items-center justify-between ds-card ds-bento-shadow px-4 py-2.5 xl:hidden">
            <Link to="/" aria-label="На главную" onClick={() => setMenuOpen(false)} className="flex h-10 items-center hover:opacity-70 transition-opacity logo-link-active">
              <Logo className="h-full w-auto" />
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-[12px] text-[#1c3c8c] hover:bg-[#EFF6FF] transition-colors"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile / tablet menu panel */}
          {menuOpen && (
            <div className="absolute inset-x-4 sm:inset-x-5 top-[calc(100%+8px)] z-10 h-[calc(100dvh-96px)] sm:h-[calc(100dvh-100px)] xl:hidden pointer-events-auto">
              <div className="flex h-full flex-col ds-card p-4">
                <nav className="flex-1 overflow-y-auto pr-1 scrollbar-none" aria-label="Мобильная навигация">
                  <ul className="flex flex-col gap-1">
                    {pathname !== "/" && (
                      <li>
                        <Link
                          to="/"
                          onClick={() => setMenuOpen(false)}
                          className="block w-full rounded-[12px] px-3 py-2.5 text-left text-base font-normal leading-[150%] text-[#1c3c8c] hover:bg-[#EFF6FF] transition-colors text-link-active"
                        >
                          На главную
                        </Link>
                      </li>
                    )}
                    {navigationItems.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block w-full rounded-[12px] px-3 py-2.5 text-left text-base font-normal leading-[150%] text-[#1c3c8c] hover:bg-[#EFF6FF] transition-colors text-link-active"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                    
                    {(pathname === "/" || items !== undefined) && (
                      <>
                        <li className="my-1 border-t border-[#daebff]" />
                        <li>
                          <button
                            type="button"
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="flex w-full items-center justify-between rounded-[12px] px-3 py-2.5 text-left text-base font-normal leading-[150%] text-[#1c3c8c] hover:bg-[#EFF6FF] transition-colors text-link-active"
                          >
                            Выбрать услугу
                            <ChevronDown className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} size={20} />
                          </button>
                          {servicesOpen && (
                            <ul className="mt-1 flex flex-col gap-1 pl-4">
                              {servicePages
                                .filter((service) => service.to !== pathname)
                                .map((service) => (
                                  <li key={service.to}>
                                    <Link
                                      to={service.to}
                                      onClick={() => setMenuOpen(false)}
                                      className="block w-full rounded-[12px] px-3 py-2 text-sm font-normal leading-[150%] text-[#4A5C85] hover:bg-[#EFF6FF] transition-colors text-link-active"
                                    >
                                      {service.label}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
                <div className="mt-auto pt-3">
                  <div className="flex items-center gap-3 border-t border-[#daebff] pt-3">
                    <a
                      href="tel:+79242324611"
                      onClick={() => setMenuOpen(false)}
                      className="text-base font-medium leading-[150%] text-[#1c3c8c] hover:opacity-70 transition-opacity text-link-active"
                    >
                      +7 924 232 46 11
                    </a>
                    <a
                      href="https://max.ru/u/f9LHodD0cOLS1ZC9ThcQkVLRVzcK-MbYZ7JVAg8PC5Tx9LyihgOVdPnzaxM"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Макс — мессенджер Max"
                      className="ml-auto flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#daebff] bg-[#EFF6FF] text-[#1c3c8c] hover:bg-[#DAEBFF] transition-colors icon-btn-active"
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
                    Записаться онлайн
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
