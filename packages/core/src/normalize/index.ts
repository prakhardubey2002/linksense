import type { NormalizedUrl } from "../types";
import { parseUrl, removeTrailingSlash, normalizeHostname } from "../utils";

export function normalizeUrl(url: string): NormalizedUrl | null {
  const parsed = parseUrl(url);
  if (!parsed) return null;

  return {
    ...parsed,
    hostname: normalizeHostname(parsed.hostname),
    pathname: removeTrailingSlash(parsed.pathname),
  };
}
