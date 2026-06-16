import { describe, it, expect } from "vitest";
import * as preactPkg from "../src/index";

describe("@linksense/preact exports", () => {
  it("exports useLinkSense hook", () => {
    expect(typeof preactPkg.useLinkSense).toBe("function");
  });

  it("exports useDetectAll hook", () => {
    expect(typeof preactPkg.useDetectAll).toBe("function");
  });

  it("exports useNormalizeUrl hook", () => {
    expect(typeof preactPkg.useNormalizeUrl).toBe("function");
  });

  it("exports useExtractFromUrl hook", () => {
    expect(typeof preactPkg.useExtractFromUrl).toBe("function");
  });

  it("exports useDetectWithAI hook", () => {
    expect(typeof preactPkg.useDetectWithAI).toBe("function");
  });

  it("exports useDetectBatchWithAI hook", () => {
    expect(typeof preactPkg.useDetectBatchWithAI).toBe("function");
  });

  it("re-exports core detect function", () => {
    expect(typeof preactPkg.detect).toBe("function");
  });

  it("re-exports core detectAll function", () => {
    expect(typeof preactPkg.detectAll).toBe("function");
  });

  it("re-exports core detectBatch function", () => {
    expect(typeof preactPkg.detectBatch).toBe("function");
  });

  it("re-exports core detectWithAI function", () => {
    expect(typeof preactPkg.detectWithAI).toBe("function");
  });

  it("re-exports core detectBatchWithAI function", () => {
    expect(typeof preactPkg.detectBatchWithAI).toBe("function");
  });

  it("re-exports core canUseAiDetection function", () => {
    expect(typeof preactPkg.canUseAiDetection).toBe("function");
  });

  it("re-exports core getPlatforms function", () => {
    expect(typeof preactPkg.getPlatforms).toBe("function");
  });

  it("re-exports core normalizeUrl function", () => {
    expect(typeof preactPkg.normalizeUrl).toBe("function");
  });

  it("re-exports core extractFromUrl function", () => {
    expect(typeof preactPkg.extractFromUrl).toBe("function");
  });

  it("re-exports core parseUrl function", () => {
    expect(typeof preactPkg.parseUrl).toBe("function");
  });

  it("re-exports core normalizeHostname function", () => {
    expect(typeof preactPkg.normalizeHostname).toBe("function");
  });

  it("re-exports core removeTrailingSlash function", () => {
    expect(typeof preactPkg.removeTrailingSlash).toBe("function");
  });

  it("re-exports core isValidUrl function", () => {
    expect(typeof preactPkg.isValidUrl).toBe("function");
  });
});

describe("re-exported core functions work correctly", () => {
  it("detect identifies GitHub URL", () => {
    const result = preactPkg.detect("https://github.com/torvalds/linux");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("github");
    expect(result!.title).toBe("GitHub");
    expect(result!.matches).toContain("torvalds");
  });

  it("detectAll returns multiple matches", () => {
    const results = preactPkg.detectAll("https://github.com/torvalds/linux");
    expect(results.length).toBeGreaterThanOrEqual(2);
    const platforms = results.map((r) => r.platform);
    expect(platforms).toContain("github");
    expect(platforms).toContain("githubProfile");
  });

  it("detectBatch processes multiple URLs", () => {
    const results = preactPkg.detectBatch([
      "https://github.com/user",
      "https://linkedin.com/in/user",
    ]);
    expect(results.size).toBe(2);
    expect(results.get("https://github.com/user")?.platform).toBe("github");
    expect(results.get("https://linkedin.com/in/user")?.platform).toBe("linkedin");
  });

  it("getPlatforms returns platform list", () => {
    const platforms = preactPkg.getPlatforms();
    expect(platforms.length).toBeGreaterThan(0);
    expect(platforms[0]).toHaveProperty("name");
    expect(platforms[0]).toHaveProperty("regex");
  });

  it("normalizeUrl normalizes hostname and path", () => {
    const result = preactPkg.normalizeUrl("https://WWW.GitHub.Com/user/");
    expect(result).not.toBeNull();
    expect(result!.hostname).toBe("github.com");
    expect(result!.pathname).toBe("/user");
  });

  it("extractFromUrl extracts path segments", () => {
    const result = preactPkg.extractFromUrl("https://github.com/user/repo?tab=readme");
    expect(result).not.toBeNull();
    expect(result!.username).toBe("user");
    expect(result!.repository).toBe("repo");
    expect(result!.query).toEqual({ tab: "readme" });
  });

  it("isValidUrl validates URLs", () => {
    expect(preactPkg.isValidUrl("https://github.com")).toBe(true);
    expect(preactPkg.isValidUrl("not-a-url")).toBe(false);
  });

  it("parseUrl parses a URL into components", () => {
    const result = preactPkg.parseUrl("https://example.com/path?q=1#hash");
    expect(result).not.toBeNull();
    expect(result!.hostname).toBe("example.com");
    expect(result!.pathname).toBe("/path");
    expect(result!.search).toBe("?q=1");
    expect(result!.hash).toBe("#hash");
  });

  it("normalizeHostname strips www and lowercases", () => {
    expect(preactPkg.normalizeHostname("WWW.Example.Com")).toBe("example.com");
  });

  it("removeTrailingSlash removes trailing slash", () => {
    expect(preactPkg.removeTrailingSlash("/path/")).toBe("/path");
    expect(preactPkg.removeTrailingSlash("/")).toBe("/");
  });
});
