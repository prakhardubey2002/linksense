import { computed, type ComputedRef, type Ref, unref } from "vue";
import { normalizeUrl } from "@linksense/core";
import type { NormalizedUrl } from "@linksense/core";

export function useNormalizeUrl(
  url: Ref<string | null | undefined> | string | null | undefined,
): ComputedRef<NormalizedUrl | null> {
  return computed(() => {
    const value = unref(url);
    if (!value) return null;
    return normalizeUrl(value);
  });
}
