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
        const style = window.getComputedStyle(el);
        const fontSize = style.fontSize;
        const fontWeight = style.fontWeight;
        
        // Показываем отладчик для всех элементов, если они содержат текст
        if (el.textContent?.trim()) {
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
