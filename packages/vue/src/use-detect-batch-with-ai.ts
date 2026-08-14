import { computed, type ComputedRef, type Ref, unref } from "vue";
import { detectBatchWithAI } from "@linksense/core";
import type { AiDetectOptions, DetectResult } from "@linksense/core";

export function useDetectBatchWithAI(
  urls: Ref<string[] | null | undefined> | string[] | null | undefined,
  options: AiDetectOptions = {},
): ComputedRef<Promise<Map<string, DetectResult | null>>> {
  const {
    apiKey,
    model,
    forceAi = false,
    fallbackToRegex = true,
    fetch,
    timeoutMs,
  } = options;

  return computed(() => {
    const value = unref(urls);
    if (!value || value.length === 0) {
      return Promise.resolve(new Map<string, DetectResult | null>());
    }

    return detectBatchWithAI(value, {
      apiKey,
      model,
      forceAi,
      fallbackToRegex,
      fetch,
      timeoutMs,
    });
  });
}

