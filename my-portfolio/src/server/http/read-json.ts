import { RequestError } from "./request-error";

export const MAX_BODY_BYTES = 64 * 1024;

export async function readJson(request: Request): Promise<unknown> {
  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    throw new RequestError("Send an application/json request.", 415);
  }
  const declaredSize = Number(request.headers.get("content-length"));
  if (declaredSize > MAX_BODY_BYTES) {
    throw new RequestError("Your message is too large.", 413);
  }
  if (!request.body) throw new RequestError("Invalid JSON body.", 400);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new RequestError("The request took too long.", 408));
      void reader.cancel().catch(() => undefined);
    }, 10_000);
  });

  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), timeout]);
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => undefined);
        throw new RequestError("Your message is too large.", 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError("Invalid JSON body.", 400);
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}
