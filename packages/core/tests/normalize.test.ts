import { describe, it, expect } from "vitest";
import { normalizeUrl } from "../src/normalize";

describe("normalizeUrl", () => {
  it("normalizes a standard URL", () => {
    const result = normalizeUrl("https://www.GitHub.com/user/");
    expect(result).not.toBeNull();
    expect(result!.hostname).toBe("github.com");
    expect(result!.pathname).toBe("/user");
    expect(result!.protocol).toBe("https:");
  });

  it("strips www and lowercases hostname", () => {
    const result = normalizeUrl("https://WWW.LinkedIn.Com/in/user/");
    expect(result).not.toBeNull();
    expect(result!.hostname).toBe("linkedin.com");
  });

  it("removes trailing slash from pathname", () => {
    const result = normalizeUrl("https://example.com/path/to/page/");
    expect(result).not.toBeNull();
    expect(result!.pathname).toBe("/path/to/page");
  });

  it("preserves root path as /", () => {
    const result = normalizeUrl("https://example.com/");
    expect(result).not.toBeNull();
    expect(result!.pathname).toBe("/");
  });

  it("preserves search params and hash", () => {
    const result = normalizeUrl("https://example.com/page?q=test#section");
    expect(result).not.toBeNull();
    expect(result!.search).toBe("?q=test");
    expect(result!.hash).toBe("#section");
  });

  it("preserves the original URL", () => {
    const url = "https://www.Example.com/path/";
    const result = normalizeUrl(url);
    expect(result!.original).toBe(url);
  });

  it("returns null for invalid URLs", () => {
    expect(normalizeUrl("not a url")).toBeNull();
    expect(normalizeUrl("")).toBeNull();
  });

  it("handles http protocol", () => {
    const result = normalizeUrl("http://www.example.com");
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("http:");
    expect(result!.hostname).toBe("example.com");
  });
});
