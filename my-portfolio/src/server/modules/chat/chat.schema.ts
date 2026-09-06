import { z } from "zod";
import { CHAT_LIMITS } from "@/src/lib/chat-limits";

export const chatSchema = z.object({
  messages: z
    .array(
      z.discriminatedUnion("role", [
        z.object({
          role: z.literal("user"),
          content: z.string().trim().min(1).max(CHAT_LIMITS.userCharacters),
        }),
        z.object({
          role: z.literal("assistant"),
          content: z
            .string()
            .trim()
            .min(1)
            .max(CHAT_LIMITS.assistantCharacters),
        }),
      ]),
    )
    .min(1)
    .max(CHAT_LIMITS.historyMessages)
    .refine(
      (messages) => messages.at(-1)?.role === "user",
      "The last message must be from the user",
    )
    .refine(
      (messages) =>
        messages.reduce(
          (total, message) => total + message.content.length,
          0,
        ) <= CHAT_LIMITS.historyCharacters,
      "Conversation is too long. Please start a new chat.",
    ),
});

export type ChatInput = z.infer<typeof chatSchema>;
