export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatEvent =
  | { type: "text"; text: string }
  | { type: "done"; model?: string }
  | { type: "error"; error: string };
