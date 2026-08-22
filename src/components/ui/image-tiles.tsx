import { motion } from "framer-motion";

interface ImageRevealProps {
  leftImage: string;
  middleImage: string;
  rightImage: string;
  spread?: number;
}

export default function ImageReveal({
  leftImage,
  middleImage,
  rightImage,
}: ImageRevealProps) {
  const tileBase =
    "absolute overflow-hidden rounded-[12px] bg-white ds-bento-shadow";

  const tiles = [
    { src: leftImage, zIndex: 10, left: "20px", top: "40px", rot: "-8deg", delay: 0 },
    { src: middleImage, zIndex: 20, left: "80px", top: "30px", rot: "4deg", delay: 0.15 },
    { src: rightImage, zIndex: 30, left: "140px", top: "40px", rot: "8deg", delay: 0.3 },
  ];

  return (
    <div className="relative h-[240px] w-[280px]">
      {tiles.map((tile, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: tile.delay, ease: "easeOut" }}
          className={`${tileBase} h-[170px] w-[120px]`}
          style={{
            zIndex: tile.zIndex,
            left: tile.left,
            top: tile.top,
            rotate: tile.rot,
          }}
        >
          <motion.div
            className="h-[calc(100%+12px)] w-full"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tile.delay,
            }}
          >
            <img
              src={tile.src}
              alt="'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Проведи аудит и предоставь отчет! Выступи как технический SEO-специалист и проведи полный SEO-аудит текущего проекта.\n\nЦель проекта:\n\n[опиши нишу, услугу или товар]\n\nЦелевая аудитория:\n\n[опиши целевую аудиторию]\n\nОсновной регион продвижения:\n\n[город, страна или несколько регионов]\n\nОсновные ключевые запросы:\n\n[вставь ключевые слова]\n\nПроверь:\n\n1. Структуру страниц и URL.\n\n2. Наличие и уникальность title и meta description.\n\n3. Корректность H1, H2 и иерархии заголовков.\n\n4. Логику размещения ключевых слов.\n\n5. Соответствие текста поисковому намерению пользователя.\n\n6. Дублирование заголовков, мета-тегов и контента.\n\n7. Canonical, robots.txt и sitemap.xml, если они предусмотрены.\n\n8. Индексацию важных страниц.\n\n9. Внутреннюю перелинковку.\n\n10. Alt-тексты изображений.\n\n11. Schema.org и структурированные данные.\n\n12. Open Graph и превью ссылок в социальных сетях.\n\n13. Мобильную версию.\n\n14. Скорость загрузки и возможные проблемы Core Web Vitals.\n\n15. Семантическую HTML-разметку.\n\n16. Доступность элементов для поисковых роботов и пользователей.\n\n17. Локальные SEO-сигналы, если проект ориентирован на конкретный город.\n\n18. Ошибки, которые могут препятствовать индексации.\n\nПравила:\n\n- Сначала только проанализируй проект.\n\n- Не изменяй код, тексты или структуру без моего отдельного подтверждения.\n\n- Если данных недостаточно, укажи, чего именно не хватает.\n\n- Не выдумывай результаты тестов, если ты не можешь их реально выполнить.\n\n- Для каждого обнаруженного нарушения укажи конкретный файл, компонент или блок, если это возможно.\n\n- Разделяй критические, важные и второстепенные проблемы.\n\nПосле проверки подготовь отчёт в формате:\n\n# SEO-аудит\n\n## 1. Общая оценка\n\n- SEO-состояние проекта: от 0 до 100.\n\n- Краткий вывод.\n\n- Главные риски.\n\n## 2. Таблица проблем\n\n| Приоритет | Проблема | Где обнаружена | Почему это важно | Как исправить |\n\n## 3. Что уже сделано хорошо\n\n- ...\n\n## 4. Технические рекомендации\n\n- ...\n\n## 5. Рекомендации по контенту\n\n- ...\n\n## 6. План исправлений\n\nРаздели задачи на:\n\n- Срочно.\n\n- В течение недели.\n\n- В дальнейшем.\n\n## 7. Итог\n\nУкажи 5 наиболее важных действий в правильном порядке."
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
