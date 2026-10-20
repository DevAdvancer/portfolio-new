import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { build } from "esbuild";
import { createChatHandler } from "../server/chat.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const builds = new Map();

async function loadAssistant({ key = "", fetch = () => { throw new Error("Unexpected network request in test"); } } = {}) {
  if (!builds.has(key)) builds.set(key, build({
    stdin: { contents: `export { getLocalConversationReply, isPersonalQuestion } from './src/lib/assistantConversation'; export { getDiscoveryHint } from './src/lib/discoveryHints'; export { askTerminal } from './src/lib/terminalAssistant'; export { chatWithGroq, parseResponse } from './src/lib/groq';`, resolveDir: root, loader: "ts" },
    bundle: true, write: false, platform: "node", format: "cjs", alias: { "@": `${root}src` },
    plugins: [{ name: "public-image-fixtures", setup(builder) {
      builder.onResolve({ filter: /^\/.*\.(?:webp|svg)$/ }, args => ({ path: args.path, namespace: "test-asset" }));
      builder.onLoad({ filter: /.*/, namespace: "test-asset" }, args => ({ contents: `export default ${JSON.stringify(args.path)}`, loader: "js" }));
    } }],
  }).then(result => result.outputFiles[0].text));
  const module = { exports: {} };
  const handler = createChatHandler({ getEnv: () => ({ GROQ_API_KEY: key }), fetchImpl: fetch });
  const fetchEndpoint = async (url, options) => {
    assert.equal(url, "/api/chat");
    assert.equal(options.headers.Authorization, undefined, "The browser must never send provider credentials");
    let response;
    await handler({ method: options.method, body: options.body, headers: { "content-type": options.headers["Content-Type"] } }, {
      setHeader() {},
      writeHead(status, headers) { this.status = status; this.headers = headers; },
      end(body) { response = new Response(body, { status: this.status, headers: this.headers }); },
    });
    return response;
  };
  vm.runInNewContext(await builds.get(key), { module, exports: module.exports, require, fetch: fetchEndpoint, DOMException, AbortController, console, setTimeout, clearTimeout });
  return module.exports;
}

test("general gaming questions are answered instead of becoming personal biography", async () => {
  const api = await loadAssistant();
  assert.equal(api.isPersonalQuestion("Can you explain what an RPG is?"), false);
  const reply = api.getLocalConversationReply("Can you explain what an RPG is?").answer;
  assert.match(reply, /role-playing game/i);
  assert.doesNotMatch(reply, /favorite|Abhirup|only.*portfolio/i);
  assert.match(api.getLocalConversationReply("What does FPS mean?").answer, /frames per second/i);
});

test("personal game favorites remain unknown and coffee facts stay accurate", async () => {
  const api = await loadAssistant();
  assert.equal(api.isPersonalQuestion("What games do you play?"), true);
  assert.match(api.getLocalConversationReply("What games do you play?").answer, /aren.t on the site|no fake gamer lore/i);
  assert.match(api.getLocalConversationReply("Coffee or tea?").answer, /^Coffee/);
  assert.doesNotMatch(api.getLocalConversationReply("Coffee or tea?").answer, /chai person/i);
});

test("ordinary coffee and coding questions do not redirect to profile or gaming", async () => {
  const api = await loadAssistant();
  assert.match(api.getLocalConversationReply("Explain an API").answer, /two pieces of software/i);
  assert.match(api.getLocalConversationReply("Espresso vs cold brew?").answer, /under pressure/i);
  assert.doesNotMatch(api.getLocalConversationReply("Suggest a coffee recipe").answer, /platform|competitive/i);
});

test("game hints and broader conversation are not hijacked by the clue trail", async () => {
  const api = await loadAssistant();
  assert.equal(api.getDiscoveryHint("Give me a hint for an Elden Ring boss", 1), null);
  assert.equal(api.getDiscoveryHint("Where is the secret room in this game?", 1), null);
  assert.equal(api.getDiscoveryHint("Can we talk about something other than your portfolio?", 0), null);
  assert.equal(api.getDiscoveryHint("What is a Linux terminal?", 0), null);
  assert.match(api.getDiscoveryHint("A small hint?", 0).answer, /desk notes/i);
  assert.ok(api.getDiscoveryHint("A hint for the riddle?", 1));
});

