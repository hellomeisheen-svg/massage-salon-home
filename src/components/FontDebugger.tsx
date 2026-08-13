import { useEffect } from "react";

/**
 * Временный компонент для отладки размеров шрифтов.
 * Добавляет атрибут data-font-debug ко всем текстовым элементам,
 * чтобы при наведении показывался их текущий размер.
 */
export function FontDebugger() {
  useEffect(() => {
    // Функция для обновления подсказок
    const updateDebugInfo = () => {
      const elements = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, span, a, button, li"
      );
      
      elements.forEach((el) => {
        // Пропускаем элементы внутри других уже помеченных элементов, 
        // если они имеют такой же размер, чтобы не спамить
        const style = window.getComputedStyle(el);
        const fontSize = style.fontSize;
        const fontWeight = style.fontWeight;
        
        // Добавляем только если элемент содержит текст
        if (el.textContent?.trim() && el.children.length === 0) {
          el.setAttribute("data-font-debug", `${fontSize} / w${fontWeight}`);
        } else if (el.tagName.startsWith('H')) {
           // Для заголовков всегда показываем
           el.setAttribute("data-font-debug", `${fontSize} / w${fontWeight}`);
        }
      });
    };

    // Запускаем через небольшую паузу после рендера и при изменениях DOM
    const timer = setTimeout(updateDebugInfo, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}
