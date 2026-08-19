# Plan - Content Update for Massage Pages

Update the text content for "Vectror", "Lymphatic", "Lymphatic Drainage", and "Classic" massage pages to match the high SEO and content standards established on the "Hirudotherapy", "Ketgut", and "Vacuum Massage" pages.

## Content Strategy
- **Hero Section**: Short, descriptive, geo-targeted ("в Трудовом").
- **About Section**: Professional, structured, focusing on benefits and process.
- **FAQ Section**: Unified answer length (200-230 characters), informative, including a standard booking question.
- **JSON-LD**: Expand schema for all pages to include `MedicalBusiness`, `Service`, `BreadcrumbList`, and `FAQPage`.

## Proposed Content for Each Page

### 1. Classic Massage (`/klassicheskii-massazh`)
- **Hero**: "Классический оздоровительный массаж для снятия напряжения и восстановления сил. Кабинет в посёлке Трудовое."
- **About**: Focus on foundational techniques, versatility (full body vs local), and the relaxing atmosphere.
- **FAQ**:
  - Should it be painful? (No, depth is adjusted to comfort).
  - What to choose first time? (Full body to identify tension).
  - How many sessions? (Regularity is key, courses available).
  - What to bring? (Nothing, all provided).
  - How to book? (Standard office/Max answer).

### 2. Vector Massage (`/vektornyi-massazh`)
- **Hero**: "Точная работа с мышцами и фасциями по анатомическим линиям тела. Освобождение глубоких зажимов. Кабинет в Трудовом."
- **About**: Explain the "lines" concept, contrast with surface massage, focus on deep-seated tension relief.
- **FAQ**:
  - Difference from classic? (Address targeted lines vs general zones).
  - Is it painful? (Deeper but within comfort limits).
  - Duration? (2 hours for full coverage).
  - Next day feeling? (Muscle sensitivity like after workout).
  - How to book? (Standard office/Max answer).

### 3. Lymphatic Massage (`/limfaticheskii-massazh`)
- **Hero**: "Мягкая практика для улучшения оттока жидкости и лёгкости в теле. Бережная разгрузка тканей. Кабинет в Трудовом."
- **About**: Emphasize superficial, rhythmic, meditative touch. Focus on reducing edema and internal heaviness.
- **FAQ**:
  - Difference from drainage? (Softer, more superficial).
  - Does it hurt? (Delicate, sleep-inducing).
  - Preparation? (Hydration, light meal).
  - Contraindications? (Heart, kidney, acute inflammation).
  - How to book? (Standard office/Max answer).

### 4. Lymphatic Drainage Massage (`/limfodrenazhnyi-massazh`)
- **Hero**: "Последовательная проработка лимфотока от стоп до плеч. Уменьшение отёчности и детокс-эффект. Кабинет в Трудовом."
- **About**: Structured sequence, rhythmic pressure, focus on both body and face.
- **FAQ**:
  - Why choose face? (Edema reduction, oval lift).
  - Duration? (2 hours body, 40 min face).
  - Lifestyle impact? (Great for sedentary work).
  - Makeup for face? (Remove before session, provided).
  - How to book? (Standard office/Max answer).

## Technical Implementation
- Parallel update of `src/routes/*.tsx` files using `line_replace` or `write`.
- Verify JSON-LD structure matches the template in `girudoterapiya.tsx`.
- Ensure Typography (non-breaking spaces, quotes) follows project standards.

---
*Note: Design and layout will remain untouched.*
