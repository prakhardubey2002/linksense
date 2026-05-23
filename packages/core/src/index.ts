export { detect, detectAll, detectBatch, getPlatforms } from "./detect";
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
} from "./types";
