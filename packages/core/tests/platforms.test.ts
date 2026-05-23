import { describe, it, expect } from "vitest";
import platforms from "../src/data/platforms.json";

describe("platforms.json integrity", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(platforms)).toBe(true);
    expect(platforms.length).toBeGreaterThan(0);
  });

  it("every entry has name, regex, title, icon as non-empty strings", () => {
    for (const p of platforms) {
      expect(typeof p.name).toBe("string");
      expect(p.name.length).toBeGreaterThan(0);
      expect(typeof p.regex).toBe("string");
      expect(p.regex.length).toBeGreaterThan(0);
      expect(typeof p.title).toBe("string");
      expect(p.title.length).toBeGreaterThan(0);
      expect(typeof p.icon).toBe("string");
      expect(p.icon.length).toBeGreaterThan(0);
    }
  });

  it("every regex compiles without error", () => {
    for (const p of platforms) {
      expect(() => new RegExp(p.regex)).not.toThrow();
    }
  });

  it("every name is unique", () => {
    const names = platforms.map((p) => p.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it("known platforms exist in the list", () => {
    const names = new Set(platforms.map((p) => p.name));
    const expected = [
      "github",
      "linkedin",
      "twitter",
      "instagram",
      "facebook",
      "medium",
      "stackoverflow",
      "leetcode",
      "hackerrank",
      "codepen",
      "vercel",
      "netlify",
      "website",
    ];
    for (const name of expected) {
      expect(names.has(name)).toBe(true);
    }
  });

  it("website entry is the last in the list (catch-all)", () => {
    const last = platforms[platforms.length - 1];
    expect(last!.name).toBe("website");
  });
});
