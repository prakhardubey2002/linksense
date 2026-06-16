export { LinkSenseService } from "./linksense.service";

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
