import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const dist = new URL("dist/", root);
const siteOrigin = "https://7heavenmassage.ru";

const pages = [
  {
    path: "/",
    title: "Седьмое небо — массаж и оздоровительные практики в Трудовом",
    description:
      "Массаж и оздоровительные практики в посёлке Трудовое рядом с Владивостоком и Артёмом. Классический, вакуумный, лимфодренажный и векторный массаж, запись.",
    ogTitle: "Седьмое небо — массаж и оздоровительные практики в Трудовом",
    ogDescription:
      "Массаж, вакуумный массаж, гирудотерапия в кабинете Седьмое небо. Место, где можно замедлиться и вернуться к себе без спешки.",
    ogImage: "https://7heavenmassage.ru/images/hero-portrait-solid.webp",
    heading: "Массаж и оздоровительные практики в Трудовом",
    text: "Помогаю убрать напряжение, отёки и боли, вернуть лёгкость движений и бережно поддержать самочувствие.",
  },
  {
    path: "/girudoterapiya",
    title: "Гирудотерапия в Трудовом — цена и запись | Седьмое небо",
    description:
      "Гирудотерапия в посёлке Трудовое рядом с Владивостоком и Артёмом. Информация о процедуре, подготовке, противопоказаниях, стоимости и записи.",
    ogTitle: "Гирудотерапия в Трудовом — Седьмое небо",
    ogDescription:
      "Медицинские и косметические пиявки в кабинете Седьмое небо: мягкая процедура, стерильные материалы, внимательное сопровождение до и после сеанса.",
    ogImage: "https://7heavenmassage.ru/images/uslugi-girudoterapiya-litsa.webp",
    heading: "Гирудотерапия в Трудовом рядом с Владивостоком",
    text: "Практика с медицинскими пиявками для поддержания самочувствия и ощущения лёгкости.",
  },
  {
    path: "/ketgut",
    title: "Акупунктурный кетгут в Трудовом — консультация и запись",
    description:
      "Акупунктурный кетгут в посёлке Трудовое рядом с Владивостоком. Описание процедуры, материалы, противопоказания, подготовка и запись на консультацию.",
    ogTitle: "Акупунктурный кетгут в Трудовом — Седьмое небо",
    ogDescription:
      "Постановка нитей в акупунктурные точки в кабинете Седьмое небо (Трудовое). Запись из Владивостока и Артёма.",
    ogImage: "https://7heavenmassage.ru/images/uslugi-ketgut.webp",
    heading: "Акупунктурный кетгут в Трудовом",
    text: "Постановка рассасывающихся нитей в акупунктурные точки после предварительной консультации.",
  },
  {
    path: "/vakuumnyj-massazh",
    title: "Вакуумный массаж банками в Трудовом — цена и запись",
    description:
      "Вакуумный массаж банками в Трудовом рядом с Владивостоком и Артёмом. Стеклянные и мягкие банки, длительность, ограничения, стоимость и запись.",
    ogTitle: "Вакуумный массаж банками в Трудовом — Седьмое небо",
    ogDescription:
      "Стеклянные и мягкие банки в кабинете Седьмое небо: бережное вакуумное воздействие, спокойный ритм сеанса и внимательное сопровождение.",
    ogImage: "https://7heavenmassage.ru/images/uslugi-myagkie-banki.webp",
    heading: "Вакуумный массаж банками в Трудовом",
    text: "Мягкая работа с мышечным напряжением, ощущением тяжести и локальными зонами тела.",
  },
  {
    path: "/klassicheskij-massazh",
    title: "Классический массаж в Трудовом — цена и запись",
    description:
      "Классический массаж в Трудовом рядом с Владивостоком и Артёмом. Массаж всего тела, спины и шеи, головы, лица, ног и стоп. Стоимость и запись.",
    ogTitle: "Классический массаж в Трудовом — Седьмое небо",
    ogDescription:
      "Комплексная проработка тела в спокойном ритме в кабинете Седьмое небо: расслабление и восстановление сил.",
    ogImage: "https://7heavenmassage.ru/images/uslugi-klassicheskii-massazh.webp",
    heading: "Классический массаж в Трудовом",
    text: "Персональный сеанс массажа для расслабления, восстановления и ощущения лёгкости в теле.",
  },
  {
    path: "/limfodrenazhnyj-massazh",
    title: "Лимфодренажный массаж в Трудовом — цена и запись",
    description:
      "Мягкий лимфодренажный массаж в Трудовом рядом с Владивостоком и Артёмом. Ощущение лёгкости, противопоказания, подготовка, стоимость и запись.",
    ogTitle: "Лимфодренажный массаж в Трудовом — Седьмое небо",
    ogDescription:
      "Мягкая работа со всем телом в кабинете Седьмое небо и обсуждение самочувствия перед сеансом.",
    ogImage: "https://7heavenmassage.ru/images/uslugi-limfodrenazhnyi-massazh.webp",
    heading: "Лимфодренажный массаж в Трудовом",
    text: "Деликатная техника для работы с ощущением отёчности, тяжести и усталости.",
  },
  {
    path: "/vektornyj-massazh",
    title: "Векторный массаж в Трудовом — цена и запись",
    description:
      "Векторный массаж в Трудовом рядом с Владивостоком и Артёмом. Индивидуальная работа с мышечным напряжением, длительность сеанса, ограничения и запись.",
    ogTitle: "Векторный массаж в Трудовом — Седьмое небо",
    ogDescription:
      "Точная работа по анатомическим линиям тела в кабинете Седьмое небо: спокойный ритм и внимательное сопровождение.",
    ogImage: "https://7heavenmassage.ru/images/uslugi-massazh-spiny-i-shei.webp",
    heading: "Векторный массаж в Трудовом",
    text: "Точечная и направленная работа с зонами напряжения в спокойной обстановке кабинета.",
  },
  {
    path: "/privacy-policy",
    title: "Политика конфиденциальности — Седьмое небо",
    description: "Политика конфиденциальности сайта кабинета Седьмое небо.",
    heading: "Политика конфиденциальности",
    text: "Условия обработки персональных данных на сайте кабинета Седьмое небо.",
    noindex: true,
  },
];

