import { Webhook } from "svix";

export const clerkWebhooks = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing Clerk webhook secret");
  }

  const payload = JSON.stringify(req.body);
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).json({ success: false, error: "Webhook verification failed" });
  }

  const eventType = evt.type;

  // Log or act on different Clerk event types
  switch (eventType) {
    case "user.created":
      console.log("🆕 User created:", evt.data);
      break;
    case "user.updated":
      console.log("🔄 User updated:", evt.data);
      break;
    case "user.deleted":
      console.log("❌ User deleted:", evt.data);
      break;
    default:
      console.log(`ℹ️ Unhandled Clerk webhook event type: ${eventType}`);
  }

  return res.status(200).json({ success: true });
};
