// Site-wide quotas also bound abuse from rotating IP addresses. Redis keeps them
// shared across serverless instances; no visitor identifiers are stored.
const WINDOWS = [
  { name: "minute", seconds: 60, limit: 10 },
  { name: "day", seconds: 86_400, limit: 50 },
] as const;

const RESERVE_QUOTA = `
for i = 1, #KEYS do
  local count = tonumber(redis.call('GET', KEYS[i]) or '0')
  if count >= tonumber(ARGV[(i - 1) * 2 + 1]) then
    return math.max(1, redis.call('TTL', KEYS[i]))
  end
end
for i = 1, #KEYS do
  local count = redis.call('INCR', KEYS[i])
  if count == 1 then redis.call('EXPIRE', KEYS[i], ARGV[(i - 1) * 2 + 2]) end
end
return 0
`;

const localWindows = new Map<string, { count: number; expires: number }>();

function reserveLocalQuota(): number {
  const now = Date.now();
  for (const window of WINDOWS) {
    const entry = localWindows.get(window.name);
    if (entry && entry.expires > now && entry.count >= window.limit) {
      return Math.ceil((entry.expires - now) / 1000);
    }
  }
  for (const window of WINDOWS) {
    const entry = localWindows.get(window.name);
    localWindows.set(
      window.name,
      entry && entry.expires > now
        ? { ...entry, count: entry.count + 1 }
        : { count: 1, expires: now + window.seconds * 1000 },
    );
  }
  return 0;
}

export async function reserveChatQuota(): Promise<number> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    )
      return reserveLocalQuota();
    throw new Error("Shared chat rate limiting is not configured.");
  }
  if (new URL(url).protocol !== "https:")
    throw new Error("Redis requires HTTPS.");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      RESERVE_QUOTA,
      WINDOWS.length,
      ...WINDOWS.map((window) => `portfolio:{chat}:${window.name}`),
      ...WINDOWS.flatMap((window) => [window.limit, window.seconds]),
    ]),
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
    redirect: "error",
  });
  if (!response.ok) throw new Error("Rate limit storage is unavailable.");
  const body: unknown = await response.json();
  if (
    !body ||
    typeof body !== "object" ||
    !("result" in body) ||
    "error" in body ||
    typeof body.result !== "number" ||
    !Number.isSafeInteger(body.result) ||
    body.result < 0
  ) {
    throw new Error("Invalid rate limit response.");
  }
  return body.result;
}
