import type { IncomingMessage, ServerResponse } from "node:http";

interface ChatHandlerOptions {
  getEnv?: () => Record<string, string | undefined>;
  fetchImpl?: typeof fetch;
}

export function createChatHandler(options?: ChatHandlerOptions): (
  request: IncomingMessage & { body?: unknown },
  response: ServerResponse,
) => Promise<void>;
