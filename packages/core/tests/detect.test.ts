import { describe, it, expect } from "vitest";
import { detect, detectAll, detectBatch, getPlatforms } from "../src/detect";

describe("detect", () => {
  it("detects GitHub repo URL", () => {
    const result = detect("https://github.com/torvalds/linux");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("github");
    expect(result!.title).toBe("GitHub");
    expect(result!.icon).toBe("lucide:github");
    expect(result!.matches).toContain("torvalds");
    expect(result!.matches).toContain("linux");
  });

  it("detects LinkedIn profile URL", () => {
    const result = detect("https://www.linkedin.com/in/john-doe");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("linkedin");
    expect(result!.title).toBe("LinkedIn");
    expect(result!.matches).toContain("john-doe");
  });

  it("detects Twitter/X URL", () => {
    const result = detect("https://x.com/elonmusk");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("twitter");
    expect(result!.title).toBe("Twitter / X");
    expect(result!.matches).toContain("elonmusk");
  });

  it("detects Twitter with twitter.com domain", () => {
    const result = detect("https://twitter.com/openai");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("twitter");
    expect(result!.matches).toContain("openai");
  });

  it("detects Instagram URL", () => {
    const result = detect("https://instagram.com/nasa");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("instagram");
    expect(result!.matches).toContain("nasa");
  });

  it("detects Medium URL", () => {
    const result = detect("https://medium.com/@johndoe");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("medium");
    expect(result!.matches).toContain("johndoe");
  });

  it("detects LeetCode profile URL", () => {
    const result = detect("https://leetcode.com/u/johndoe");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("leetcode");
    expect(result!.matches).toContain("johndoe");
  });

  it("detects Dribbble URL", () => {
    const result = detect("https://dribbble.com/johndoe");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("dribbble");
  });

  it("detects Behance URL", () => {
    const result = detect("https://behance.net/designer");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("behance");
  });

  it("detects Stack Overflow URL", () => {
    const result = detect("https://stackoverflow.com/users/123456/johndoe");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("stackoverflow");
  });

  it("detects Coursera URL", () => {
    const result = detect("https://www.coursera.org/learn/machine-learning");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("coursera");
  });

  it("detects Udemy URL", () => {
    const result = detect("https://www.udemy.com/course/react-complete-guide");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("udemy");
  });

  it("detects HackerRank URL", () => {
    const result = detect("https://www.hackerrank.com/johndoe");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("hackerrank");
  });

  it("detects CodePen URL", () => {
    const result = detect("https://codepen.io/johndoe");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("codepen");
  });

  it("detects Vercel deployment URL", () => {
    const result = detect("https://my-app.vercel.app");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("vercel");
  });

  it("detects Netlify deployment URL", () => {
    const result = detect("https://my-app.netlify.app");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("netlify");
  });

  it("falls back to generic website for unknown domains", () => {
    const result = detect("https://some-random-site.com/page");
    expect(result).not.toBeNull();
    expect(result!.platform).toBe("website");
  });

  it("returns null for non-URL strings", () => {
    expect(detect("not a url")).toBeNull();
    expect(detect("")).toBeNull();
  });
});

describe("detectAll", () => {
  it("returns all matching platforms for a URL", () => {
    const results = detectAll("https://github.com/torvalds");
    expect(results.length).toBeGreaterThanOrEqual(1);
    const platforms = results.map((r) => r.platform);
    expect(platforms).toContain("github");
  });

  it("returns multiple matches when URL matches several patterns", () => {
    const results = detectAll("https://github.com/torvalds/linux");
    expect(results.length).toBeGreaterThanOrEqual(2);
    const platforms = results.map((r) => r.platform);
    expect(platforms).toContain("github");
    expect(platforms).toContain("githubProfile");
  });

  it("returns empty array for non-URL strings", () => {
    expect(detectAll("not a url")).toEqual([]);
    expect(detectAll("")).toEqual([]);
  });

  it("includes website match as a catch-all", () => {
    const results = detectAll("https://example.com/something");
    const platforms = results.map((r) => r.platform);
    expect(platforms).toContain("website");
  });
});

describe("detectBatch", () => {
  it("processes multiple URLs and returns a Map", () => {
    const urls = [
      "https://github.com/user",
      "https://linkedin.com/in/user",
      "not-a-url",
    ];
    const results = detectBatch(urls);
    expect(results).toBeInstanceOf(Map);
    expect(results.size).toBe(3);
    expect(results.get("https://github.com/user")?.platform).toBe("github");
    expect(results.get("https://linkedin.com/in/user")?.platform).toBe("linkedin");
    expect(results.get("not-a-url")).toBeNull();
  });

  it("returns empty Map for empty input", () => {
    const results = detectBatch([]);
    expect(results.size).toBe(0);
  });
});

describe("getPlatforms", () => {
  it("returns an array of platform entries", () => {
    const platforms = getPlatforms();
    expect(Array.isArray(platforms)).toBe(true);
    expect(platforms.length).toBeGreaterThan(0);
  });

  it("each platform has required fields", () => {
    const platforms = getPlatforms();
    for (const p of platforms) {
      expect(p).toHaveProperty("name");
      expect(p).toHaveProperty("regex");
      expect(p).toHaveProperty("title");
      expect(p).toHaveProperty("icon");
      expect(typeof p.name).toBe("string");
      expect(typeof p.regex).toBe("string");
      expect(typeof p.title).toBe("string");
      expect(typeof p.icon).toBe("string");
    }
  });

  it("returns a copy, not the original array", () => {
    const a = getPlatforms();
    const b = getPlatforms();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});
