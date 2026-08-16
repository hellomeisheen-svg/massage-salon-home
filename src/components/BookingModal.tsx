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
import { sendLeadNotification } from "@/lib/notifications.functions";

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
  const [method, setMethod] = useState("whatsapp");
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
          <div className="relative flex flex-col items-center px-2 pt-6 pb-2 text-center sm:px-4 sm:pt-8">
            {/* Success icon with halo */}
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-[#A2CFFE] blur-2xl opacity-40" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#DAEBFF] bg-white shadow-lg shadow-[#A2CFFE]/25">
                <svg
                  className="h-10 w-10 text-[#1C3C8C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2
              id="booking-title"
              className="font-noto-serif-narrow ds-h3 text-[#1C3C8C]"
            >
              Ваш визит забронирован
            </h2>
            <p className="mt-4 max-w-[360px] text-[15px] leading-[1.6] text-[#566A93] sm:text-[16px]">
              Мы создадим для вас атмосферу полного спокойствия в&nbsp;«Седьмом небе». Администратор свяжется с&nbsp;вами, чтобы уточнить детали и&nbsp;подтвердить время.
            </p>

            <div className="mt-8 w-full rounded-2xl border border-[#DAEBFF] bg-[#EFF6FF] p-5 text-left">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[12px] font-medium uppercase tracking-wider text-[#566A93]">
                  Что дальше
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-[14px] leading-[1.5] text-[#566A93]">
                <li className="flex gap-2">
                  <span className="text-[#1C3C8C]">1.</span>
                  <span>Перезвоним вам в&nbsp;ближайшее время</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1C3C8C]">2.</span>
                  <span>Подберём удобный день и&nbsp;время</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1C3C8C]">3.</span>
                  <span>Встретимся в&nbsp;кабинете на&nbsp;сеанс</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:px-0">
              <a
                href="https://n2418813.yclients.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex w-full items-center justify-center"
              >
                Записаться онлайн
              </a>
              <button
                type="button"
                onClick={onClose}
                className="text-[14px] font-medium text-[#566A93] transition-colors hover:text-[#1C3C8C]"
              >
                Закрыть окно
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
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
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

                setLoading(true);
                try {
                  const formData = new FormData(e.currentTarget);
                  const honeypot = formData.get("website") as string;
                  
                  // Silent drop if honeypot is filled (bot detection)
                  if (honeypot) {
                    console.warn("Spam detected via honeypot");
                    setSent(true);
                    return;
                  }

                  const name = formData.get("name") as string;
                  const comment = formData.get("comment") as string;
                  const email = formData.get("email") as string;

                  const { error: insertError } = await supabase.from("leads").insert([
                    {
                      name,
                      phone: formatPhone(phone),
                      message: comment,
                      email: email || null,
                    },
                  ]);

                  if (insertError) throw insertError;

                  // Fire-and-forget notification by phone number 
                  // since we don't have the new ID from anon insert without .select()
                  sendLeadNotification({ data: { phone: formatPhone(phone) } }).catch(err => {
                    console.error("Failed to trigger lead notification:", err);
                  });

                  setSent(true);
                } catch (err) {
                  console.error("Lead submission error:", err);
                  setError("Не удалось отправить заявку. Попробуйте ещё раз.");
                } finally {
                  setLoading(false);
                }
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
                  defaultValue={subject ? `${subject}: ` : ""}
                  placeholder="Самочувствие, пожелания, удобное время"
                  className="rounded-[0.5rem] border border-[#daebff] bg-[#EFF6FF] px-4 py-3 text-[16px] leading-[1.6] text-foreground outline-none transition-colors placeholder:text-[#566A93] focus:border-[#1C3C8C] focus:bg-white"
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

              {error && (
                <p className="text-[13px] leading-[1.5] text-[#C0392B] text-center">{error}</p>
              )}

              <div className="absolute opacity-0 -z-10 w-0 h-0 overflow-hidden" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              
              <button 

                type="submit" 
                className="btn-primary mt-2 w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                {loading ? "Отправка..." : "Отправить заявку"}
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
