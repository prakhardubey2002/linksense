export interface PlatformEntry {
  name: string;
  regex: string;
  title: string;
  icon: string;
}

export interface DetectResult {
  platform: string;
  title: string;
  icon: string;
  url: string;
  matches: string[];

}

export interface NormalizedUrl {
  protocol: string;
  hostname: string;
  pathname: string;
  search: string;
  hash: string;
  original: string;
}

export interface ExtractedData {
  username?: string;
  repository?: string;
  path?: string;
  query?: Record<string, string>;
}

export interface OpenRouterConfig {
  apiKey: string;
  model: string;
}

export interface AiDetectOptions {
  /** OpenRouter API key. Defaults to `process.env.OPENROUTER_API_KEY`. */
  apiKey?: string;
  /** OpenRouter model id. Defaults to `process.env.OPENROUTER_MODEL`. */
  model?: string;
  /** Skip regex detection and always call the AI model. */
  forceAi?: boolean;
  /** Fall back to regex `detect()` when AI is unavailable or fails. Default: true. */
  fallbackToRegex?: boolean;
  /** Custom fetch implementation (for testing or non-standard runtimes). */
  fetch?: typeof fetch;
  /** OpenRouter request timeout in milliseconds. Default: 25000. */
  timeoutMs?: number;
}

export interface AiDetectionPayload {
  platform: string;
  title: string;
  icon: string;
  matches?: string[];
}
