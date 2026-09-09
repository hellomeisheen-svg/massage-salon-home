# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Деплой на Layero

1. Подключите GitHub-репозиторий в [app.layero.ru](https://app.layero.ru) и выберите ветку `main`.
2. Укажите команду сборки: `npm run build`.
3. Укажите папку публикации: `dist`.
4. Подключите домен `7heavenmassage.ru` в настройках проекта Layero.
5. Включите HTTPS и дождитесь выпуска сертификата до проверки сайта.
6. Если используются переменные окружения, добавьте их в разделе переменных окружения Layero с теми же именами, которые используются приложением.
7. После деплоя проверьте `https://7heavenmassage.ru/sitemap.xml` и `https://7heavenmassage.ru/robots.txt`.
8. Проверьте старые адреса услуг: они должны возвращать 301 и вести на новые канонические адреса.
9. Проверьте случайный адрес вроде `/proverka-404-xyz`: он должен возвращать HTTP 404 и страницу «Страница не найдена».
10. Не деплойте одновременно старую версию через File Manager и новую версию через Layero на одном домене.
11. После деплоя отправьте `https://7heavenmassage.ru/sitemap.xml` в Яндекс.Вебмастер и Google Search Console.

Сборка создаёт отдельные HTML-файлы для главной, страниц услуг, политики конфиденциальности и `404.html`. Это позволяет поисковым роботам получить основной текст и SEO-метаданные до выполнения JavaScript.

## Deploy to Ubuntu VPS

To deploy this project on your own Ubuntu VPS using Nginx and Node.js:

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Build the project:**
   ```sh
   npm run build
   ```

3. **Run the production server:**
   ```sh
   HOST=127.0.0.1 PORT=3000 node .output/server/index.mjs
   ```

Note: Ensure you have configured your environment variables (like `VITE_SUPABASE_URL`, `RESEND_API_KEY`, etc.) on your VPS environment. For production, you should use a process manager like `pm2` to keep the server running.
