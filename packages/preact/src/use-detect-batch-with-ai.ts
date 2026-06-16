import { useMemo } from "preact/hooks";
import { detectBatchWithAI } from "@linksense/core";
import type { AiDetectOptions, DetectResult } from "@linksense/core";

export function useDetectBatchWithAI(
  urls: string[] | null | undefined,
  options: AiDetectOptions = {},
): Promise<Map<string, DetectResult | null>> {
  const {
    apiKey,
    model,
    forceAi = false,
    fallbackToRegex = true,
    fetch,
    timeoutMs,
  } = options;

  return useMemo(() => {
    if (!urls || urls.length === 0) {
      return Promise.resolve(new Map<string, DetectResult | null>());
    }

    return detectBatchWithAI(urls, {
      apiKey,
      model,
      forceAi,
      fallbackToRegex,
      fetch,
      timeoutMs,
    });
  }, [urls, apiKey, model, forceAi, fallbackToRegex, fetch, timeoutMs]);
}

