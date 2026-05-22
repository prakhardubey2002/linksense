import { computed, type ComputedRef, type Ref, unref } from "vue";
import { detect } from "@linksense/core";
import type { DetectResult } from "@linksense/core";

export interface UseLinkSenseReturn {
  result: ComputedRef<DetectResult | null>;
  isDetected: ComputedRef<boolean>;
  platform: ComputedRef<string | null>;
}

export function useLinkSense(url: Ref<string | null | undefined> | string | null | undefined): UseLinkSenseReturn {
  const result = computed(() => {
    const value = unref(url);
    if (!value) return null;
    return detect(value);
  });

  const isDetected = computed(() => result.value !== null);
  const platform = computed(() => result.value?.platform ?? null);

  return { result, isDetected, platform };
}
