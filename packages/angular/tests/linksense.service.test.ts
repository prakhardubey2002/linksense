import { describe, it, expect } from "vitest";
import { LinkSenseService } from "../src/linksense.service";

describe("LinkSenseService", () => {
  const service = new LinkSenseService();

  it("detect identifies GitHub", () => {
    const result = service.detect("https://github.com/torvalds/linux");
    expect(result?.platform).toBe("github");
    expect(result?.matches).toContain("torvalds");
  });

  it("detectAll returns multiple matches", () => {
    const results = service.detectAll("https://github.com/user/repo");
    expect(results.length).toBeGreaterThanOrEqual(2);
  });

  it("detectBatch processes urls", () => {
    const map = service.detectBatch([
      "https://github.com/user",
      "https://linkedin.com/in/user",
    ]);
    expect(map.size).toBe(2);
    expect(map.get("https://github.com/user")?.platform).toBe("github");
  });

  it("getPlatforms returns entries", () => {
    const platforms = service.getPlatforms();
    expect(platforms.length).toBeGreaterThan(0);
    expect(platforms[0]).toHaveProperty("name");
  });

  it("normalizeUrl normalizes hostname", () => {
    const n = service.normalizeUrl("https://WWW.GitHub.Com/user/");
    expect(n?.hostname).toBe("github.com");
    expect(n?.pathname).toBe("/user");
  });

  it("extractFromUrl extracts segments", () => {
    const e = service.extractFromUrl("https://github.com/u/r?tab=code");
    expect(e?.username).toBe("u");
    expect(e?.repository).toBe("r");
    expect(e?.query).toEqual({ tab: "code" });
  });

  it("parseUrl parses components", () => {
    const p = service.parseUrl("https://example.com/path?q=1");
    expect(p?.hostname).toBe("example.com");
  });

  it("normalizeHostname strips www", () => {
    expect(service.normalizeHostname("WWW.Example.Com")).toBe("example.com");
  });

  it("removeTrailingSlash trims path", () => {
    expect(service.removeTrailingSlash("/path/")).toBe("/path");
  });

  it("isValidUrl validates", () => {
    expect(service.isValidUrl("https://a.com")).toBe(true);
    expect(service.isValidUrl("nope")).toBe(false);
  });
});
