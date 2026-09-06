import { z } from "zod";

const rateLimitError = z.object({
  statusCode: z.literal(429),
  error: z
    .object({
      message: z.string().optional(),
      metadata: z.object({ raw: z.string().optional() }).nullish(),
    })
    .optional(),
});

export function getRateLimitMessage(error: unknown): string | null {
  const parsed = rateLimitError.safeParse(error);
  if (!parsed.success) return null;

  const detail = parsed.data.error;
  const message =
    `${detail?.message ?? ""} ${detail?.metadata?.raw ?? ""}`.toLowerCase();

  // Only expose our own messages, never raw provider errors or account details.
  if (message.includes("free-models-per-day")) {
    return "The free AI allowance has reached its daily limit. Please wait for the quota to reset or use the contact page.";
  }
  if (message.includes("free-models-per-min")) {
    return "Too many AI requests were sent recently. Please wait a minute before trying again.";
  }
  if (/upstream|provider returned|temporarily rate-limited/.test(message)) {
    return "The free AI model is temporarily busy at its provider. Please try later or use the contact page.";
  }
  return "The free AI service is rate-limiting requests. Please try later or use the contact page.";
}
