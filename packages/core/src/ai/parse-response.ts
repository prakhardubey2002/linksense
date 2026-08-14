import type { AiDetectionPayload } from "../types";
import { isValidIconifyId, normalizeIconifyId } from "./icon";

export function parseAiDetectionResponse(
  content: string,
): AiDetectionPayload | null {
  const jsonText = extractJsonObject(content);
  if (!jsonText) {
    return null;
  }

  try {
    const parsed = JSON.parse(jsonText) as Record<string, unknown>;
    return normalizePayload(parsed);
  } catch {
    return null;
  }
}

function extractJsonObject(content: string): string | null {
  const trimmed = content.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  return trimmed.slice(start, end + 1);
}

function normalizePayload(
  parsed: Record<string, unknown>,
): AiDetectionPayload | null {
  const platform = readString(parsed.platform);
  const title = readString(parsed.title);
  const icon = readString(parsed.icon);

  if (!platform || !title || !icon) {
    return null;
  }

  const normalizedIcon = normalizeIconifyId(icon);
  if (!isValidIconifyId(normalizedIcon)) {
    return null;
  }

  const matches = readStringArray(parsed.matches);

  return {
    platform: slugify(platform),
    title: title.trim(),
    icon: normalizedIcon,
    matches,
  };
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
