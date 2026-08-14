import { describe, expect, it } from "vitest";
import { detectWithAI } from "../src/ai/detect";

const hasOpenRouter =
  Boolean(process.env.OPENROUTER_API_KEY) &&
  Boolean(process.env.OPENROUTER_MODEL);

describe.skipIf(!hasOpenRouter)("detectWithAI integration", () => {
  it(
    "detects an unknown platform with an Iconify icon via OpenRouter",
    async () => {
      const result = await detectWithAI("https://www.notion.so/product/docs", {
        timeoutMs: 60_000,
      });

      expect(result).not.toBeNull();
      expect(result!.url).toBe("https://www.notion.so/product/docs");
      expect(result!.title.length).toBeGreaterThan(0);
      expect(result!.icon).toMatch(/^[a-z0-9-]+:[a-z0-9._-]+$/i);
      expect(Array.isArray(result!.matches)).toBe(true);
    },
    90_000,
  );

  it(
    "uses regex for known platforms without forcing AI",
    async () => {
      const result = await detectWithAI("https://github.com/torvalds/linux");

      expect(result?.platform).toBe("github");
      expect(result?.icon).toBe("lucide:github");
    },
    30_000,
  );
});
