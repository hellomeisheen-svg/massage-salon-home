import { z } from "zod";

const sendNotificationSchema = z.object({
  leadId: z.string().uuid(),
  phone: z.string().optional(),
  results: z.array(z.string()).optional(),
  answers: z.array(z.object({
    question: z.string(),
    answer: z.union([z.string(), z.array(z.string())])
  })).optional(),
});

/**
 * В статической версии SPA (shared hosting) серверные функции TanStack Start недоступны.
 * Для отправки уведомлений используйте внешние API (например, Supabase Edge Functions, 
 * Zapier Webhook или сервис типа Formspree).
 * 
 * Данная заглушка имитирует успешный ответ для сохранения работоспособности UI.
 */
export const sendLeadNotification = async ({ data }: { data: z.infer<typeof sendNotificationSchema> }) => {
  console.log("[Notification Stub] Данные для уведомления:", data);
  
  // В будущем здесь можно вызвать ваш API:
  /*
  const response = await fetch('https://your-api-endpoint.com/notify', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
  */
  
  return { success: true, message: "Static stub notification received" };
};