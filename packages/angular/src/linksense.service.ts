import { Injectable } from "@angular/core";
import {
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
import type {
  DetectResult,
  NormalizedUrl,
  ExtractedData,
  PlatformEntry,
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
