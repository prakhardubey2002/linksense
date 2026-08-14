import { describe, it, expect, vi } from "vitest";

vi.mock("vue", () => ({
  computed: (fn: () => unknown) => ({
    get value() {
      return fn();
    },
  }),
  unref: (val: unknown) => {
    if (val != null && typeof val === "object" && "value" in val) {
      return (val as { value: unknown }).value;
    }
    return val;
  },
}));

import { useLinkSense } from "../src/use-linksense";
import { useDetectAll } from "../src/use-detect-all";
import { useNormalizeUrl } from "../src/use-normalize-url";
import { useExtractFromUrl } from "../src/use-extract-from-url";

describe("useLinkSense", () => {
  it("detects GitHub URL", () => {
    const { result, isDetected, platform } = useLinkSense("https://github.com/torvalds/linux");
    expect(isDetected.value).toBe(true);
    expect(platform.value).toBe("github");
    expect(result.value?.title).toBe("GitHub");
  });

  it("handles null url", () => {
    const { result, isDetected, results } = useLinkSense(null);
    expect(result.value).toBeNull();
    expect(isDetected.value).toBe(false);
    expect(results.value).toEqual([]);
  });

  it("returns all matches with all option", () => {
    const { results } = useLinkSense("https://github.com/user/repo", { all: true });
    expect(results.value.length).toBeGreaterThanOrEqual(2);
  });

  it("includes normalized when requested", () => {
    const { normalized } = useLinkSense("https://WWW.GitHub.Com/user/", { normalize: true });
    expect(normalized.value?.hostname).toBe("github.com");
  });

  it("includes extracted when requested", () => {
    const { extracted } = useLinkSense("https://github.com/u/r?tab=1", { extract: true });
    expect(extracted.value?.username).toBe("u");
    expect(extracted.value?.repository).toBe("r");
  });
});

describe("useDetectAll", () => {
  it("returns multiple platforms", () => {
    const { platforms, isDetected } = useDetectAll("https://github.com/user/repo");
    expect(isDetected.value).toBe(true);
    expect(platforms.value).toContain("github");
  });

  it("empty for null url", () => {
    const { results, isDetected } = useDetectAll(null);
    expect(results.value).toEqual([]);
    expect(isDetected.value).toBe(false);
  });
});

describe("useNormalizeUrl", () => {
  it("normalizes url", () => {
    const normalized = useNormalizeUrl("https://WWW.LinkedIn.Com/in/user/");
    expect(normalized.value?.hostname).toBe("linkedin.com");
  });

  it("null for invalid", () => {
    expect(useNormalizeUrl(null).value).toBeNull();
  });
});

describe("useExtractFromUrl", () => {
  it("extracts path segments", () => {
    const extracted = useExtractFromUrl("https://github.com/user/repo");
    expect(extracted.value?.username).toBe("user");
    expect(extracted.value?.repository).toBe("repo");
  });
});
