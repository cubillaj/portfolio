function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

export function getChatDiagnostic(error: unknown) {
  const source = record(error);
  const detail = record(source.error);
  const text = [source.message, detail.message]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();
  const status =
    typeof source.statusCode === "number" ? source.statusCode : null;
  let category = "unknown";

  if (status === 400) {
    category =
      /models/.test(text) &&
      /maximum|at most|more than|limit|items or fewer/.test(text)
        ? "fallback-list-limit"
        : "request-rejected";
  } else if (status === 401) category = "authentication-failed";
  else if (status === 402) category = "account-credit-restriction";
  else if (status === 403) category = "access-denied";
  else if (status === 404) category = "model-or-provider-unavailable";
  else if (status === 429) category = "rate-limited";
  else if (status !== null && status >= 500) category = "provider-error";
  else if (/timeout|timed out/.test(text)) category = "timeout";
  else if (/abort/.test(text)) category = "cancelled";
  else if (/fetch failed|connection|network/.test(text))
    category = "network-error";

  // Never log the error object, body, headers, message, prompt, or API key.
  return { category, upstreamStatus: status };
}
