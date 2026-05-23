import platforms from "../data/platforms.json";
import type { DetectResult } from "../types";

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
