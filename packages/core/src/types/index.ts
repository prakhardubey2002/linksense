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
