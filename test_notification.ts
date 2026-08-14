import { sendLeadNotification } from "./src/lib/notifications.functions";

async function test() {
  try {
    console.log("Starting test for lead 1e5613d7-e6d2-4171-a098-db2d8ab25cb2");
    const result = await sendLeadNotification({ data: { leadId: "1e5613d7-e6d2-4171-a098-db2d8ab25cb2" } });
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Test failed:", err);
  }
}

test();
