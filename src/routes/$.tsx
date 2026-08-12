import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage, notFoundHead } from "@/components/NotFoundPage";

export const Route = createFileRoute("/$")({
  head: notFoundHead,
  component: NotFoundPage,
});
