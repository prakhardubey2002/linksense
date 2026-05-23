import { describe, it, expect, vi } from "vitest";

/**
 * Bare metal hook tests — mock react useMemo to call the factory synchronously.
 */
vi.mock("react", () => ({
  useMemo: (fn: () => unknown) => fn(),
}));

import { useLinkSense } from "../src/use-linksense";
import { useDetectAll } from "../src/use-detect-all";
import { useNormalizeUrl } from "../src/use-normalize-url";
import { useExtractFromUrl } from "../src/use-extract-from-url";

describe("useLinkSense", () => {
  it("detects a GitHub URL", () => {
    const { result, isDetected, platform } = useLinkSense("https://github.com/torvalds/linux");
    expect(isDetected).toBe(true);
    expect(platform).toBe("github");
    expect(result).not.toBeNull();
    expect(result!.title).toBe("GitHub");
    expect(result!.matches).toContain("torvalds");
  });

  it("returns null state for null url", () => {
    const { result, isDetected, platform, results } = useLinkSense(null);
    expect(result).toBeNull();
    expect(isDetected).toBe(false);
    expect(platform).toBeNull();
    expect(results).toEqual([]);
  });

  it("returns null state for undefined url", () => {
    const { result, isDetected } = useLinkSense(undefined);
    expect(result).toBeNull();
    expect(isDetected).toBe(false);
  });

  it("returns null state for empty string", () => {
    const { isDetected, platform } = useLinkSense("");
    expect(isDetected).toBe(false);
    expect(platform).toBeNull();
  });

  it("returns single-item results array by default", () => {
    const { results } = useLinkSense("https://github.com/user");
    expect(results.length).toBe(1);
  });

  it("returns all matches when all option is true", () => {
    const { results } = useLinkSense("https://github.com/user/repo", { all: true });
    expect(results.length).toBeGreaterThanOrEqual(2);
    const platforms = results.map((r) => r.platform);
    expect(platforms).toContain("github");
    expect(platforms).toContain("githubProfile");
  });

  it("includes normalized data when normalize option is true", () => {
    const { normalized } = useLinkSense("https://WWW.GitHub.Com/user/", { normalize: true });
    expect(normalized).not.toBeNull();
    expect(normalized!.hostname).toBe("github.com");
    expect(normalized!.pathname).toBe("/user");
  });

  it("normalized is null when normalize option is false", () => {
    const { normalized } = useLinkSense("https://github.com/user");
    expect(normalized).toBeNull();
  });

  it("includes extracted data when extract option is true", () => {
    const { extracted } = useLinkSense("https://github.com/user/repo?tab=code", { extract: true });
    expect(extracted).not.toBeNull();
    expect(extracted!.username).toBe("user");
    expect(extracted!.repository).toBe("repo");
    expect(extracted!.query).toEqual({ tab: "code" });
  });

  it("extracted is null when extract option is false", () => {
    const { extracted } = useLinkSense("https://github.com/user");
    expect(extracted).toBeNull();
  });

  it("detects LinkedIn URL", () => {
    const { platform, isDetected } = useLinkSense("https://linkedin.com/in/johndoe");
    expect(isDetected).toBe(true);
    expect(platform).toBe("linkedin");
  });

  it("detects Twitter/X URL", () => {
    const { platform } = useLinkSense("https://x.com/elonmusk");
    expect(platform).toBe("twitter");
  });

  it("returns website as fallback for unknown domains", () => {
    const { platform } = useLinkSense("https://random-site.org/page");
    expect(platform).toBe("website");
  });
});

describe("useDetectAll", () => {
  it("returns all matching platforms for a GitHub URL", () => {
    const { results, isDetected, platforms } = useDetectAll("https://github.com/user/repo");
    expect(isDetected).toBe(true);
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(platforms).toContain("github");
    expect(platforms).toContain("githubProfile");
  });

  it("returns empty state for null url", () => {
    const { results, isDetected, platforms } = useDetectAll(null);
    expect(results).toEqual([]);
    expect(isDetected).toBe(false);
    expect(platforms).toEqual([]);
  });

  it("returns empty state for undefined url", () => {
    const { isDetected } = useDetectAll(undefined);
    expect(isDetected).toBe(false);
  });

  it("includes website match for valid URLs", () => {
    const { platforms } = useDetectAll("https://example.com/page");
    expect(platforms).toContain("website");
  });
});

describe("useNormalizeUrl", () => {
  it("normalizes a URL", () => {
    const result = useNormalizeUrl("https://WWW.LinkedIn.Com/in/user/");
    expect(result).not.toBeNull();
    expect(result!.hostname).toBe("linkedin.com");
    expect(result!.pathname).toBe("/in/user");
    expect(result!.protocol).toBe("https:");
  });

  it("returns null for null url", () => {
    expect(useNormalizeUrl(null)).toBeNull();
  });

  it("returns null for undefined url", () => {
    expect(useNormalizeUrl(undefined)).toBeNull();
  });

  it("returns null for invalid url", () => {
    expect(useNormalizeUrl("not-a-url")).toBeNull();
  });
});

describe("useExtractFromUrl", () => {
  it("extracts segments from a GitHub URL", () => {
    const result = useExtractFromUrl("https://github.com/user/repo/tree/main");
    expect(result).not.toBeNull();
    expect(result!.username).toBe("user");
    expect(result!.repository).toBe("repo");
    expect(result!.path).toBe("tree/main");
  });

  it("extracts query parameters", () => {
    const result = useExtractFromUrl("https://example.com/page?sort=stars&lang=ts");
    expect(result).not.toBeNull();
    expect(result!.query).toEqual({ sort: "stars", lang: "ts" });
  });

  it("returns null for null url", () => {
    expect(useExtractFromUrl(null)).toBeNull();
  });

  it("returns null for undefined url", () => {
    expect(useExtractFromUrl(undefined)).toBeNull();
  });

  it("returns null for invalid url", () => {
    expect(useExtractFromUrl("not-a-url")).toBeNull();
  });
});
