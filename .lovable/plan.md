# Plan - Update Lymphatic Drainage Massage Page

Update the content of `src/routes/limfodrenazhnyi-massazh.tsx` with the new structured text provided by the user, ensuring the distinction from the "lymphatic" page is maintained.

## User Review Required

> [!IMPORTANT]
> The "Lymphatic Drainage Massage" page will be updated with extensive structured content. The duration is set to 60–90 minutes as per the new text (previously it was 2 hours).

- **Prices and Address**: I will use placeholders for the specific price and full address as they were not provided in the prompt (marked as `[указать...]`). If you have these details, please provide them.

## Technical Details

- **Content Update**: Completely replace the `sections` array in `ServicePageContent` with:
    - `Об услуге` (What it is)
    - `Эффект` (Effects)
    - `Показания` (When to apply)
    - `Противопоказания` (Contraindications)
    - `Процесс` (How it goes)
    - `Подготовка` (Preparation)
    - `После сеанса` (Aftercare)
    - `Курс` (Course information)
- **Typography**: Apply Russian typography rules (non-breaking spaces after short prepositions, correct dashes, and quotes).
- **SEO & JSON-LD**: Update meta tags and schema markup to reflect the new content and duration (60–90 min).
- **Duration Sync**: Update `duration` in the `prices` array and `heroText`.

## Files
- `src/routes/limfodrenazhnyi-massazh.tsx`
