import { describe, it, expect, vi } from "vitest";

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
    canUseAiDetection: vi.fn().mockReturnValue(true),
  };
});

import { LinkSenseService } from "../src/linksense.service";
import { canUseAiDetection, detectBatchWithAI, detectWithAI } from "@linksense/core";

describe("LinkSenseService AI methods (Angular)", () => {
  it("detectWithAI delegates to core detectWithAI", async () => {
    const service = new LinkSenseService();

    const result = await service.detectWithAI("https://www.notion.so/product/docs", {
      forceAi: true,
      timeoutMs: 1234,
    });

    expect(result).toEqual(aiResult);
    expect(detectWithAI).toHaveBeenCalledWith(
      "https://www.notion.so/product/docs",
      expect.objectContaining({
        forceAi: true,
        timeoutMs: 1234,
      }),
    );
  });

  it("detectBatchWithAI delegates to core detectBatchWithAI", async () => {
    const service = new LinkSenseService();

    const resultMap = await service.detectBatchWithAI(
      ["https://www.notion.so/product/docs"],
      { forceAi: true },
    );

    expect(resultMap.get("https://www.notion.so/product/docs")).toEqual(aiResult);
    expect(detectBatchWithAI).toHaveBeenCalledWith(
      ["https://www.notion.so/product/docs"],
      expect.objectContaining({
        forceAi: true,
      }),
    );
  });

  it("canUseAiDetection delegates to core canUseAiDetection", () => {
    const service = new LinkSenseService();

    expect(service.canUseAiDetection({ apiKey: "k", model: "m" })).toBe(true);
    expect(canUseAiDetection).toHaveBeenCalledWith({ apiKey: "k", model: "m" });
  });
});
