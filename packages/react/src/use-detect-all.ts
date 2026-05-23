import { useMemo } from "react";
import { detectAll } from "@linksense/core";
import type { DetectResult } from "@linksense/core";

export interface UseDetectAllResult {
  results: DetectResult[];
  isDetected: boolean;
  platforms: string[];
}

export function useDetectAll(
  url: string | null | undefined,
): UseDetectAllResult {
  return useMemo(() => {
    if (!url) {
      return { results: [], isDetected: false, platforms: [] };
    }

    const results = detectAll(url);
    return {
      results,
      isDetected: results.length > 0,
      platforms: results.map((r) => r.platform),
    };
  }, [url]);
}
