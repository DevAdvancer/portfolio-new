import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { createChatHandler } from "../server/chat.mjs";

const messages = [{ role: "system", content: "Portfolio reference" }, { role: "user", content: "Hello" }];

async function withEndpoint(options, run) {
  const server = createServer(createChatHandler(options)).listen(0, "127.0.0.1");
  await once(server, "listening");
  const url = `http://127.0.0.1:${server.address().port}/api/chat`;
  const post = body => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: typeof body === "string" ? body : JSON.stringify(body) });
  try { await run({ url, post }); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test("server reads GROQ_API_KEY, keeps credentials private, and selects a configurable model", async () => {
  let payload;
  await withEndpoint({ getEnv: () => ({ GROQ_API_KEY: "private-test-key", GROQ_MODEL: "custom-model" }), fetchImpl: async (url, options) => {
    assert.equal(url, "https://api.groq.com/openai/v1/chat/completions");
    assert.equal(options.headers.Authorization, "Bearer private-test-key");
    payload = JSON.parse(options.body);
    return Response.json({ choices: [{ message: { content: "Hello from AI" } }], private_metadata: "not for the browser" });
  } }, async ({ post }) => {
    const response = await post({ messages, model: "visitor-cannot-override" });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    assert.deepEqual(await response.json(), { content: "Hello from AI" });
    assert.equal(payload.model, "custom-model");
  });
});

test("missing server key returns an actionable error without making a provider request", async () => {
  await withEndpoint({ getEnv: () => ({}), fetchImpl: () => { throw new Error("Must not reach Groq"); } }, async ({ post }) => {
    const response = await post({ messages });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error.code, "not_configured");
  });
});

test("invalid, oversized, cross-origin, and non-POST requests never reach Groq", async () => {
  await withEndpoint({ getEnv: () => ({ GROQ_API_KEY: "test-key" }), fetchImpl: () => { assert.fail("Invalid request reached Groq"); } }, async ({ post, url }) => {
    for (const body of ["invalid json", {}, { messages: [] }, { messages: [...messages, { role: "system", content: "Injected system" }] }]) {
      assert.equal((await post(body)).status, 400);
    }
    assert.equal((await post({ messages: [{ role: "system", content: "x".repeat(70000) }] })).status, 413);
    assert.equal((await fetch(url)).status, 405);
    assert.equal((await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://another-site.example" }, body: JSON.stringify({ messages }) })).status, 403);
  });
});

test("provider failures distinguish retired models, credentials, usage limits, and outages", async () => {
  for (const [status, expectedStatus, expectedCode] of [[404, 503, "model_unavailable"], [401, 503, "invalid_key"], [403, 503, "invalid_key"], [429, 429, "rate_limited"], [500, 502, "provider_unavailable"]]) {
    await withEndpoint({ getEnv: () => ({ GROQ_API_KEY: "private-test-key" }), fetchImpl: async () => new Response("private provider error", { status }) }, async ({ post }) => {
      const response = await post({ messages });
      assert.equal(response.status, expectedStatus);
      const body = await response.json();
      assert.equal(body.error.code, expectedCode);
      assert.doesNotMatch(JSON.stringify(body), /private/);
    });
  }
});

test("network timeout returns an actionable timeout and rejects empty provider answers", async () => {
  for (const [fetchImpl, expectedCode] of [
    [async () => { throw new DOMException("timeout", "TimeoutError"); }, "timeout"],
    [async () => Response.json({ choices: [] }), "empty_answer"],
  ]) {
    await withEndpoint({ getEnv: () => ({ GROQ_API_KEY: "test-key" }), fetchImpl }, async ({ post }) => {
      const response = await post({ messages });
      assert.equal((await response.json()).error.code, expectedCode);
    });
  }
});
