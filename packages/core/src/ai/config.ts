import type { AiDetectOptions, OpenRouterConfig } from "../types";

const DEFAULT_MODEL = "openai/gpt-4o-mini";

export function resolveOpenRouterConfig(
  options?: Pick<AiDetectOptions, "apiKey" | "model">,
): OpenRouterConfig | null {
  const apiKey =
    options && "apiKey" in options
      ? options.apiKey
      : readEnv("OPENROUTER_API_KEY");
  const model =
    options && "model" in options
      ? options.model
      : readEnv("OPENROUTER_MODEL") ?? DEFAULT_MODEL;

  if (!apiKey) {
    return null;
  }

  return { apiKey, model: model ?? DEFAULT_MODEL };
}

function readEnv(name: string): string | undefined {
  const env = (
    globalThis as { process?: { env?: Record<string, string | undefined> } }
  ).process?.env;
  const value = env?.[name];

  return typeof value === "string" && value.length > 0 ? value : undefined;
}
