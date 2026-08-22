# План: Липкая левая колонка в блоке «Об услуге»

Внесение точечного изменения в компонент `AboutService` для обеспечения фиксации левой колонки и независимой прокрутки правой колонки на десктопных устройствах (от 1280px).

## Файл
- `src/components/ServicePage.tsx`

## Точный компонент/секция
- Компонент `AboutService` (строки 193–300).

## Что изменится
1. **Внешний контейнер (секция `services`):**
   - Для десктопа (`xl:`) будет добавлена фиксированная высота `h-[calc(100vh-100px)]` (где 100px — высота хедера).
2. **Внутренний grid-контейнер:**
   - Для десктопа (`xl:`) будет добавлена высота `h-full`.
3. **Левая колонка:**
   - Будет иметь `xl:sticky`, `xl:top-0` и `xl:h-full`.
   - Будет обеспечена фиксация содержимого (заголовок и навигация).
4. **Правая колонка:**
   - Для десктопа (`xl:`) будет добавлена независимая прокрутка: `xl:h-full`, `xl:overflow-y-auto`, `xl:min-h-0`.

## Что гарантированно не будет изменено
- Тексты, изображения, CTA-кнопки, цены, цвета, шрифты.
- Логика табов и скролл-шпиона (scrollspy).
- Мобильная и планшетная версии (поведение останется стандартным — прокрутка всей страницы).
- Другие компоненты и API.

## Текущая структура JSX блока AboutService
```jsx
<section id="services" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
  <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-5 items-start">
    {/* Левая колонка */}
    <div className="self-start xl:sticky xl:top-[124px] flex flex-col items-center xl:items-start text-center xl:text-left z-10">
      ...
    </div>
    {/* Правая колонка */}
    <div className="flex flex-col gap-4">
      ...
    </div>
  </div>
</section>
```

## Минимальный diff (набросок)
```diff
- <section id="services" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
-   <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-5 items-start">
+ <section id="services" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section xl:h-[calc(100vh-100px)] xl:overflow-hidden">
+   <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-5 items-start xl:h-full">
-     <div className="self-start xl:sticky xl:top-[124px] flex flex-col items-center xl:items-start text-center xl:text-left z-10">
+     <div className="self-start xl:sticky xl:top-0 xl:h-full flex flex-col items-center xl:items-start text-center xl:text-left z-10 xl:py-10">
        ...
      </div>
-     <div className="flex flex-col gap-4">
+     <div className="flex flex-col gap-4 xl:h-full xl:overflow-y-auto xl:min-h-0 xl:py-10 hide-scrollbar">
        ...
      </div>
    </div>
</section>
```

## Проверка
- **Desktop (1280+, 1440+, 1920+):** Левая колонка стоит на месте, правая крутится.
- **Mobile/Tablet:** Обычный скролл страницы, никакого внутреннего скролла в колонках.
- **Консоль:** Отсутствие ошибок.
- **Сборка:** `npm run build` проходит без ошибок.
