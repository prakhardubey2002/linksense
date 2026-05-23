import platforms from "../data/platforms.json";
import type { DetectResult, PlatformEntry } from "../types";

export function detect(url: string): DetectResult | null {
  for (const platform of platforms) {
    const regex = new RegExp(platform.regex);
    const match = regex.exec(url);

    if (match) {
      return {
        platform: platform.name,
        title: platform.title,
        icon: platform.icon,
        url,
        matches: match.slice(1).filter(Boolean),
      };
    }
  }

  return null;
}

export function detectAll(url: string): DetectResult[] {
  const results: DetectResult[] = [];

  for (const platform of platforms) {
    const regex = new RegExp(platform.regex);
    const match = regex.exec(url);

    if (match) {
      results.push({
        platform: platform.name,
        title: platform.title,
        icon: platform.icon,
        url,
        matches: match.slice(1).filter(Boolean),
      });
    }
  }

  return results;
}

export function detectBatch(
  urls: string[],
): Map<string, DetectResult | null> {
  const results = new Map<string, DetectResult | null>();
  for (const url of urls) {
    results.set(url, detect(url));
  }
  return results;
}

export function getPlatforms(): PlatformEntry[] {
  return [...platforms];
}
