import { describe, expect, it, vi } from "vitest";
import {
  canUseAiDetection,
  detectBatchWithAI,
  detectWithAI,
} from "../src/ai/detect";
import type { DetectResult } from "../src/types";

function mockFetch(responseBody: unknown, status = 200) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Error",
    json: async () => responseBody,
  });
}

function openRouterResponse(content: string) {
  return {
    choices: [{ message: { content } }],
  };
}

describe("detectWithAI", () => {
  it("returns regex result for known platforms without calling AI", async () => {
    const fetch = mockFetch(openRouterResponse("{}"));

    const result = await detectWithAI("https://github.com/torvalds/linux", {
      apiKey: "test-key",
      fetch,
    });

    expect(result?.platform).toBe("github");
    expect(result?.icon).toBe("lucide:github");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("calls OpenRouter for generic website URLs", async () => {
    const fetch = mockFetch(
      openRouterResponse(
        JSON.stringify({
          platform: "notion",
          title: "Notion",
          icon: "simple-icons:notion",
          matches: ["my-page"],
        }),
      ),
    );

    const result = await detectWithAI("https://www.notion.so/my-page", {
      apiKey: "test-key",
      model: "test/model",
      fetch,
    });

    expect(fetch).toHaveBeenCalledOnce();
    expect(result).toEqual({
      platform: "notion",
      title: "Notion",
      icon: "simple-icons:notion",
      url: "https://www.notion.so/my-page",
      matches: ["my-page"],
    } satisfies DetectResult);
  });

  it("forces AI even for known platforms", async () => {
    const fetch = mockFetch(
      openRouterResponse(
        JSON.stringify({
          platform: "github",
          title: "GitHub",
          icon: "lucide:github",
          matches: ["user", "repo"],
        }),
      ),
    );

    const result = await detectWithAI("https://github.com/user/repo", {
      apiKey: "test-key",
      forceAi: true,
      fetch,
    });

    expect(fetch).toHaveBeenCalledOnce();
    expect(result?.platform).toBe("github");
    expect(result?.icon).toBe("lucide:github");
  });

  it("falls back to regex when AI fails", async () => {
    const fetch = mockFetch({}, 500);

    const result = await detectWithAI("https://github.com/user/repo", {
      apiKey: "test-key",
      forceAi: true,
      fetch,
    });

    expect(result?.platform).toBe("github");
    expect(result?.icon).toBe("lucide:github");
  });

  it("returns null for empty input", async () => {
    const result = await detectWithAI("   ", {
      apiKey: "test-key",
    });

    expect(result).toBeNull();
  });

  it("returns regex website result when AI is not configured", async () => {
    const result = await detectWithAI("https://example.com/page", {
      apiKey: "",
      fallbackToRegex: true,
    });

    expect(result?.platform).toBe("website");
    expect(result?.icon).toBe("lucide:globe");
  });

  it("processes batches", async () => {
    const fetch = mockFetch(
      openRouterResponse(
        JSON.stringify({
          platform: "notion",
          title: "Notion",
          icon: "simple-icons:notion",
          matches: [],
        }),
      ),
    );

    const results = await detectBatchWithAI(
      ["https://github.com/user", "https://www.notion.so/page"],
      { apiKey: "test-key", fetch },
    );

    expect(results.get("https://github.com/user")?.platform).toBe("github");
    expect(results.get("https://www.notion.so/page")?.platform).toBe("notion");
  });
});

describe("canUseAiDetection", () => {
  it("returns true when API key is provided", () => {
    expect(canUseAiDetection({ apiKey: "test-key" })).toBe(
      typeof fetch !== "undefined",
    );
  });

  it("returns false without API key", () => {
    expect(canUseAiDetection({ apiKey: "" })).toBe(false);
  });
});
