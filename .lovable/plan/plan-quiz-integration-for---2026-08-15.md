# Plan: Quiz Integration for "Седьмое небо"

Implement an interactive quiz to help clients choose the right massage or wellness procedure. The quiz will be accessible via a "Подобрать программу" button in the Hero section and will open in a modal.

## User Review Required

> [!IMPORTANT]
> The quiz data (questions, services, and results logic) is based on the detailed requirements provided. Please review the scenarios and pricing in `src/config/quiz.ts` once implemented to ensure they match your current offerings exactly.

## Proposed Changes

### Configuration & Data
- Create `src/config/quiz.ts`: Define questions, services, and the logic for mapping answers to 6 specific scenarios (Deep Relaxation, Back/Neck, Lymphatic, Face, Wellness, First Visit).

### Components
- Create `src/components/quiz/QuizModal.tsx`: Main container using a portal for the quiz popup.
- Create `src/components/quiz/QuizStep.tsx`: Renders individual steps (single/multiple choice).
- Create `src/components/quiz/QuizResults.tsx`: Displays recommended services based on quiz answers.
- Create `src/components/quiz/QuizContactForm.tsx`: Final step to collect lead info (Name, Phone, Contact method) with Supabase integration.
- Update `src/components/Hero.tsx`: Restore the original layout while adding the "Подобрать программу" button.

### Integration
- **Supabase**: Save quiz results and contact info to the `leads` table.
- **Resend**: Notify the administrator via email when a quiz is completed.
- **Tracking**: Integrate with existing Yandex Metrica (if applicable) for quiz start/completion.

## Technical Details
- **Logic**: Use a scoring system or specific triggers (as defined in the requirement) to select the result scenario.
- **UX**: Progress bar, smooth transitions between steps, mobile-first responsive design.
- **Security**: Honeypot for spam protection on the contact form.
- **Performance**: Lightweight implementation using React state, avoiding heavy third-party quiz libraries.
