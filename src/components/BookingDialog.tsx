import { useEffect, useRef, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { sendLeadNotification } from "@/lib/notifications.functions";
import { extractDigits, formatPhone } from "@/lib/utils";

export interface BookingDialogProps {
  subject?: string;
  onClose: () => void;
}

export default function BookingDialog({
  subject,
  onClose,
}: BookingDialogProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("whatsapp");
  
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const native = e.nativeEvent as InputEvent;
    const raw = (e.target as HTMLInputElement).value;
    let next = extractDigits(raw);
    const deleting = typeof native?.inputType === "string" && native.inputType.startsWith("delete");
    if (deleting && next === phone) next = next.slice(0, -1);
    setPhone(next);
    if (next.length === 10) setPhoneError(null);
  };

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
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-[#1C3C8C]/40 p-4 backdrop-blur-sm sm:items-center sm:p-6 pointer-events-auto"
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
        className="relative my-auto w-full max-w-[560px] ds-card ds-bento-shadow p-5 sm:p-8 xl:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно записи"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#daebff] bg-[#EFF6FF] text-[#1C3C8C] transition-colors hover:bg-white"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="relative flex flex-col items-center px-2 pt-6 pb-2 text-center sm:px-4 sm:pt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-[12px] bg-[#A2CFFE] blur-2xl opacity-40" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-[12px] border border-[#DAEBFF] bg-white shadow-modal-icon">
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
              Спасибо!
            </h2>
            <p className="mt-4 max-w-[360px] text-[15px] leading-[1.6] text-[#566A93] sm:text-[16px]">
              Свяжусь с вами в течение 15 минут, чтобы уточнить детали и подтвердить время.
            </p>

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
                className="font-noto-serif-narrow ds-h3 text-[#1C3C8C] mb-2"
              >
                Записаться на сеанс
              </h2>
              <p className="mt-3 text-[15px] font-light leading-[1.5] text-[#566A93] sm:text-[16px]">
                Оставьте контакты — подберём формат под ваше состояние и{"\u00A0"}согласуем время без спешки.
              </p>
            </div>

            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                let ok = true;
                if (phone.length !== 10) {
                  setPhoneError("Пожалуйста, введите телефон");
                  ok = false;
                } else {
                  setPhoneError(null);
                }
                if (!consent) {
                  setConsentError(
                    "Пожалуйста, отметьте согласие",
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
                  
                  if (honeypot) {
                    console.warn("Spam detected via honeypot");
                    setSent(true);
                    return;
                  }

                  const name = formData.get("name") as string;
                  const comment = formData.get("comment") as string;
                  const email = formData.get("email") as string;

                  const phoneValue = formatPhone(phone);

                  const { data: leadData, error: insertError } = await supabase
                    .from("leads")
                    .insert([
                      {
                        name,
                        phone: phoneValue,
                        message: `${method.toUpperCase()}${comment ? `: ${comment}` : ""}`,
                        email: email || null,
                      },
                    ])
                    .select("id")
                    .single();

                  if (insertError) throw insertError;

                  if (leadData?.id) {
                    sendLeadNotification({ data: { leadId: leadData.id } })
                      .then((result) => {
                        if (result && !result.success) {
                          console.error("Notification failed:", result.error);
                          toast.error("Заявка принята, но возникла ошибка при отправке уведомления мастеру.");
                        }
                      })
                      .catch((err) => {
                        console.error("Notification error:", err);
                      });
                  }

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
                <span className="text-[14px] leading-[1.5] text-foreground">Ваше имя</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Пожалуйста, укажите имя"
                  className="ds-input"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] leading-[1.5] text-foreground">Номер телефона</span>
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel"
                  value={formatPhone(phone)}
                  onChange={handlePhoneInput}
                  placeholder="+7 (___) ___-__-__"
                  className="ds-input"
                />
                {phoneError && (
                  <span className="text-[13px] leading-[1.5] text-[#C0392B]">{phoneError}</span>
                )}
              </label>

              <div className="space-y-2">
                <span className="text-[14px] leading-[1.5] text-foreground block">Где вам удобнее ответить?</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "whatsapp", label: "WhatsApp" },
                    { id: "telegram", label: "Telegram" },
                    { id: "max", label: "Max" },
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`ds-toggle ${method === m.id ? "ds-toggle-active" : ""}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] leading-[1.5] text-foreground">Комментарий</span>
                <textarea
                  name="comment"
                  rows={4}
                  defaultValue={subject ? `${subject}: ` : ""}
                  placeholder="Самочувствие, пожелания, удобное время"
                  className="ds-input !pt-4 py-3 resize-none align-top"
                />
              </label>

              <div className="flex flex-col gap-1.5">
                <label className="flex items-start gap-3 cursor-pointer" htmlFor="consent-checkbox">
                  <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                    <input
                      id="consent-checkbox"
                      type="checkbox"
                      name="consent"
                      checked={consent}
                      aria-invalid={!!consentError}
                      aria-describedby={consentError ? "consent-error" : undefined}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (e.target.checked) setConsentError(null);
                      }}
                      className="peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[12px] border border-[#A2CFFE] bg-[#EFF6FF] transition-colors hover:border-[#5DAAFD] checked:border-[#88C1FF] checked:bg-[#88C1FF] checked:hover:bg-[#5DAAFD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5DAAFD]"
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
                      Политикой конфиденциальности
                    </a>
                    .
                  </span>
                </label>
                {consentError && (
                  <p id="consent-error" className="text-[13px] leading-[1.5] text-[#C0392B]">{consentError}</p>
                )}
              </div>

              {error && (
                <p className="text-[13px] leading-[1.5] text-[#C0392B] text-center">{error}</p>
              )}

              <div className="absolute opacity-0 -z-10 w-0 h-0 overflow-hidden" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              
              <button 
                type="submit" 
                className="btn-primary mt-2 w-full h-14 flex items-center justify-center gap-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Отправка...</span>
                  </>
                ) : (
                  "Записаться"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
