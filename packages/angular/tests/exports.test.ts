import { describe, it, expect } from "vitest";
import * as angularPkg from "../src/index";

describe("@linksense/angular exports", () => {
  it("exports LinkSenseService", () => {
    expect(angularPkg.LinkSenseService).toBeDefined();
  });

  it("re-exports core functions", () => {
    expect(typeof angularPkg.detect).toBe("function");
    expect(typeof angularPkg.detectAll).toBe("function");
    expect(typeof angularPkg.detectBatch).toBe("function");
    expect(typeof angularPkg.detectWithAI).toBe("function");
    expect(typeof angularPkg.detectBatchWithAI).toBe("function");
    expect(typeof angularPkg.canUseAiDetection).toBe("function");
    expect(typeof angularPkg.getPlatforms).toBe("function");
    expect(typeof angularPkg.isValidUrl).toBe("function");
  });
});

describe("re-exported core", () => {
  it("detect works", () => {
    expect(angularPkg.detect("https://github.com/user")?.platform).toBe("github");
  });
});
