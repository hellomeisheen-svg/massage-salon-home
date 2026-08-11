/**
 * Базовая русская типографика: неразрывные пробелы после коротких
 * предлогов/союзов, кавычки-«ёлочки», длинное тире.
 * Текст не меняется — только пробелы и знаки.
 */

const NBSP = "\u00A0";

// Короткие предлоги и союзы, которые нельзя оставлять в конце строки
const SHORT_WORDS = [
  "и",
  "а",
  "но",
  "в",
  "во",
  "на",
  "по",
  "за",
  "к",
  "ко",
  "о",
  "об",
  "от",
  "у",
  "с",
  "со",
  "из",
  "до",
  "для",
  "не",
  "ни",
  "же",
  "ли",
  "бы",
  "то",
  "что",
  "как",
  "или",
];

const shortWordsPattern = SHORT_WORDS.join("|");

export function applyTypography(input: string): string {
  let text = input;

  // 1. Кавычки-«ёлочки»
  text = text.replace(/"([^"]*)"/g, (_m, inner) => `«${inner}»`);

  // 2. Дефис между пробелами -> длинное тире с неразрывным пробелом слева
  text = text.replace(/(\s)[-–]( )/g, `${NBSP}—$2`);

  // 3. Убираем пробел перед знаками препинания
  text = text.replace(/[ \u00A0]+([,;:!?…])/g, "$1");

  // 4. Неразрывный пробел после коротких предлогов/союзов
  const re = new RegExp(
    `(^|[\\s(«"'])(${shortWordsPattern})[ \\t]+(?=[^\\s])`,
    "gi",
  );
  // применяем дважды для последовательностей вида «и в кабинете»
  text = text.replace(re, `$1$2${NBSP}`);
  text = text.replace(re, `$1$2${NBSP}`);

  // 5. Неразрывный пробел перед единицами измерения и знаками
  text = text.replace(/(\d)[ \t]+(₽|%|руб\.?|мин|ч|шт\.?|км|м|кг)\b/g, `$1${NBSP}$2`);

  // 6. Никаких двойных пробелов и лишних переносов
  text = text.replace(/[ \t]{2,}/g, " ");
  text = text.replace(/\u00A0{2,}/g, NBSP);
  text = text.replace(/\n{3,}/g, "\n\n");

  return text;
}

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEXTAREA",
  "INPUT",
  "CODE",
  "PRE",
  "IFRAME",
  "SVG",
  "PATH",
]);

function shouldSkip(node: Node | null): boolean {
  let el = node instanceof Element ? node : node?.parentElement ?? null;
  while (el) {
    if (SKIP_TAGS.has(el.tagName.toUpperCase())) return true;
    if (el.getAttribute?.("data-no-typo") !== null && el.hasAttribute?.("data-no-typo"))
      return true;
    el = el.parentElement;
  }
  return false;
}

/** Проходит по текстовым узлам поддерева и применяет типографику. */
export function typographyPass(root: Node): void {
  if (typeof document === "undefined") return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  if (root.nodeType === Node.TEXT_NODE) nodes.push(root as Text);

  for (const node of nodes) {
    const value = node.nodeValue;
    if (!value || !value.trim()) continue;
    if (shouldSkip(node)) continue;
    const next = applyTypography(value);
    if (next !== value) node.nodeValue = next;
  }
}
