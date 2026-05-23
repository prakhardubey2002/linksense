import { useMemo } from "preact/hooks";
import { normalizeUrl } from "@linksense/core";
import type { NormalizedUrl } from "@linksense/core";

export function useNormalizeUrl(
  url: string | null | undefined,
): NormalizedUrl | null {
  return useMemo(() => {
    if (!url) return null;
    return normalizeUrl(url);
  }, [url]);
}
