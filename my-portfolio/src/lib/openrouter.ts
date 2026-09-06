import { OpenRouter } from "@openrouter/sdk";

export function getOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OpenRouter is not configured");
  return new OpenRouter({ apiKey });
}
