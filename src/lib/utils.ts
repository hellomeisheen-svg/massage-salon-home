import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Из любого ввода достаём до 10 «абонентских» цифр (без кода страны 7/8)
export function extractDigits(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function formatPhone(rest: string) {
  if (!rest) return "";
  let out = `+7 (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

