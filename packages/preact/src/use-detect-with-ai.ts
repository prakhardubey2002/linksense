import { useMemo } from "preact/hooks";
import { detectWithAI } from "@linksense/core";
import type { AiDetectOptions, DetectResult } from "@linksense/core";

export function useDetectWithAI(
  url: string | null | undefined,
  options: AiDetectOptions = {},
): Promise<DetectResult | null> {
  const {
    apiKey,
    model,
    forceAi = false,
    fallbackToRegex = true,
    fetch,
    timeoutMs,
  } = options;

  return useMemo(() => {
    if (!url) return Promise.resolve(null);

    return detectWithAI(url, {
      apiKey,
      model,
      forceAi,
      fallbackToRegex,
      fetch,
      timeoutMs,
    });
  }, [url, apiKey, model, forceAi, fallbackToRegex, fetch, timeoutMs]);
}

