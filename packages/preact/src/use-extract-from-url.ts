import { useMemo } from "preact/hooks";
import { extractFromUrl } from "@linksense/core";
import type { ExtractedData } from "@linksense/core";

export function useExtractFromUrl(
  url: string | null | undefined,
): ExtractedData | null {
  return useMemo(() => {
    if (!url) return null;
    return extractFromUrl(url);
  }, [url]);
}
