import { computed, type ComputedRef, type Ref, unref } from "vue";
import {
  detect,
  detectAll,
  normalizeUrl,
  extractFromUrl,
} from "@linksense/core";
import type {
  DetectResult,
  NormalizedUrl,
  ExtractedData,
} from "@linksense/core";

export interface UseLinkSenseOptions {
  all?: boolean;
  normalize?: boolean;
  extract?: boolean;
}

export interface UseLinkSenseReturn {
  result: ComputedRef<DetectResult | null>;
  results: ComputedRef<DetectResult[]>;
  isDetected: ComputedRef<boolean>;
  platform: ComputedRef<string | null>;
  normalized: ComputedRef<NormalizedUrl | null>;
  extracted: ComputedRef<ExtractedData | null>;
}

export function useLinkSense(
  url: Ref<string | null | undefined> | string | null | undefined,
  options: UseLinkSenseOptions = {},
): UseLinkSenseReturn {
  const { all = false, normalize = false, extract = false } = options;

  const result = computed(() => {
    const value = unref(url);
    if (!value) return null;
    return detect(value);
  });

  const results = computed(() => {
    const value = unref(url);
    if (!value) return [];
    if (all) return detectAll(value);
    const first = result.value;
    return first ? [first] : [];
  });

  const isDetected = computed(() => result.value !== null);

  const platform = computed(() => result.value?.platform ?? null);

  const normalized = computed(() => {
    const value = unref(url);
    if (!value || !normalize) return null;
    return normalizeUrl(value);
  });

  const extracted = computed(() => {
    const value = unref(url);
    if (!value || !extract) return null;
    return extractFromUrl(value);
  });

  return {
    result,
    results,
    isDetected,
    platform,
    normalized,
    extracted,
  };
}
