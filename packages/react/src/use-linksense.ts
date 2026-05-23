import { useMemo } from "react";
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
  /** Return all matching platforms instead of just the first */
  all?: boolean;
  /** Include normalized URL data in the result */
  normalize?: boolean;
  /** Include extracted path/query data in the result */
  extract?: boolean;
}

export interface UseLinkSenseResult {
  result: DetectResult | null;
  results: DetectResult[];
  isDetected: boolean;
  platform: string | null;
  normalized: NormalizedUrl | null;
  extracted: ExtractedData | null;
}

export function useLinkSense(
  url: string | null | undefined,
  options: UseLinkSenseOptions = {},
): UseLinkSenseResult {
  const { all = false, normalize = false, extract = false } = options;

  return useMemo(() => {
    if (!url) {
      return {
        result: null,
        results: [],
        isDetected: false,
        platform: null,
        normalized: null,
        extracted: null,
      };
    }

    const result = detect(url);
    const results = all ? detectAll(url) : result ? [result] : [];

    return {
      result,
      results,
      isDetected: result !== null,
      platform: result?.platform ?? null,
      normalized: normalize ? normalizeUrl(url) : null,
      extracted: extract ? extractFromUrl(url) : null,
    };
  }, [url, all, normalize, extract]);
}
