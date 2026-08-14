import { computed, type ComputedRef, type Ref, unref } from "vue";
import { detectAll } from "@linksense/core";
import type { DetectResult } from "@linksense/core";

export interface UseDetectAllReturn {
  results: ComputedRef<DetectResult[]>;
  isDetected: ComputedRef<boolean>;
  platforms: ComputedRef<string[]>;
}

export function useDetectAll(
  url: Ref<string | null | undefined> | string | null | undefined,
): UseDetectAllReturn {
  const results = computed(() => {
    const value = unref(url);
    if (!value) return [];
    return detectAll(value);
  });

  const isDetected = computed(() => results.value.length > 0);

  const platforms = computed(() => results.value.map((r) => r.platform));

  return { results, isDetected, platforms };
}
