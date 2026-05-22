import { useMemo } from "preact/hooks";
import { detect } from "@linksense/core";
import type { DetectResult } from "@linksense/core";

export interface UseLinkSenseResult {
  result: DetectResult | null;
  isDetected: boolean;
  platform: string | null;
}

export function useLinkSense(url: string | null | undefined): UseLinkSenseResult {
  return useMemo(() => {
    if (!url) {
      return { result: null, isDetected: false, platform: null };
    }

    const result = detect(url);
    return {
      result,
      isDetected: result !== null,
      platform: result?.platform ?? null,
    };
  }, [url]);
}
