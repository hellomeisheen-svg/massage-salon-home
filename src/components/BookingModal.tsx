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
import { Check, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

// Из любого ввода достаём до 10 «абонентских» цифр (без кода страны 7/8)
function extractDigits(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

function formatPhone(rest: string) {
  if (!rest) return "";
  let out = `+7 (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}



function BookingDialog({
  subject,
  onClose,
}: {
  subject?: string;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const native = e.nativeEvent as InputEvent;
    const raw = (e.target as HTMLInputElement).value;
    let next = extractDigits(raw);
    const deleting = typeof native?.inputType === "string" && native.inputType.startsWith("delete");
    // при удалении разделителя цифры не меняются — убираем последнюю цифру
    if (deleting && next === phone) next = next.slice(0, -1);
    setPhone(next);
    if (next.length === 10) setPhoneError(null);
  };


  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
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
        className="relative my-auto w-full max-w-[560px] ds-card p-5 sm:p-8 xl:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно записи"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-[0.5rem] border border-[#daebff] bg-[#EFF6FF] text-[#1C3C8C] transition-colors hover:bg-white"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="pr-12">
            <h2
              id="booking-title"
              className="font-noto-serif-narrow ds-h3 text-[#1C3C8C]"
            >
              Заявка отправлена
            </h2>
            <p className="mt-4 text-[15px] leading-[1.5] text-[#566A93] sm:text-[16px]">
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
                className="font-noto-serif-narrow ds-h3 text-[#1C3C8C]"
              >
                Записаться на&nbsp;сеанс
              </h2>
              <p className="mt-3 text-[15px] leading-[1.5] text-[#566A93] sm:text-[16px]">
                Оставьте контакты&nbsp;— подберём формат под&nbsp;ваше состояние
                и&nbsp;согласуем время без&nbsp;спешки.
              </p>
            </div>

            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                let ok = true;
                if (phone.length !== 10) {

                  setPhoneError("Введите номер телефона полностью");
                  ok = false;
                } else {
                  setPhoneError(null);
                }
                if (!consent) {
                  setConsentError(
                    "Отметьте согласие с политикой конфиденциальности, чтобы отправить заявку",
                  );
                  ok = false;
                } else {
                  setConsentError(null);
                }
                if (!ok) return;
                setSent(true);
              }}
            >
              <label className="flex flex-col gap-2">
                <span className="text-[14px] leading-[1.5] text-foreground">Имя</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
                  className="h-[52px] rounded-[0.5rem] border border-[#daebff] bg-[#EFF6FF] px-4 text-[16px] text-foreground outline-none transition-colors placeholder:text-[#566A93] focus:border-[#1C3C8C] focus:bg-white"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] leading-[1.5] text-foreground">Телефон</span>
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel"
                  value={formatPhone(phone)}
                  onChange={handlePhoneInput}
                  placeholder="+7 (___) ___-__-__"
                  className="h-[52px] rounded-[0.5rem] border border-[#daebff] bg-[#EFF6FF] px-4 text-[16px] text-foreground outline-none transition-colors placeholder:text-[#566A93] focus:border-[#1C3C8C] focus:bg-white"
                />
                {phoneError && (
                  <span className="text-[13px] leading-[1.5] text-[#C0392B]">{phoneError}</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] leading-[1.5] text-foreground">Комментарий</span>
                <textarea
                  name="comment"
                  rows={3}
                  placeholder="Самочувствие, пожелания, удобное время"
                  className="rounded-[0.5rem] border border-[#daebff] bg-[#EFF6FF] px-4 py-3 text-[16px] leading-[1.5] text-foreground outline-none transition-colors placeholder:text-[#566A93] focus:border-[#1C3C8C] focus:bg-white"
                />
              </label>

              <label className="flex items-start gap-3">
                <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (e.target.checked) setConsentError(null);
                    }}
                    className="peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[6px] border border-[#A2CFFE] bg-[#EFF6FF] transition-colors hover:border-[#5DAAFD] checked:border-[#88C1FF] checked:bg-[#88C1FF] checked:hover:bg-[#5DAAFD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5DAAFD]"
                  />
                  <Check
                    size={14}
                    strokeWidth={3}
                    className="pointer-events-none absolute text-white opacity-0 transition-opacity peer-checked:opacity-100"
                  />
                </span>

                <span className="text-[13px] leading-[1.5] text-[#566A93]">
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
