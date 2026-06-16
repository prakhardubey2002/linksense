import platforms from "../data/platforms.json";
import type { PlatformEntry } from "../types";

const KNOWN_PLATFORMS: PlatformEntry[] = platforms.filter(
  (platform) => platform.name !== "website",
);

export function buildDetectionPrompt(url: string): {
  system: string;
  user: string;
} {
  const platformCatalog = KNOWN_PLATFORMS.map(
    (platform) =>
      `- ${platform.name}: title="${platform.title}", icon="${platform.icon}"`,
  ).join("\n");

  const system = `You identify which platform or service a URL belongs to.
Respond with a single JSON object only — no markdown, no explanation.

Required fields:
- "platform": lowercase slug (use an exact name from the catalog when it matches)
- "title": human-readable platform name
- "icon": Iconify icon id in "collection:icon-name" form (e.g. lucide:github, simple-icons:udemy)
- "matches": array of meaningful path/query segments extracted from the URL (strings, may be empty)

When the URL matches a known platform, reuse its exact "platform" name and "icon" from the catalog.
For unknown sites, invent a sensible slug, title, and pick an appropriate Iconify icon (prefer lucide:globe as fallback).

Known platforms:
${platformCatalog}`;

  const user = `Analyze this URL and return JSON:\n${url}`;

  return { system, user };
}
