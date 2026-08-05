import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

const heading = "'Roslindale Cyrillic Display Condensed', serif";

type BookingContextValue = {
  openBooking: (subject?: string) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

const services = [
  "Классический массаж",
  "Массаж лица",
  "Векторный массаж",
  "Лимфодренажный массаж",
  "Баночный массаж",
  "Гирудотерапия",
  "Программы восстановления",
  "Не знаю — подберём вместе",
];

function BookingDialog({
  subject,
  onClose,
}: {
  subject?: string;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-[#1C3C8C]/40 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) onClose();
      }}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative my-auto w-full max-w-[560px] rounded-[12px] border border-[#daebff] bg-white p-5 sm:p-8 xl:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно записи"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#daebff] bg-[#EFF6FF] text-[#1C3C8C] transition-colors hover:bg-white"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="pr-12">
            <h2
              id="booking-title"
              className="text-[26px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[32px]"
              style={{ fontFamily: heading }}
            >
              Заявка отправлена
            </h2>
            <p className="mt-4 text-[15px] leading-[1.5] text-[#8D9DC5] sm:text-[16px]">
              Я&nbsp;свяжусь с&nbsp;вами, чтобы подобрать удобное время. Если хочется
              выбрать слот прямо сейчас&nbsp;— воспользуйтесь онлайн-записью.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://n2418813.yclients.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex w-full items-center justify-center sm:flex-1"
              >
                Онлайн запись
              </a>
              <button type="button" onClick={onClose} className="btn-secondary w-full sm:flex-1">
                Закрыть
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="pr-12">
              <h2
                id="booking-title"
                className="text-[26px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[32px]"
                style={{ fontFamily: heading }}
              >
                Записаться на&nbsp;сеанс
              </h2>
              <p className="mt-3 text-[15px] leading-[1.5] text-[#8D9DC5] sm:text-[16px]">
                Оставьте контакты&nbsp;— подберём формат под&nbsp;ваше состояние
                и&nbsp;согласуем время без&nbsp;спешки.
              </p>
            </div>

            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="flex flex-col gap-2">
                <span className="text-[14px] leading-[1.5] text-[#1C3C8C]">Имя</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
                  className="h-[52px] rounded-lg border border-[#daebff] bg-[#EFF6FF] px-4 text-[16px] text-[#1C3C8C] outline-none transition-colors placeholder:text-[#8D9DC5] focus:border-[#1C3C8C] focus:bg-white"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] leading-[1.5] text-[#1C3C8C]">Телефон</span>
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="+7 (___) ___-__-__"
                  className="h-[52px] rounded-lg border border-[#daebff] bg-[#EFF6FF] px-4 text-[16px] text-[#1C3C8C] outline-none transition-colors placeholder:text-[#8D9DC5] focus:border-[#1C3C8C] focus:bg-white"
                />
                {phoneError && (
                  <span className="text-[13px] leading-[1.5] text-[#C0392B]">{phoneError}</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] leading-[1.5] text-[#1C3C8C]">Комментарий</span>
                <textarea
                  name="comment"
                  rows={3}
                  placeholder="Самочувствие, пожелания, удобное время"
                  className="rounded-lg border border-[#daebff] bg-[#EFF6FF] px-4 py-3 text-[16px] leading-[1.5] text-[#1C3C8C] outline-none transition-colors placeholder:text-[#8D9DC5] focus:border-[#1C3C8C] focus:bg-white"
                />
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (e.target.checked) setConsentError(null);
                  }}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-[6px] border border-[#daebff] accent-[#1C3C8C]"
                />
                <span className="text-[13px] leading-[1.5] text-[#8D9DC5]">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    политикой конфиденциальности
                  </a>
                  .
                </span>
              </label>
              {consentError && (
                <p className="text-[13px] leading-[1.5] text-[#C0392B]">{consentError}</p>
              )}

              <button type="submit" className="btn-primary mt-2 w-full">
                Отправить заявку
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>(undefined);

  const openBooking = useCallback((s?: string) => {
    setSubject(s);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {open && <BookingDialog subject={subject} onClose={closeBooking} />}
    </BookingContext.Provider>
  );
}
