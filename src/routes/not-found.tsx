import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage, notFoundHead } from "@/components/NotFoundPage";

export const Route = createFileRoute("/not-found")({
  head: notFoundHead,
  component: NotFoundPage,
});
