export { LinkSenseService } from "./linksense.service";

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