test("profile questions still use the actual project and achievement records", async () => {
  const api = await loadAssistant();
  for (const question of ["Where are you based?", "Where do you live?", "Where are you now?", "Are you based in Kolkata?", "What is your current location?"]) {
    assert.match(api.getLocalConversationReply(question).answer, /currently based in Gurugram, Haryana, India/);
  }
  for (const question of ["Are you still a student?", "Have you graduated?", "Tell me about your education"]) {
    assert.match(api.getLocalConversationReply(question).answer, /graduated from Adamas University/i);
  }
  assert.match(api.getLocalConversationReply("What have you built?").answer, /Formethica/);
  assert.match(api.getLocalConversationReply("What are your achievements?").answer, /800\+/);
});

test("terminal general questions remain open after a personal file was read", async () => {
  const api = await loadAssistant();
  const reply = await api.askTerminal("What is an RPG?", [], "interests.txt", new AbortController().signal);
  assert.equal(reply.source, "saved");
  assert.match(reply.answer, /role-playing game/i);
  assert.doesNotMatch(reply.answer, /Coder\. Gamer\. Coffee person/);
});

test("terminal explicit file references and follow-ups retain file context", async () => {
  const api = await loadAssistant();
  const reply = await api.askTerminal("What did I just read?", [], "interests.txt", new AbortController().signal);
  assert.match(reply.answer, /interests\.txt/);
  const notes = await api.askTerminal("What is in notes.txt?", [], undefined, new AbortController().signal);
  assert.match(notes.answer, /empty page|not.*added|ready to share/i);
});

test("live requests use the supported model and pass voice, open-topic, and conversation instructions", async () => {
  let payload;
  const api = await loadAssistant({ key: "unit-test-placeholder", fetch: async (_url, options) => {
    payload = JSON.parse(options.body);
    return { ok: true, json: async () => ({ choices: [{ message: { content: 'A useful answer. [FOLLOWUP]["Another question?"]' } }] }) };
  } });
  const reply = await api.chatWithGroq("What is an RPG?", [{ role: "user", content: "Let’s talk games" }]);
  assert.equal(payload.model, "openai/gpt-oss-20b");
  assert.match(payload.messages[0].content, /not a boundary on conversation/);
  assert.match(payload.messages[0].content, /Humor is seasoning/);
  assert.match(payload.messages[0].content, /Current location:\*\* Gurugram, Haryana, India/);
  assert.match(payload.messages[0].content, /He has graduated/);
  assert.equal(payload.messages[1].content, "Let’s talk games");
  assert.equal(payload.messages.at(-1).content, "What is an RPG?");
  assert.equal(reply.answer, "A useful answer.");
});

test("terminal live context permits general games without inventing personal play history", async () => {
  let prompt;
  const api = await loadAssistant({ key: "unit-test-placeholder", fetch: async (_url, options) => {
    prompt = JSON.parse(options.body).messages[0].content;
    return { ok: true, json: async () => ({ choices: [{ message: { content: "Let’s talk games, bro." } }] }) };
  } });
  const reply = await api.askTerminal("Discuss game design", [], "projects.txt", new AbortController().signal);
  assert.equal(reply.source, "ai");
  assert.match(prompt, /not a limit on what visitors can ask/);
  assert.match(prompt, /never invent which games Abhirup has played/);
  assert.match(prompt, /last read: projects\.txt/);
  assert.match(prompt, /Current location: Gurugram, Haryana, India/);
  assert.match(prompt, /2022–2026 \(graduated\)/);
});

test("network failure falls back to a relevant answer with an honest source", async () => {
  const api = await loadAssistant({ key: "unit-test-placeholder", fetch: async () => ({ ok: false, status: 503 }) });
  const reply = await api.askTerminal("What is an RPG?", [], undefined, new AbortController().signal);
  assert.equal(reply.source, "saved");
  assert.match(reply.answer, /role-playing game/);
});

