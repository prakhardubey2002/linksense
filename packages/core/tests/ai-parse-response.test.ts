import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveOpenRouterConfig } from "../src/ai/config";
import { isValidIconifyId, normalizeIconifyId } from "../src/ai/icon";
import { parseAiDetectionResponse } from "../src/ai/parse-response";

describe("resolveOpenRouterConfig", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns null when no API key is available", () => {
    delete process.env.OPENROUTER_API_KEY;
    expect(resolveOpenRouterConfig()).toBeNull();
  });

  it("reads API key and model from environment", () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    process.env.OPENROUTER_MODEL = "test/model";

    expect(resolveOpenRouterConfig()).toEqual({
      apiKey: "test-key",
      model: "test/model",
    });
  });

  it("prefers explicit options over environment", () => {
    process.env.OPENROUTER_API_KEY = "env-key";
    process.env.OPENROUTER_MODEL = "env/model";

    expect(
      resolveOpenRouterConfig({
        apiKey: "option-key",
        model: "option/model",
      }),
    ).toEqual({
      apiKey: "option-key",
      model: "option/model",
    });
  });

  it("prefers explicit empty API key over environment", () => {
    process.env.OPENROUTER_API_KEY = "env-key";

    expect(resolveOpenRouterConfig({ apiKey: "" })).toBeNull();
  });
});

describe("parseAiDetectionResponse", () => {
  it("parses a valid JSON object", () => {
    const result = parseAiDetectionResponse(
      JSON.stringify({
        platform: "github",
        title: "GitHub",
        icon: "lucide:github",
        matches: ["torvalds", "linux"],
      }),
    );

    expect(result).toEqual({
      platform: "github",
      title: "GitHub",
      icon: "lucide:github",
      matches: ["torvalds", "linux"],
    });
  });

  it("parses fenced JSON from model output", () => {
    const result = parseAiDetectionResponse(`\`\`\`json
{
  "platform": "notion",
  "title": "Notion",
  "icon": "simple-icons:notion",
  "matches": ["workspace"]
}
\`\`\``);

    expect(result).toEqual({
      platform: "notion",
      title: "Notion",
      icon: "simple-icons:notion",
      matches: ["workspace"],
    });
  });

  it("rejects invalid icon ids", () => {
    const result = parseAiDetectionResponse(
      JSON.stringify({
        platform: "example",
        title: "Example",
        icon: "not-an-iconify-id",
      }),
    );

    expect(result).toBeNull();
  });
});

describe("icon helpers", () => {
  it("validates Iconify ids", () => {
    expect(isValidIconifyId("lucide:github")).toBe(true);
    expect(isValidIconifyId("simple-icons:udemy")).toBe(true);
    expect(isValidIconifyId("mdi:behance")).toBe(true);
    expect(isValidIconifyId("github")).toBe(false);
  });

  it("normalizes icon ids to lowercase", () => {
    expect(normalizeIconifyId(" Lucide:GitHub ")).toBe("lucide:github");
  });
});
