export { detect, detectAll, detectBatch, getPlatforms } from "./detect";
export {
  detectWithAI,
  detectBatchWithAI,
  canUseAiDetection,
  resolveOpenRouterConfig,
  OpenRouterClient,
  parseAiDetectionResponse,
  isValidIconifyId,
  normalizeIconifyId,
} from "./ai";
export { normalizeUrl } from "./normalize";
export { extractFromUrl } from "./extract";
export {
  parseUrl,
  normalizeHostname,
  removeTrailingSlash,
  isValidUrl,
} from "./utils";
export type {
  DetectResult,
  NormalizedUrl,
  ExtractedData,
  PlatformEntry,
  OpenRouterConfig,
  AiDetectOptions,
  AiDetectionPayload,
} from "./types";
