export { useLinkSense } from "./use-linksense";
export type { UseLinkSenseReturn, UseLinkSenseOptions } from "./use-linksense";

export { useDetectAll } from "./use-detect-all";
export type { UseDetectAllReturn } from "./use-detect-all";

export { useNormalizeUrl } from "./use-normalize-url";
export { useExtractFromUrl } from "./use-extract-from-url";

export { useDetectWithAI } from "./use-detect-with-ai";
export { useDetectBatchWithAI } from "./use-detect-batch-with-ai";

export {
  detect,
  detectAll,
  detectBatch,
  detectWithAI,
  detectBatchWithAI,
  canUseAiDetection,
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
  AiDetectOptions,
  OpenRouterConfig,
  AiDetectionPayload,
} from "@linksense/core";
