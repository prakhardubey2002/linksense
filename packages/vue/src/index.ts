export { useLinkSense } from "./use-linksense";
export type { UseLinkSenseReturn, UseLinkSenseOptions } from "./use-linksense";

export { useDetectAll } from "./use-detect-all";
export type { UseDetectAllReturn } from "./use-detect-all";

export { useNormalizeUrl } from "./use-normalize-url";
export { useExtractFromUrl } from "./use-extract-from-url";

export {
  detect,
  detectAll,
  detectBatch,
  getPlatforms,
  normalizeUrl,
  extractFromUrl,
  parseUrl,
  normalizeHostname,
  removeTrailingSlash,
  isValidUrl,
} from "@linksense/core";

export type {
  DetectResult,
  NormalizedUrl,
  ExtractedData,
  PlatformEntry,
} from "@linksense/core";
