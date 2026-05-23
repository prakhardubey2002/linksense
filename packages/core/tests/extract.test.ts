import { describe, it, expect } from "vitest";
import { extractFromUrl } from "../src/extract";

describe("extractFromUrl", () => {
  it("extracts username and repository from GitHub URL", () => {
    const result = extractFromUrl("https://github.com/torvalds/linux");
    expect(result).not.toBeNull();
    expect(result!.username).toBe("torvalds");
    expect(result!.repository).toBe("linux");
    expect(result!.path).toBeUndefined();
  });

  it("extracts username only from profile URL", () => {
    const result = extractFromUrl("https://github.com/torvalds");
    expect(result).not.toBeNull();
    expect(result!.username).toBe("torvalds");
    expect(result!.repository).toBeUndefined();
  });

  it("extracts deeper path segments", () => {
    const result = extractFromUrl("https://github.com/user/repo/tree/main/src");
    expect(result).not.toBeNull();
    expect(result!.username).toBe("user");
    expect(result!.repository).toBe("repo");
    expect(result!.path).toBe("tree/main/src");
  });

  it("extracts query parameters", () => {
    const result = extractFromUrl("https://example.com/user?tab=repos&sort=stars");
    expect(result).not.toBeNull();
    expect(result!.query).toEqual({ tab: "repos", sort: "stars" });
  });

  it("returns undefined query when no params present", () => {
    const result = extractFromUrl("https://example.com/user");
    expect(result).not.toBeNull();
    expect(result!.query).toBeUndefined();
  });

  it("handles trailing slashes correctly", () => {
    const result = extractFromUrl("https://github.com/user/repo/");
    expect(result).not.toBeNull();
    expect(result!.username).toBe("user");
    expect(result!.repository).toBe("repo");
    expect(result!.path).toBeUndefined();
  });

  it("returns null for invalid URLs", () => {
    expect(extractFromUrl("not-a-url")).toBeNull();
    expect(extractFromUrl("")).toBeNull();
  });

  it("handles root-only URL", () => {
    const result = extractFromUrl("https://example.com");
    expect(result).not.toBeNull();
    expect(result!.username).toBeUndefined();
    expect(result!.repository).toBeUndefined();
  });
});
