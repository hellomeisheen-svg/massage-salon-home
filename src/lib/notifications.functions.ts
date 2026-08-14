import { supabase } from "@/integrations/supabase/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const sendNotificationSchema = z.object({
  leadId: z.string().uuid(),
});

export const sendLeadNotification = createServerFn({ method: "POST" })
  .inputValidator((data) => sendNotificationSchema.parse(data))
  .handler(async ({ data }) => {
    const { leadId } = data;
    
    // Import admin client dynamically inside handler to avoid client-side leakage
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    try {
      // 1. Fetch the lead data using admin client
      const { data: lead, error: fetchError } = await supabaseAdmin
        .from("leads")
        .select("*")
        .eq("id", leadId)
        .single();

      if (fetchError || !lead) {
        console.error(`[Notification Error] Could not fetch lead ${leadId}:`, fetchError);
        return { success: false, error: "Lead not found" };
      }

      // 2. Prevent duplicate notifications
      // We check if notification_sent is already true
      if (lead.notification_sent) {
        console.log(`[Notification] Notification already sent for lead ${leadId}`);
        return { success: true, alreadySent: true };
      }

      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        console.error("[Notification Error] RESEND_API_KEY is not configured");
        return { success: false, error: "Resend API key missing" };
      }

      // 3. Prepare Email Content
      const name = lead.name || "Не указано";
      const phone = lead.phone || "Не указан";
      const message = lead.message || "Не указан";
      const createdAt = new Date(lead.created_at).toLocaleString("ru-RU", {
        timeZone: "Asia/Vladivostok",
        dateStyle: "long",
        timeStyle: "medium",
      });

      const emailHtml = `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1C3C8C; border-bottom: 1px solid #daebff; padding-bottom: 10px;">Новая заявка с сайта 7 Heaven Massage</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Комментарий:</strong> ${message}</p>
          <p><strong>Дата и время:</strong> ${createdAt}</p>
        </div>
      `;

      // 4. Send Email via Resend API
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "7 Heaven Massage <zayavki@7heavenmassage.ru>",
          to: "meisheen@yandex.ru",
          subject: `Новая заявка с сайта 7 Heaven Massage — ${name}`,
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[Notification Error] Resend API failed:", errorData);
        return { success: false, error: "Email sending failed" };
      }

      // 5. Mark as sent in DB
      const { error: updateError } = await supabaseAdmin
        .from("leads")
        .update({ notification_sent: true })
        .eq("id", leadId);

      if (updateError) {
        console.error(`[Notification Error] Failed to update lead ${leadId}:`, updateError);
      }

      return { success: true };
    } catch (err) {
      console.error("[Notification Error] Unexpected error:", err);
      return { success: false, error: "Internal error" };
    }
  });
