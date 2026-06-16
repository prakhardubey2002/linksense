import { detect } from "../detect";
import type { AiDetectOptions, DetectResult } from "../types";
import { resolveOpenRouterConfig } from "./config";
import { OpenRouterClient } from "./openrouter-client";

export async function detectWithAI(
  url: string,
  options?: AiDetectOptions,
): Promise<DetectResult | null> {
  if (!url.trim()) {
    return null;
  }

  const fallbackToRegex = options?.fallbackToRegex ?? true;
  const regexResult = detect(url);

  if (!options?.forceAi && regexResult && regexResult.platform !== "website") {
    return regexResult;
  }

  const config = resolveOpenRouterConfig(options);
  if (!config) {
    return fallbackToRegex ? regexResult : null;
  }

  try {
    const client = new OpenRouterClient(config, {
      fetch: options?.fetch,
      timeoutMs: options?.timeoutMs,
    });
    const aiResult = await client.detectUrl(url);

    if (!aiResult) {
      return fallbackToRegex ? regexResult : null;
    }

    return {
      platform: aiResult.platform,
      title: aiResult.title,
      icon: aiResult.icon,
      url,
      matches: aiResult.matches ?? [],
    };
  } catch {
    return fallbackToRegex ? regexResult : null;
  }
}

export async function detectBatchWithAI(
  urls: string[],
  options?: AiDetectOptions,
): Promise<Map<string, DetectResult | null>> {
  const results = new Map<string, DetectResult | null>();

  for (const url of urls) {
    results.set(url, await detectWithAI(url, options));
  }

  return results;
}

export function canUseAiDetection(
  options?: Pick<AiDetectOptions, "apiKey" | "model">,
): boolean {
  return resolveOpenRouterConfig(options) !== null && typeof fetch !== "undefined";
}
