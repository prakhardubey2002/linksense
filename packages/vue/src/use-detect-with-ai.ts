import {
  computed,
  type ComputedRef,
  type Ref,
  unref,
} from "vue";
import { detectWithAI } from "@linksense/core";
import type { AiDetectOptions, DetectResult } from "@linksense/core";

export function useDetectWithAI(
  url: Ref<string | null | undefined> | string | null | undefined,
  options: AiDetectOptions = {},
): ComputedRef<Promise<DetectResult | null>> {
  const {
    apiKey,
    model,
    forceAi = false,
    fallbackToRegex = true,
    fetch,
    timeoutMs,
  } = options;

  return computed(() => {
    const value = unref(url);
    if (!value) return Promise.resolve(null);

    return detectWithAI(value, {
      apiKey,
      model,
      forceAi,
      fallbackToRegex,
      fetch,
      timeoutMs,
    });
  });
}

