const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-20b";
const MAX_BODY_BYTES = 64 * 1024;

const send = (response, status, body) => {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(body));
};
const fail = (response, status, code, message) => send(response, status, { error: { code, message } });

async function readBody(request) {
  if (request.body !== undefined) {
    const body = typeof request.body === "string" ? request.body : JSON.stringify(request.body);
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) throw new RangeError("Request too large");
    return JSON.parse(body);
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += Buffer.byteLength(chunk);
    if (size > MAX_BODY_BYTES) throw new RangeError("Request too large");
    chunks.push(Buffer.from(chunk));
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function createChatHandler({ getEnv = () => process.env, fetchImpl = fetch } = {}) {
  return async (request, response) => {
    if (request.method !== "POST") {
      response.setHeader("Allow", "POST");
      return fail(response, 405, "method_not_allowed", "Use POST to ask the assistant.");
    }
    if (!request.headers["content-type"]?.includes("application/json")) {
      return fail(response, 415, "invalid_request", "Send a JSON request.");
    }
    // Browser requests must come from the portfolio itself. No public CORS proxy.
    const origin = request.headers.origin;
    const host = request.headers["x-forwarded-host"] || request.headers.host;
    if (origin) {
      try {
        if (new URL(origin).host !== host) return fail(response, 403, "invalid_origin", "Use the assistant on the portfolio.");
      } catch { return fail(response, 403, "invalid_origin", "Invalid request origin."); }
    }

    const env = getEnv();
    const key = (env.GROQ_API_KEY || "").trim();
    if (!key) return fail(response, 503, "not_configured", "Live AI is not configured on this server.");

    let body;
    try { body = await readBody(request); }
    catch (error) {
      return fail(response, error instanceof RangeError ? 413 : 400, "invalid_request", "Invalid or oversized chat request.");
    }
    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length < 2 || messages.length > 12 ||
      messages[0]?.role !== "system" || messages.at(-1)?.role !== "user" ||
      !messages.every((message, index) => message &&
        (index === 0 ? message.role === "system" : ["user", "assistant"].includes(message.role)) &&
        typeof message.content === "string" && message.content.trim().length > 0 &&
        message.content.length <= (index === 0 ? 30000 : 4000))) {
      return fail(response, 400, "invalid_request", "Invalid chat messages.");
    }

    const model = env.GROQ_MODEL?.trim() || DEFAULT_MODEL;
    try {
      const upstream = await fetchImpl(GROQ_URL, {
        method: "POST",
        signal: AbortSignal.timeout(20000),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model,
          messages: messages.map(({ role, content }) => ({ role, content })),
          temperature: 0.7,
          max_completion_tokens: 1536,
          top_p: 0.9,
          ...(model.startsWith("openai/gpt-oss-") ? { reasoning_effort: "low" } : {}),
        }),
      });
      if (!upstream.ok) {
        if ([401, 403].includes(upstream.status)) return fail(response, 503, "invalid_key", "The AI provider rejected the server credentials or permissions.");
        if (upstream.status === 404) return fail(response, 503, "model_unavailable", "The configured AI model is unavailable.");
        if (upstream.status === 429) return fail(response, 429, "rate_limited", "Live AI has reached its usage limit. Try again later.");
        return fail(response, 502, "provider_unavailable", "The AI provider is temporarily unavailable.");
      }
      const data = await upstream.json();
      const content = data.choices?.[0]?.message?.content;
      if (typeof content !== "string" || !content.trim()) return fail(response, 502, "empty_answer", "The AI returned an empty answer. Try again.");
      return send(response, 200, { content });
    } catch (error) {
      const timedOut = ["TimeoutError", "AbortError"].includes(error.name);
      return fail(response, timedOut ? 504 : 502, timedOut ? "timeout" : "provider_unavailable", timedOut ? "Live AI took too long to reply. Try again." : "The AI provider could not be reached.");
    }
  };
}
