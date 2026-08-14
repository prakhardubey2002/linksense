import { Injectable } from "@angular/core";
import {
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
import type {
  DetectResult,
  NormalizedUrl,
  ExtractedData,
  PlatformEntry,
  AiDetectOptions,
} from "@linksense/core";

@Injectable({
  providedIn: "root",
})
export class LinkSenseService {
  detect(url: string): DetectResult | null {
    return detect(url);
  }

  detectAll(url: string): DetectResult[] {
    return detectAll(url);
  }

  detectBatch(urls: string[]): Map<string, DetectResult | null> {
    return detectBatch(urls);
  }

  detectWithAI(url: string, options?: AiDetectOptions): Promise<DetectResult | null> {
    return detectWithAI(url, options);
  }

  detectBatchWithAI(
    urls: string[],
    options?: AiDetectOptions,
  ): Promise<Map<string, DetectResult | null>> {
    return detectBatchWithAI(urls, options);
  }

  canUseAiDetection(options?: Pick<AiDetectOptions, "apiKey" | "model">): boolean {
    return canUseAiDetection(options);
  }

  getPlatforms(): PlatformEntry[] {
    return getPlatforms();
  }

  normalizeUrl(url: string): NormalizedUrl | null {
    return normalizeUrl(url);
  }

  extractFromUrl(url: string): ExtractedData | null {
    return extractFromUrl(url);
  }

  parseUrl(url: string): NormalizedUrl | null {
    return parseUrl(url);
  }

  normalizeHostname(hostname: string): string {
    return normalizeHostname(hostname);
  }

  removeTrailingSlash(path: string): string {
    return removeTrailingSlash(path);
  }

  isValidUrl(url: string): boolean {
    return isValidUrl(url);
  }
}
