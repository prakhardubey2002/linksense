import { describe, it, expect } from "vitest";
import {
  parseUrl,
  removeTrailingSlash,
  normalizeHostname,
  isValidUrl,
} from "../src/utils";

describe("parseUrl", () => {
  it("parses a full URL into components", () => {
    const result = parseUrl("https://www.github.com/user/repo?tab=readme#section");
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("https:");
    expect(result!.hostname).toBe("www.github.com");
    expect(result!.pathname).toBe("/user/repo");
    expect(result!.search).toBe("?tab=readme");
    expect(result!.hash).toBe("#section");
    expect(result!.original).toBe("https://www.github.com/user/repo?tab=readme#section");
  });

  it("parses a minimal URL", () => {
    const result = parseUrl("https://example.com");
    expect(result).not.toBeNull();
    expect(result!.hostname).toBe("example.com");
    expect(result!.pathname).toBe("/");
  });

  it("returns null for invalid URLs", () => {
    expect(parseUrl("not-a-url")).toBeNull();
    expect(parseUrl("")).toBeNull();
    expect(parseUrl("://missing-protocol")).toBeNull();
  });

  it("preserves the original URL string", () => {
    const url = "https://example.com/path";
    const result = parseUrl(url);
    expect(result!.original).toBe(url);
  });
});

describe("removeTrailingSlash", () => {
  it("removes trailing slash from paths", () => {
    expect(removeTrailingSlash("/user/repo/")).toBe("/user/repo");
  });

  it("leaves paths without trailing slash unchanged", () => {
    expect(removeTrailingSlash("/user/repo")).toBe("/user/repo");
  });

  it("does not remove the root slash", () => {
    expect(removeTrailingSlash("/")).toBe("/");
  });

  it("handles empty string", () => {
    expect(removeTrailingSlash("")).toBe("");
  });
});

describe("normalizeHostname", () => {
  it("strips www. prefix", () => {
    expect(normalizeHostname("www.github.com")).toBe("github.com");
  });

  it("lowercases the hostname", () => {
    expect(normalizeHostname("GitHub.COM")).toBe("github.com");
  });

  it("strips www. and lowercases together", () => {
    expect(normalizeHostname("WWW.LinkedIn.Com")).toBe("linkedin.com");
  });

  it("leaves already normalized hostnames unchanged", () => {
    expect(normalizeHostname("github.com")).toBe("github.com");
  });
});

describe("isValidUrl", () => {
  it("returns true for valid HTTP URLs", () => {
    expect(isValidUrl("https://github.com")).toBe(true);
    expect(isValidUrl("http://example.com/path")).toBe(true);
  });

  it("returns true for URLs with query and hash", () => {
    expect(isValidUrl("https://example.com?q=test#hash")).toBe(true);
  });

  it("returns false for invalid strings", () => {
    expect(isValidUrl("not-a-url")).toBe(false);
    expect(isValidUrl("")).toBe(false);
    expect(isValidUrl("github.com")).toBe(false);
  });
});
