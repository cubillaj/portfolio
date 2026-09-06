import assert from "node:assert/strict";
import { loadEnvConfig } from "@next/env";
import { sendChat } from "../src/server/modules/chat/chat.service";
import type { ChatEvent } from "../src/server/modules/chat/chat.types";

// Opt-in smoke test: sends one request using the locally configured free key.
async function main() {
  loadEnvConfig(process.cwd(), true);
  const stream = await sendChat(
    {
      messages: [
        {
          role: "user",
          content: "Tell me about Joshua's BJMP project in two sentences.",
        },
      ],
    },
    AbortSignal.timeout(50_000),
  );
  const body = await new Response(stream).text();
  const events: ChatEvent[] = body
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const reply = events
    .map((event) => (event.type === "text" ? event.text : ""))
    .join("");
  console.log(
    `Stream: ${events.length} events, ${reply.length} reply characters`,
  );
  assert.ok(events.some((event) => event.type === "done"));
  assert.ok(!events.some((event) => event.type === "error"));
  assert.match(reply, /BJMP/i);
  assert.doesNotMatch(reply, /User Safety:\s*(?:safe|unsafe)/i);
  const completed = events.find((event) => event.type === "done");
  console.log(`Model: ${completed?.model ?? "not reported"}\nReply: ${reply}`);
}

void main().catch((error: unknown) => {
  if (error && typeof error === "object") {
    if ("error" in error && error.error && typeof error.error === "object") {
      const detail = error.error as {
        message?: string;
        metadata?: { raw?: string; headers?: Record<string, string> };
      };
      const text =
        `${detail.message ?? ""} ${detail.metadata?.raw ?? ""}`.toLowerCase();
      const reason = /free-models-per-day|requests per day|daily/.test(text)
        ? "daily-free-quota"
        : /free-models-per-min|requests per minute/.test(text)
          ? "minute-free-quota"
          : /upstream|provider returned|temporarily rate-limited/.test(text)
            ? "provider-capacity"
            : "unspecified";
      console.error({
        reason,
        retryAfter: detail.metadata?.headers?.["Retry-After"],
        reset: detail.metadata?.headers?.["X-RateLimit-Reset"],
      });
    }
    console.error({
      name: error.constructor.name,
      status: "statusCode" in error ? error.statusCode : undefined,
      code: "code" in error ? error.code : undefined,
    });
  }
  console.error(
    "Live chat check failed: no completed BJMP answer. Check model availability, quota, and connectivity.",
  );
  process.exitCode = 1;
});
