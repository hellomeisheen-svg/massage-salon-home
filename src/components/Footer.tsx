import { MapPin, Phone, Mail, Instagram, Send } from "lucide-react";

const headingStyle = {
  fontFamily: "'Roslindale Cyrillic Display Condensed', serif",
  color: "#1c3c8c",
  letterSpacing: "0.01em",
} as const;

const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Программы", href: "#programs" },
  { label: "Образование", href: "#obrazovanie" },
  { label: "Вопросы", href: "#faq" },
];

const services = [
  "Классический массаж",
  "Лимфодренажный массаж",
  "Массаж лица",
  "Гирудотерапия",
  "Массаж головы",
];

const ADDRESS = "Москва, ул. Тверская, 15";
const MAP_QUERY = encodeURIComponent(ADDRESS);

export function Footer() {
  return (
    <footer id="contacts" className="bg-[#EFF6FF] pt-[60px] xl:pt-[100px] pb-8">
      <div className="container-1900">
        {/* Top card: map + contacts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 rounded-[12px] border border-[#daebff] bg-white p-5 xl:p-[30px]">
          {/* Map */}
          <div className="relative rounded-[12px] overflow-hidden border border-[#daebff] min-h-[320px] xl:min-h-[440px]">
            <iframe
              title="Карта — расположение кабинета"
              src={`https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, filter: "grayscale(0.15) contrast(0.95)" }}
            />
          </div>

          {/* Contacts */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h2
                className="text-[30px] xl:text-[44px] leading-[1.1]"
                style={headingStyle}
              >
                Как найти
                <br />
                кабинет
              </h2>
              <p className="mt-4 xl:mt-5 text-[#1c3c8c]/70 text-[15px] xl:text-base leading-[150%] max-w-[440px] font-light">
                Уютное пространство в центре города — приходите за пятнадцать минут до сеанса, чтобы спокойно выдохнуть.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 rounded-[12px] border border-[#daebff] bg-[#EFF6FF] px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#daebff] text-[#1c3c8c]">
                  <MapPin size={18} strokeWidth={1.5} />
                </span>
                <div className="text-[#1c3c8c] leading-[150%] font-light">
                  <div className="text-xs uppercase tracking-wider opacity-60">Адрес</div>
                  <div className="text-[15px] xl:text-base">{ADDRESS}</div>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-[12px] border border-[#daebff] bg-[#EFF6FF] px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#daebff] text-[#1c3c8c]">
                  <Phone size={18} strokeWidth={1.5} />
                </span>
                <div className="text-[#1c3c8c] leading-[150%] font-light">
                  <div className="text-xs uppercase tracking-wider opacity-60">Телефон</div>
                  <a href="tel:+79000000000" className="text-[15px] xl:text-base hover:opacity-70 transition-opacity">
                    +7 (900) 000-00-00
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-[12px] border border-[#daebff] bg-[#EFF6FF] px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#daebff] text-[#1c3c8c]">
                  <Mail size={18} strokeWidth={1.5} />
                </span>
                <div className="text-[#1c3c8c] leading-[150%] font-light">
                  <div className="text-xs uppercase tracking-wider opacity-60">Почта</div>
                  <a href="mailto:hello@zlobina.ru" className="text-[15px] xl:text-base hover:opacity-70 transition-opacity">
                    hello@zlobina.ru
                  </a>
                </div>
              </li>
            </ul>

            <a
              href="https://n2418813.yclients.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center w-full xl:w-[280px]"
            >
              Онлайн запись
            </a>
          </div>
        </div>

        {/* Bottom band */}
        <div className="mt-5 rounded-[12px] border border-[#daebff] bg-white p-5 xl:p-[30px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <span
                className="text-[28px] leading-none italic"
                style={{ fontFamily: "'Dancing Script', cursive", color: "#1c3c8c" }}
              >
                Logo
              </span>
              <p className="mt-4 text-[#1c3c8c]/70 leading-[150%] text-[15px] font-light max-w-[320px]">
                Кабинет оздоровительных практик Татьяны Злобиной. Спокойный ритм и внимание к каждому состоянию.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#daebff] bg-[#EFF6FF] text-[#1c3c8c] hover:bg-[#DAEBFF] transition-colors"
                >
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  aria-label="Telegram"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#daebff] bg-[#EFF6FF] text-[#1c3c8c] hover:bg-[#DAEBFF] transition-colors"
                >
                  <Send size={18} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Nav */}
            <div>
              <div className="text-xs uppercase tracking-wider text-[#1c3c8c]/60">Навигация</div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[15px] leading-[150%] text-[#1c3c8c] hover:opacity-70 transition-opacity font-light"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <div className="text-xs uppercase tracking-wider text-[#1c3c8c]/60">Услуги</div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {services.map((s) => (
                  <li
                    key={s}
                    className="text-[15px] leading-[150%] text-[#1c3c8c] font-light"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-[#daebff] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-[13px] text-[#1c3c8c]/60 font-light">
              © {new Date().getFullYear()} Татьяна Злобина. Все права защищены.
            </p>
            <p className="text-[13px] text-[#1c3c8c]/60 font-light">
              Информация не является публичной офертой
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
