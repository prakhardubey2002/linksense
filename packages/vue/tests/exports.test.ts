import { describe, it, expect } from "vitest";
import * as vuePkg from "../src/index";

describe("@linksense/vue exports", () => {
  it("exports composables", () => {
    expect(typeof vuePkg.useLinkSense).toBe("function");
    expect(typeof vuePkg.useDetectAll).toBe("function");
    expect(typeof vuePkg.useNormalizeUrl).toBe("function");
    expect(typeof vuePkg.useExtractFromUrl).toBe("function");
    expect(typeof vuePkg.useDetectWithAI).toBe("function");
    expect(typeof vuePkg.useDetectBatchWithAI).toBe("function");
  });

  it("re-exports core functions", () => {
    expect(typeof vuePkg.detect).toBe("function");
    expect(typeof vuePkg.detectAll).toBe("function");
    expect(typeof vuePkg.detectBatch).toBe("function");
    expect(typeof vuePkg.detectWithAI).toBe("function");
    expect(typeof vuePkg.detectBatchWithAI).toBe("function");
    expect(typeof vuePkg.canUseAiDetection).toBe("function");
    expect(typeof vuePkg.getPlatforms).toBe("function");
    expect(typeof vuePkg.normalizeUrl).toBe("function");
    expect(typeof vuePkg.extractFromUrl).toBe("function");
    expect(typeof vuePkg.isValidUrl).toBe("function");
  });
});

describe("re-exported core functions", () => {
  it("detect works", () => {
    const result = vuePkg.detect("https://github.com/user");
    expect(result?.platform).toBe("github");
  });
});
