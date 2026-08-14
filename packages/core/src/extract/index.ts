import type { ExtractedData } from "../types";
import { parseUrl, removeTrailingSlash } from "../utils";

export function extractFromUrl(url: string): ExtractedData | null {
  const parsed = parseUrl(url);
  if (!parsed) return null;

  const pathname = removeTrailingSlash(parsed.pathname);
  const segments = pathname.split("/").filter(Boolean);

  const query: Record<string, string> = {};
  if (parsed.search) {
    const params = new URLSearchParams(parsed.search);
    params.forEach((value, key) => {
      query[key] = value;
    });
  }

  return {
    username: segments[0],
    repository: segments[1],
    path: segments.length > 2 ? segments.slice(2).join("/") : undefined,
    query: Object.keys(query).length > 0 ? query : undefined,
  };
}
