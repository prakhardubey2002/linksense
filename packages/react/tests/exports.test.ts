import { describe, it, expect } from "vitest";
import * as reactPkg from "../src/index";

describe("@linksense/react exports", () => {
  it("exports useLinkSense hook", () => {
    expect(typeof reactPkg.useLinkSense).toBe("function");
  });

  it("exports useDetectAll hook", () => {
    expect(typeof reactPkg.useDetectAll).toBe("function");
  });

  it("exports useNormalizeUrl hook", () => {
    expect(typeof reactPkg.useNormalizeUrl).toBe("function");
  });

  it("exports useExtractFromUrl hook", () => {
    expect(typeof reactPkg.useExtractFromUrl).toBe("function");
  });

  it("re-exports core detect function", () => {
    expect(typeof reactPkg.detect).toBe("function");
  });

  it("re-exports core detectAll function", () => {
    expect(typeof reactPkg.detectAll).toBe("function");
  });

  it("re-exports core detectBatch function", () => {
    expect(typeof reactPkg.detectBatch).toBe("function");
  });

  it("re-exports core getPlatforms function", () => {
    expect(typeof reactPkg.getPlatforms).toBe("function");
  });

  it("re-exports core normalizeUrl function", () => {
    expect(typeof reactPkg.normalizeUrl).toBe("function");
  });

  it("re-exports core extractFromUrl function", () => {
    expect(typeof reactPkg.extractFromUrl).toBe("function");
  });

  it("re-exports core parseUrl function", () => {
    expect(typeof reactPkg.parseUrl).toBe("function");
  });

  it("re-exports core normalizeHostname function", () => {
    expect(typeof reactPkg.normalizeHostname).toBe("function");
  });

  it("re-exports core removeTrailingSlash function", () => {
    expect(typeof reactPkg.removeTrailingSlash).toBe("function");
  });

  it("re-exports core isValidUrl function", () => {
    expect(typeof reactPkg.isValidUrl).toBe("function");
  });
});

describe("re-exported core functions work correctly", () => {
  it("detect identifies GitHub URL", () => {
    const result = reactPkg.detect("https://github.com/torvalds/linux");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("github");
    expect(result!.title).toBe("GitHub");
    expect(result!.matches).toContain("torvalds");
  });

  it("detectAll returns multiple matches", () => {
    const results = reactPkg.detectAll("https://github.com/torvalds/linux");
    expect(results.length).toBeGreaterThanOrEqual(2);
    const platforms = results.map((r) => r.platform);
    expect(platforms).toContain("github");
    expect(platforms).toContain("githubProfile");
  });

  it("detectBatch processes multiple URLs", () => {
    const results = reactPkg.detectBatch([
      "https://github.com/user",
      "https://linkedin.com/in/user",
    ]);
    expect(results.size).toBe(2);
    expect(results.get("https://github.com/user")?.platform).toBe("github");
    expect(results.get("https://linkedin.com/in/user")?.platform).toBe("linkedin");
  });

  it("getPlatforms returns platform list", () => {
    const platforms = reactPkg.getPlatforms();
    expect(platforms.length).toBeGreaterThan(0);
    expect(platforms[0]).toHaveProperty("name");
    expect(platforms[0]).toHaveProperty("regex");
  });

  it("normalizeUrl normalizes hostname and path", () => {
    const result = reactPkg.normalizeUrl("https://WWW.GitHub.Com/user/");
    expect(result).not.toBeNull();
    expect(result!.hostname).toBe("github.com");
    expect(result!.pathname).toBe("/user");
  });

  it("extractFromUrl extracts path segments", () => {
    const result = reactPkg.extractFromUrl("https://github.com/user/repo?tab=readme");
    expect(result).not.toBeNull();
    expect(result!.username).toBe("user");
    expect(result!.repository).toBe("repo");
    expect(result!.query).toEqual({ tab: "readme" });
  });

  it("isValidUrl validates URLs", () => {
    expect(reactPkg.isValidUrl("https://github.com")).toBe(true);
    expect(reactPkg.isValidUrl("not-a-url")).toBe(false);
  });

  it("parseUrl parses a URL into components", () => {
    const result = reactPkg.parseUrl("https://example.com/path?q=1#hash");
    expect(result).not.toBeNull();
    expect(result!.hostname).toBe("example.com");
    expect(result!.pathname).toBe("/path");
    expect(result!.search).toBe("?q=1");
    expect(result!.hash).toBe("#hash");
  });

  it("normalizeHostname strips www and lowercases", () => {
    expect(reactPkg.normalizeHostname("WWW.Example.Com")).toBe("example.com");
  });

  it("removeTrailingSlash removes trailing slash", () => {
    expect(reactPkg.removeTrailingSlash("/path/")).toBe("/path");
    expect(reactPkg.removeTrailingSlash("/")).toBe("/");
  });
});
