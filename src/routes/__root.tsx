import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Preloader } from "@/components/Preloader";
import { TypographyProvider } from "@/components/TypographyProvider";



function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-[#EFF6FF] px-4 pb-24 pt-36 sm:px-5 sm:pt-44">
      <div className="w-full max-w-[560px] px-6 py-10 text-center sm:px-10 sm:py-14">
        <span
          className="block text-[80px] font-light leading-none tracking-tight text-[#1C3C8C] sm:text-[120px]"
          style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
        >
          404
        </span>

        <h1 className="font-heading mt-6 text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px] xl:text-[44px]">
          Страница не найдена
        </h1>

        <p className="body-text mx-auto mt-4 max-w-[400px] text-[#566A93]">
          Запрашиваемая страница не существует или была перемещена. Проверьте адрес или вернитесь на главную.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="btn-primary w-full sm:w-auto"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          Страница не загрузилась
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Что-то пошло не так. Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Попробовать снова
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Седьмое небо — кабинет оздоровительных практик" },
      {
        name: "description",
        content:
          "Кабинет оздоровительных практик «Седьмое небо»: массаж, банки, гирудотерапия, акупунктурный кетгут. Посёлок Трудовое, Владивосток.",
      },
      { name: "author", content: "Седьмое небо" },
      { property: "og:title", content: "Седьмое небо — кабинет оздоровительных практик" },
      {
        property: "og:description",
        content:
          "Кабинет оздоровительных практик «Седьмое небо»: массаж, банки, гирудотерапия, акупунктурный кетгут. Посёлок Трудовое, Владивосток.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:site_name", content: "Седьмое небо" },
      { property: "og:locale", content: "ru_RU" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <TypographyProvider />

      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>

  );
}
