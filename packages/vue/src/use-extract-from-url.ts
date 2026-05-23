import { computed, type ComputedRef, type Ref, unref } from "vue";
import { extractFromUrl } from "@linksense/core";
import type { ExtractedData } from "@linksense/core";

export function useExtractFromUrl(
  url: Ref<string | null | undefined> | string | null | undefined,
): ComputedRef<ExtractedData | null> {
  return computed(() => {
    const value = unref(url);
    if (!value) return null;
    return extractFromUrl(value);
  });
}
