# План настройки блока «Об услуге»

## Файл:
- `src/components/ServicePage.tsx`

## Точный компонент/секция:
- Функция `AboutService` (блок с `id="services"`)

## Что изменится:
Для десктопной версии (от 1380px / xl):
- **Внешний контейнер**: получит ограничение по высоте `xl:max-h-[calc(100vh-140px)]` и `xl:min-h-0`.
- **Левая колонка**: будет зафиксирована (`xl:sticky xl:top-0`), обеспечивая видимость заголовка и навигации.
- **Правая колонка**: получит независимую вертикальную прокрутку (`xl:overflow-y-auto`) при переполнении контентом.
- Будут добавлены классы `scrollbar-none` или аналогичные для сохранения эстетики, если это потребуется.

## Что гарантированно не будет изменено:
- Тексты и контент услуг.
- Заголовки, табы и CTA-кнопки.
- Цены и изображения.
- SEO-разметка и API.
- Мобильная и планшетная версии (до 1380px).
- Все остальные блоки страницы (`Hero`, `Prices`, `Programs` и т.д.).

## Текущая структура:
```tsx
<section id="services" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
  <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-5 items-start">
    <div className="self-start xl:sticky xl:top-[124px] flex flex-col items-center xl:items-start text-center xl:text-left z-10">
      {/* Заголовок и навигация */}
    </div>
    <div className="flex flex-col gap-4">
      {/* Основной контент */}
    </div>
  </div>
</section>
```

## Минимальный diff (логический):
```diff
- <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-5 items-start">
+ <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-5 items-start xl:max-h-[calc(100vh-140px)] xl:min-h-0">
    <div className="self-start xl:sticky xl:top-[124px] ...">
      ...
    </div>
-   <div className="flex flex-col gap-4">
+   <div className="flex flex-col gap-4 xl:overflow-y-auto xl:max-h-full xl:pr-4 scrollbar-none">
      ...
    </div>
  </div>
```

## Проверка:
1. Проверка на Desktop (1280px, 1440px, 1920px).
2. Проверка Mobile и Tablet (отсутствие изменений в поведении).
3. Проверка отсутствия горизонтального скролла.
4. Проверка фиксации левой колонки при прокрутке правой.
5. Запуск `npm run build` для проверки отсутствия ошибок сборки.
