import type { OpenRouterConfig } from "../types";
import { buildDetectionPrompt } from "./prompt";
import { parseAiDetectionResponse } from "./parse-response";
import type { AiDetectionPayload } from "../types";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface OpenRouterClientOptions {
  fetch?: typeof fetch;
  referer?: string;
  title?: string;
  timeoutMs?: number;
}

export class OpenRouterClient {
  private readonly fetchImpl: typeof fetch;
  private readonly referer: string;
  private readonly title: string;
  private readonly timeoutMs: number;

  constructor(private readonly config: OpenRouterConfig, options?: OpenRouterClientOptions) {
    this.fetchImpl = options?.fetch ?? globalThis.fetch;
    this.referer = options?.referer ?? "https://github.com/prakhardubey2002/linksense";
    this.title = options?.title ?? "LinkSense";
    this.timeoutMs = options?.timeoutMs ?? 25_000;
  }

  async detectUrl(url: string): Promise<AiDetectionPayload | null> {
    const { system, user } = buildDetectionPrompt(url);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await this.fetchImpl(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": this.referer,
          "X-Title": this.title,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `OpenRouter request failed (${response.status} ${response.statusText})`,
        );
      }

      const body = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };

      const content = body.choices?.[0]?.message?.content;
      if (!content) {
        return null;
      }

      return parseAiDetectionResponse(content);
    } finally {
      clearTimeout(timeout);
    }
  }
}
