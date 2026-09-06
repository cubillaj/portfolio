import { withValidation } from "@/src/server/middleware/with-validation";
import { chatSchema } from "@/src/server/modules/chat/chat.schema";
import { sendChat } from "@/src/server/modules/chat/chat.service";
import { reserveChatQuota } from "@/src/server/security/chat-rate-limit";
import { getChatModel } from "@/src/server/security/chat-model";
import { getRateLimitMessage } from "@/src/server/modules/chat/chat.error";

export const runtime = "nodejs";
const handleChat = withValidation(chatSchema, async (data, request) => {
  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(
      { error: "Chat is unavailable right now. Please use the contact page." },
      { status: 503 },
    );
  }
  try {
    getChatModel();
  } catch {
    return Response.json(
      {
        error: "Chat is temporarily unavailable. Please use the contact page.",
      },
      { status: 503 },
    );
  }
  try {
    return new Response(await sendChat(data, request.signal), {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    const rateLimitMessage = getRateLimitMessage(error);
    if (rateLimitMessage) {
      return Response.json(
        {
          error: rateLimitMessage,
        },
        { status: 429 },
      );
    }
    return Response.json(
      {
        error: "Unable to connect to the assistant. Please try again shortly.",
      },
      { status: 502 },
    );
  }
});

export async function POST(request: Request) {
  const headers = {
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  };
  // Browser metadata is defense in depth, not authentication or a bot barrier.
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json(
      { error: "Cross-site chat requests are not allowed." },
      { status: 403, headers },
    );
  }
  if (process.env.CHAT_ENABLED === "false") {
    return Response.json(
      { error: "Chat is unavailable. Please use the contact page." },
      { status: 503, headers },
    );
  }
  try {
    const retryAfter = await reserveChatQuota();
    if (retryAfter > 0) {
      return Response.json(
        {
          error:
            "The assistant has reached its usage limit. Please try later or use the contact page.",
        },
        {
          status: 429,
          headers: { ...headers, "Retry-After": String(retryAfter) },
        },
      );
    }
  } catch {
    return Response.json(
      {
        error: "Chat is temporarily unavailable. Please use the contact page.",
      },
      { status: 503, headers },
    );
  }
  const response = await handleChat(request);
  for (const [name, value] of Object.entries(headers))
    response.headers.set(name, value);
  return response;
}
