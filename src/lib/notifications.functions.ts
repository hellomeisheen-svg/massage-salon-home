import { createServerFn } from "@tanstack/react-start";
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

export const sendLeadNotification = createServerFn({ method: "POST" })
  .inputValidator((data) => sendNotificationSchema.parse(data))
  .handler(async ({ data }) => {
    const { leadId } = data;
    
    // Import admin client dynamically inside handler to avoid client-side leakage
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    try {
      // 1. Fetch by ID only to avoid collisions
      const { data: lead, error: fetchError } = await supabaseAdmin
        .from("leads")
        .select("*")
        .eq("id", leadId)
        .single();
      
      if (fetchError || !lead) {
        console.error(`[Notification Error] Could not find lead (ID: ${leadId})`, fetchError);
        return { success: false, error: "Lead not found" };
      }


      // 2. Prevent duplicate notifications
      if (lead.notification_sent) {
        console.log(`[Notification] Notification already sent for lead ${lead.id}`);
        return { success: true, alreadySent: true };
      }

      const resendApiKey = process.env['RESEND_API_KEY'];
      if (!resendApiKey) {
        console.error("[Notification Error] RESEND_API_KEY is not configured");
        return { success: false, error: "Resend API key missing" };
      }

      // 3. Prepare Email Content
      const name = lead.name || "Не указано";
      const phoneVal = lead.phone || "Не указан";
      const message = lead.message || "Не указан";
      const createdAt = new Date(lead.created_at).toLocaleString("ru-RU", {
        timeZone: "Asia/Vladivostok",
        dateStyle: "long",
        timeStyle: "medium",
      });


      // 4. Send Email via Resend API
      const emailSubject = lead.message?.includes("[QUIZ LEAD]") 
        ? `Результат квиза: ${name}`
        : `Новая заявка с сайта: ${name}`;

      const resultsHtml = lead.message?.includes("[QUIZ LEAD]") 
        ? `
          <div style="margin-top: 20px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; font-family: sans-serif;">
            <h3 style="color: #1C3C8C; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #DAEBFF; padding-bottom: 10px;">Результаты квиза:</h3>
            ${message.split("\n").map(line => {
              if (line.includes("РЕКОМЕНДАЦИИ:")) {
                return `<p style="margin: 10px 0;"><strong>Рекомендуемые услуги:</strong><br/>${line.replace("РЕКОМЕНДАЦИИ:", "").trim()}</p>`;
              }
              if (line === "---") {
                return `<hr style="border: none; border-top: 1px solid #DAEBFF; margin: 15px 0;" />`;
              }
              if (line === "ОТВЕТЫ:") {
                return `<p style="margin: 10px 0; font-weight: bold; color: #1C3C8C;">Ответы на вопросы:</p>`;
              }
              if (line.startsWith("- ")) {
                return `<p style="margin: 5px 0 5px 15px; font-size: 14px; color: #566A93;">${line}</p>`;
              }
              if (line.includes("СПОСОБ СВЯЗИ:")) {
                return `<p style="margin: 10px 0; padding: 8px; background-color: #DAEBFF; border-radius: 8px; display: inline-block;"><strong>Способ связи:</strong> ${line.replace("СПОСОБ СВЯЗИ:", "").trim()}</p>`;
              }
              if (line === "[QUIZ LEAD]") return "";
              return line ? `<p style="margin: 5px 0;">${line}</p>` : "";
            }).join("")}
          </div>
        ` 
        : `<p><strong>Сообщение:</strong> ${message}</p>`;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "7 Heaven Massage <zayavki@7heavenmassage.ru>",
          to: "meisheen@yandex.ru",
          subject: emailSubject,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1C3C8C; border-bottom: 2px solid #DAEBFF; padding-bottom: 10px;">Новая заявка</h2>
              <div style="margin: 20px 0;">
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Телефон:</strong> ${phoneVal}</p>
                ${resultsHtml}
                <p><strong>Источник:</strong> ${lead.message?.includes("[QUIZ LEAD]") ? "Квиз" : "Форма записи"}</p>
                <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Дата заявки: ${createdAt}</p>
              </div>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { message: errorText };
        }
        console.error("[Notification Error] Resend API failed:", errorData);
        return { success: false, error: "Email sending failed", details: errorData };
      }

      const resendData = await response.json();
      console.log(`[Notification Success] Email sent. ID: ${resendData.id}`);

      // 5. Mark as sent in DB
      const { error: updateError } = await supabaseAdmin
        .from("leads")
        .update({ notification_sent: true })
        .eq("id", lead.id);

      if (updateError) {
        console.error(`[Notification Error] Failed to update lead ${lead.id}:`, updateError);
        // We don't throw here because the email WAS sent
      }

      return { success: true, resendId: resendData.id, notification_sent: true };
    } catch (err) {
      console.error("[Notification Error] Unexpected error:", err);
      return { success: false, error: "Internal error" };
    }
  });
