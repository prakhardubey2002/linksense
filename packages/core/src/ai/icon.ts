const ICONIFY_PATTERN = /^[a-z0-9-]+:[a-z0-9._-]+$/i;

export function isValidIconifyId(icon: string): boolean {
  return ICONIFY_PATTERN.test(icon);
}

export function normalizeIconifyId(icon: string): string {
  return icon.trim().toLowerCase();
}