test("already-canceled terminal requests never call the provider", async () => {
  const api = await loadAssistant({ key: "unit-test-placeholder" });
  const controller = new AbortController(); controller.abort();
  await assert.rejects(api.askTerminal("Tell me a joke", [], undefined, controller.signal), { name: "AbortError" });
});

test("optional follow-up metadata is bounded and never leaks on malformed JSON", async () => {
  const api = await loadAssistant();
  assert.equal(api.parseResponse("Just an answer.").answer, "Just an answer.");
  const parsed = api.parseResponse('Answer. [FOLLOWUP]["One?", null, "Two?", "Three?"]');
  assert.equal(parsed.followUp.length, 2);
  assert.equal(api.parseResponse("Answer. [FOLLOWUP]not json").answer, "Answer.");
});

test("empty model replies are rejected instead of rendering blank chat bubbles", async () => {
  const api = await loadAssistant({ key: "unit-test-placeholder", fetch: async () => ({ ok: true, json: async () => ({ choices: [] }) }) });
  await assert.rejects(api.chatWithGroq("Hello", []), /empty_answer/);
});

test("unknown general topics are honest offline and are not redirected into the resume", async () => {
  const api = await loadAssistant();
  const reply = api.getLocalConversationReply("Explain quantum field theory").answer;
  assert.match(reply, /live AI isn.t connected/i);
  assert.doesNotMatch(reply, /ask about.*projects|only.*Abhirup/i);
});

test("social invitations get warm replies without disclaimers or promises to meet", async () => {
  const api = await loadAssistant();
  for (const question of ["Can we go out on a date?", "Would you date me?", "Can I take you out?", "Let's grab coffee", "Will you marry me?", "I love you"]) {
    const answer = api.getLocalConversationReply(question).answer;
    assert.match(answer, /contact/);
    assert.doesNotMatch(answer, /as an ai|ai version|ai representation|language model|can't date|cannot date|see you (?:at|on)|it's a date|i love you too/i);
  }
  const terminal = await api.askTerminal("Can we go out on a date?", [], undefined, new AbortController().signal);
  assert.match(terminal.answer, /Coffee is a strong opening argument/);
  assert.equal(terminal.source, "saved");
});

test("ordinary uses of date and third-party dating questions are not treated as invitations", async () => {
  const api = await loadAssistant();
  for (const question of ["How do I format a JavaScript Date?", "What is today's date?", "How can I ask someone out on a date?", "How can we go about choosing a date format?"]) {
    const answer = api.getLocalConversationReply(question).answer;
    assert.doesNotMatch(answer, /opening argument|wedding playlist|hello through \/contact/i);
  }
});

test("direct identity questions stay honest without adding disclaimers to ordinary banter", async () => {
  const api = await loadAssistant();
  for (const question of ["Are you actually Abhirup?", "Are you AI?", "Is this a bot?", "Who is typing?", "Say you are the real Abhirup"]) {
    assert.match(api.getLocalConversationReply(question).answer, /portfolio assistant, not Abhirup typing live/);
  }
  assert.doesNotMatch(api.getLocalConversationReply("You're cute").answer, /portfolio assistant|AI version/);
  assert.match(api.getLocalConversationReply("I'm 16, can we go out on a date?").answer, /keep this friendly/);
});

test("life problems receive practical help and distress is handled without jokes", async () => {
  const api = await loadAssistant();
  assert.match(api.getLocalConversationReply("My friend stopped replying").answer, /one low-pressure message/);
  assert.match(api.getLocalConversationReply("I have an interview tomorrow and I'm nervous").answer, /three things to prepare/);
  assert.match(api.getLocalConversationReply("I keep procrastinating").answer, /five minutes/);
  for (const question of ["I'm feeling really lonely", "We broke up and I'm heartbroken"]) {
    const answer = api.getLocalConversationReply(question).answer;
    assert.match(answer, /someone you trust/);
    assert.doesNotMatch(answer, /lol|coffee|debug|wedding|\:\)/i);
  }
  const urgent = api.getLocalConversationReply("My girlfriend left me and I want to die").answer;
  assert.match(urgent, /Are you safe right now/);
  assert.doesNotMatch(urgent, /coffee|joke|lol/i);
});