const notFound = {
  path: "/404",
  title: "Страница не найдена — Седьмое небо",
  description: "Запрашиваемая страница не существует или была перемещена.",
  heading: "Страница не найдена",
  text: "Проверьте адрес или перейдите к услугам кабинета Седьмое небо.",
  noindex: true,
};

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function renderPage(template, page) {
  const canonical = `${siteOrigin}${page.path === "/" ? "/" : page.path}`;
  const robots = page.noindex ? "noindex, follow" : "index, follow";
  const head = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:title" content="${escapeHtml(page.ogTitle ?? page.title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.ogDescription ?? page.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Седьмое небо">`,
    `<meta property="og:image" content="${page.ogImage ?? `${siteOrigin}/images/hero-portrait-solid.webp`}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ].join("\n    ");

  const content = `<main data-prerendered="true"><nav aria-label="Хлебные крошки"><a href="/">Главная</a>${page.path === "/" ? "" : ` <span>/</span> <a href="/">Услуги</a>`}</nav><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.text)}</p><p><a href="/">Вернуться на главную</a> <a href="/vakuumnyj-massazh">Все услуги</a></p></main>`;
  return template
    .replace(/<title>[\s\S]*?<\/title>/i, head)
    .replace(/<meta property="og:image"[\s\S]*?<meta name="twitter:image"[^>]*>/i, "")
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
}

const template = await readFile(join(dist.pathname, "index.html"), "utf8");
for (const page of pages) {
  const directory = join(dist.pathname, page.path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), renderPage(template, page));
}
await writeFile(join(dist.pathname, "404.html"), renderPage(template, notFound));
console.log(`Prerendered ${pages.length} pages and 404.html`);
