import { getOpenRouter } from "@/src/lib/openrouter";
import { getChatModels } from "@/src/server/security/chat-model";
import { CHAT_SYSTEM_PROMPT } from "./chat.context";
import type { ChatInput } from "./chat.schema";
import type { ChatEvent } from "./chat.types";
import { canTryNextModelBatch } from "./chat.error";

async function openChatStream(data: ChatInput, signal: AbortSignal) {
  const models = getChatModels();
  const client = getOpenRouter();
  // OpenRouter accepts at most three models in a single request.
  for (let index = 0; index < models.length; index += 3) {
    signal.throwIfAborted();
    try {
      return await client.chat.send(
        {
          chatRequest: {
            // OpenRouter tries these in order before starting the response.
            models: models.slice(index, index + 3),
            messages: [
              {
                role: "system",
                content: CHAT_SYSTEM_PROMPT,
              },
              ...data.messages,
            ],
            stream: true,
            maxTokens: 700,
          },
        },
        {
          signal,
          retries: { strategy: "none" },
        },
      );
    } catch (error) {
      if (
        signal.aborted ||
        index + 3 >= models.length ||
        !canTryNextModelBatch(error)
      )
        throw error;
    }
  }
  throw new Error("No chat models configured");
}

export async function sendChat(data: ChatInput, signal: AbortSignal) {
  const abort = new AbortController();
  const upstream = await openChatStream(
    data,
    AbortSignal.any([signal, abort.signal, AbortSignal.timeout(45_000)]),
  );
  if (!(Symbol.asyncIterator in upstream))
    throw new Error("Expected a streaming response");
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: ChatEvent) =>
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      try {
        let hasText = false;
        let responseModel: string | undefined;
        for await (const chunk of upstream) {
          if ("error" in chunk && chunk.error)
            throw new Error("Provider stream failed");
          const text = chunk.choices?.[0]?.delta?.content;
          responseModel = chunk.model || responseModel;
          if (text) {
            hasText = true;
            emit({ type: "text", text });
          }
        }
        if (!hasText) throw new Error("Empty response");
        emit({ type: "done", model: responseModel });
      } catch {
        if (!abort.signal.aborted && !signal.aborted)
          emit({
            type: "error",
            error: "The reply was interrupted. Please try again.",
          });
      } finally {
        if (!abort.signal.aborted) controller.close();
        abort.abort();
      }
    },
    cancel() {
      abort.abort();
    },
  });
}
