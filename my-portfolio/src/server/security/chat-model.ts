export const DEFAULT_CHAT_MODEL = "google/gemma-4-26b-a4b-it:free";

const CHAT_MODEL_ORDER: readonly string[] = [
  DEFAULT_CHAT_MODEL,
  "google/gemma-4-31b-it:free",
  "minimax/minimax-m3:free",
  "openrouter/free",
];

export function getChatModel(): string {
  const model = process.env.OPENROUTER_MODEL?.trim() || DEFAULT_CHAT_MODEL;

  // Keep paid models blocked. The explicitly requested random free router is
  // the final fallback and may select specialized models such as classifiers.
  if (!CHAT_MODEL_ORDER.includes(model)) {
    throw new Error(
      "The portfolio chatbot only supports free chat models in its allowlist.",
    );
  }

  return model;
}

export function getChatModels(): string[] {
  // A configured starting model skips earlier choices without reordering the
  // remaining fallbacks. The default uses the full requested priority order.
  return CHAT_MODEL_ORDER.slice(CHAT_MODEL_ORDER.indexOf(getChatModel()));
}
