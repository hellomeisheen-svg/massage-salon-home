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
