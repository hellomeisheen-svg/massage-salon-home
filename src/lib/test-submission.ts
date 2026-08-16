import { supabase } from "@/integrations/supabase/client";
import { sendLeadNotification } from "@/lib/notifications.functions";

export async function testSubmission(name: string, phone: string, message: string) {
  console.log("Starting test submission for:", name);
  
  try {
    const { data: leadData, error: insertError } = await supabase.from("leads").insert([
      {
        name,
        phone,
        message,
      },
    ]).select("id").single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return { success: false, error: insertError };
    }

    console.log("Lead inserted with ID:", leadData?.id);

    if (leadData?.id) {
      const result = await sendLeadNotification({ data: { leadId: leadData.id } });
      console.log("Notification result:", result);
      return { success: true, result };
    }
  } catch (e) {
    console.error("Test submission failed:", e);
    return { success: false, error: e };
  }
}
