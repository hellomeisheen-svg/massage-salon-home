import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { Resend } from "resend";

const leadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  method: z.string().optional(),
  answers: z.array(z.object({
    question: z.string(),
    answer: z.union([z.string(), z.array(z.string())])
  })),
  results: z.array(z.string())
});

export const submitQuizLead = createServerFn({ method: "POST" })
  .inputValidator((data) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    // 1. Save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from("leads")
      .insert([{
        name: data.name,
        phone: data.phone,
        message: `Quiz Results: ${data.results.join(", ")}\n\nAnswers: ${JSON.stringify(data.answers, null, 2)}\nMethod: ${data.method || 'Not specified'}`,
        source: 'quiz'
      }]);

    if (dbError) throw dbError;

    // 2. Send email via Resend
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Seven Heaven Quiz <onboarding@resend.dev>",
        to: "meisheen@yandex.ru",
        subject: `New Quiz Lead: ${data.name}`,
        html: `
          <h3>New Quiz Completion</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Preferred contact:</strong> ${data.method || 'Not specified'}</p>
          <p><strong>Recommended Scenarios:</strong> ${data.results.join(", ")}</p>
          <h4>Detailed Answers:</h4>
          <ul>
            ${data.answers.map(a => `<li><strong>${a.question}:</strong> ${Array.isArray(a.answer) ? a.answer.join(", ") : a.answer}</li>`).join("")}
          </ul>
        `
      });
    }

    return { success: true };
  });
