# Portfolio chatbot

## Local development

Set `OPENROUTER_API_KEY` in `.env.local`, then run `npm run dev`.
`.env.example` lists the available settings. Never use a `NEXT_PUBLIC_` prefix
for these secrets or commit an environment file.

## Production setup

1. Create a dedicated inference API key in
   [OpenRouter settings](https://openrouter.ai/settings/keys). No positive balance
   or spending cap is required by this application. Do not use a management key.
   Set `OPENROUTER_MODEL=google/gemma-4-26b-a4b-it:free`. Requests use this order:
   Gemma 4 26B A4B → Gemma 4 31B → MiniMax M3
   → `openrouter/free`. Paid model IDs remain blocked. Keep Gemma 26B as the
   starting model in local and hosting environments to use the full chain.
2. Create a dedicated Upstash Redis database and add its
   `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your host's server
   environment settings. Use the writable REST token; the limiter runs an atomic
   Redis script. These credentials must never be exposed to the browser.
3. Add `OPENROUTER_API_KEY` and optionally `OPENROUTER_MODEL` to the same host.
   Redeploy after changing environment settings.
4. Verify a chat reply, a `429` response after the quota is reached, and the
   contact-page fallback. Set `CHAT_ENABLED=false` and redeploy to disable chat.

Production fails closed if Redis is missing, unavailable, or returns an invalid
response. Free models remain subject to OpenRouter's availability and quotas.
No accounts, databases, or spending settings were provisioned automatically.

`openrouter/free` selects from the free model pool, which includes specialized
safety classifiers. Those may return labels such as "User Safety: safe" instead
of answering a question. The random router is explicitly allowed as the last
fallback at the owner's request; individual moderation models remain blocked.
Before changing that list in `chat-model.ts`,
verify the model's availability and conversational capabilities in the catalog.

The service keeps this priority order:

1. `google/gemma-4-26b-a4b-it:free`
2. `google/gemma-4-31b-it:free`
3. `minimax/minimax-m3:free`
4. `openrouter/free`

OpenRouter accepts at most three models per request. The first request contains
Gemma 26B, Gemma 31B, and MiniMax M3. If that batch fails with provider throttling,
missing endpoints, or a server error, the app sends a second request containing
only `openrouter/free`. Authentication, payment, request validation, unknown rate
limits, and account-wide quota failures stop immediately. There are at most two
requests, sharing a single 45-second deadline; cancellation stops further attempts.

OpenRouter handles failures within each batch before a response begins. Once text starts streaming,
the app never switches models or splices another answer into the reply. A stream
failure shows an interruption message. There is one 45-second timeout for the
whole request and no additional SDK retries. The same portfolio facts and
conversation are sent regardless of which model responds. The completion event
reports the actual response model for the optional live smoke test.

If `OPENROUTER_MODEL` explicitly names a later model in the list, routing starts
there and keeps the remaining order. Leave it set to Gemma 26B for all four.
Fallbacks do not bypass account-wide free quotas. One app request reserves one
site quota slot; OpenRouter controls how provider attempts count toward its quota.

## Protections and tradeoffs

- Global quotas: 10 attempts per 60-second window and 50 per 24-hour window,
  shared across all visitors and server instances. Windows begin with their first
  accepted attempt. An atomic Lua script checks both quotas before incrementing.
  Denied requests do not extend the window. Invalid requests consume quota too.
- No IP headers are trusted and no visitor identifiers are stored in Redis.
  A bot can exhaust the shared quota and temporarily deny chat to other visitors;
  use your host's firewall/bot protection to reduce this and protect hosting and
  Redis request costs. The contact page remains available.
- Only development/test uses process-local counters. Production never falls back
  to them, since serverless instances would otherwise bypass a shared quota.
- Request bodies are capped at 64 KiB while reading, even without an honest
  Content-Length header. Reading is timed out after 10 seconds.
- Zod limits user messages to 2,000 characters, assistant history to 6,000 per
  message, and conversation input to 8,000 total characters / 19 messages.
  The UI drops older context to fit these limits.
- The model list is server-selected, output is capped at 700 tokens, additional
  SDK retries are disabled, and requests time out. Responses and errors are not cached.
- Replies are rendered as text. The assistant has no tools or private data.
  Prompt instructions reduce off-topic answers but cannot guarantee truthfulness
  or stop all prompt injection. Treat everything in the prompt as public.
- The interface discloses that messages go to OpenRouter and its selected model
  provider. The app has no persistent conversation storage or message logging;
  provider and hosting data policies still apply.

Free inference does not make hosting and Redis usage unlimited. OpenRouter's
free-account allowance is currently 50 requests/day; other applications using
the same account can consume that allowance too. Our quota windows are separate
from OpenRouter's, so the provider can reject requests before the app quota is
reached. Free-model availability and response quality can vary.

References: [Gemma 4 free chat model](https://openrouter.ai/google/gemma-4-26b-a4b-it:free),
[OpenRouter FAQ](https://openrouter.ai/docs/faq),
[OpenRouter model fallbacks](https://openrouter.ai/docs/guides/routing/model-fallbacks),
[Upstash Redis REST API](https://upstash.com/docs/redis/features/restapi).

## Checks and formatting

```sh
npm run test:chat
npm run format:chat
npm run format:check
npm run build
```

Formatting scripts target the chatbot and its supporting files to avoid
reformatting unrelated portfolio pages. To format another file, run
`npx prettier --write path/to/file`.

For an optional live check, run `npx tsx tests/chat-live.ts`. This loads local
environment settings and runs one chat (up to two fallback requests) to ask about BJMP.
A provider `429` means its quota or capacity limit was reached; it does not
mean a payment card is required. Wait before retrying rather than consuming
more requests with repeated tests.

Server request failures log `[portfolio-chat]` with an error category and upstream
status. They never log raw errors, request headers, API keys, or visitor messages.
