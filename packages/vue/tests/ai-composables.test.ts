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

const { aiResult, aiBatchMap } = vi.hoisted(() => {
  const result = {
    platform: "notion",
    title: "Notion",
    icon: "simple-icons:notion",
    url: "https://www.notion.so/product/docs",
    matches: ["product", "docs"],
  };

  return {
    aiResult: result,
    aiBatchMap: new Map([["https://www.notion.so/product/docs", result]]),
  };
});

vi.mock("@linksense/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@linksense/core")>();

  return {
    ...actual,
    detectWithAI: vi.fn().mockResolvedValue(aiResult),
    detectBatchWithAI: vi.fn().mockResolvedValue(aiBatchMap),
  };
});

import { useDetectBatchWithAI } from "../src/use-detect-batch-with-ai";
import { useDetectWithAI } from "../src/use-detect-with-ai";
import { detectBatchWithAI, detectWithAI } from "@linksense/core";

describe("AI adapter composables (Vue)", () => {
  it("useDetectWithAI returns null for null url", async () => {
    const resultRef = useDetectWithAI(null);
    await expect(resultRef.value).resolves.toBeNull();
    expect(detectWithAI).not.toHaveBeenCalled();
  });

  it("useDetectWithAI delegates to core detectWithAI", async () => {
    const resultRef = useDetectWithAI("https://www.notion.so/product/docs", {
      forceAi: true,
      timeoutMs: 1234,
    });

    await expect(resultRef.value).resolves.toEqual(aiResult);

    expect(detectWithAI).toHaveBeenCalledWith(
      "https://www.notion.so/product/docs",
      expect.objectContaining({
        forceAi: true,
        fallbackToRegex: true,
        timeoutMs: 1234,
      }),
    );
  });

  it("useDetectBatchWithAI delegates to core detectBatchWithAI", async () => {
    const mapRef = useDetectBatchWithAI(
      ["https://www.notion.so/product/docs"],
      { forceAi: true },
    );

    const map = await mapRef.value;
    expect(map.get("https://www.notion.so/product/docs")).toEqual(aiResult);

    expect(detectBatchWithAI).toHaveBeenCalledWith(
      ["https://www.notion.so/product/docs"],
      expect.objectContaining({
        forceAi: true,
        fallbackToRegex: true,
      }),
    );
  });
});
