# @linksense/core

Framework-agnostic link/platform detection engine. Detect, normalize, and extract data from 50+ platform URLs — zero dependencies.

## Install

```bash
# npm
npm install @linksense/core

# pnpm
pnpm add @linksense/core

# yarn
yarn add @linksense/core
```

## Quick Start

```typescript
import { detect, detectAll, normalizeUrl, extractFromUrl } from "@linksense/core";

// Detect which platform a URL belongs to
const result = detect("https://github.com/torvalds/linux");
// {
//   platform: "github",
//   title: "GitHub",
//   icon: "lucide:github",
//   url: "https://github.com/torvalds/linux",
//   matches: ["torvalds", "linux"]
// }

// Get all matching platforms (some URLs match multiple patterns)
const all = detectAll("https://github.com/torvalds/linux");
// Returns DetectResult[] with both "github" and "githubProfile" matches

// Normalize a URL
const normalized = normalizeUrl("https://WWW.LinkedIn.Com/in/user/");
// {
//   protocol: "https:",
//   hostname: "linkedin.com",  // www stripped, lowercased
//   pathname: "/in/user",      // trailing slash removed
//   search: "",
//   hash: "",
//   original: "https://WWW.LinkedIn.Com/in/user/"
// }

// Extract structured data from a URL
const data = extractFromUrl("https://github.com/torvalds/linux?tab=readme");
// {
//   username: "torvalds",
//   repository: "linux",
//   path: undefined,
//   query: { tab: "readme" }
// }
```

## API

### `detect(url: string): DetectResult | null`

Tests a URL against all platform patterns and returns the first match. Platforms are checked in priority order, with the generic `website` pattern last as a catch-all.

### `detectAll(url: string): DetectResult[]`

Returns all matching platforms for a given URL. Useful when a URL could match multiple patterns (e.g. a GitHub repo URL matches both `github` and `githubProfile`).

### `detectBatch(urls: string[]): Map<string, DetectResult | null>`

Process multiple URLs at once. Returns a `Map` keyed by the input URL.

```typescript
const results = detectBatch([
  "https://github.com/user",
  "https://linkedin.com/in/user",
  "not-a-url",
]);
results.get("https://github.com/user");       // DetectResult
results.get("not-a-url");                      // null
```

### `normalizeUrl(url: string): NormalizedUrl | null`

Parses and normalizes a URL — strips `www.`, lowercases the hostname, and removes trailing slashes. Returns `null` for invalid URLs.

### `extractFromUrl(url: string): ExtractedData | null`

Extracts structured path segments and query parameters from a URL. Returns `null` for invalid URLs.

### `getPlatforms(): PlatformEntry[]`

Returns a copy of the full platform registry (50+ entries).

```typescript
const platforms = getPlatforms();
// [{ name: "github", regex: "...", title: "GitHub", icon: "lucide:github" }, ...]
```

### `isValidUrl(url: string): boolean`

Quick check if a string is a valid, parseable URL.

### `parseUrl(url: string): NormalizedUrl | null`

Low-level URL parser using the `URL` constructor. Returns `null` for invalid URLs.

### `normalizeHostname(hostname: string): string`

Lowercases and strips `www.` from a hostname string.

### `removeTrailingSlash(path: string): string`

Removes a trailing `/` from a path (preserves root `/`).

## Types

```typescript
interface DetectResult {
  platform: string;
  title: string;
  icon: string;
  url: string;
  matches: string[];
}

interface NormalizedUrl {
  protocol: string;
  hostname: string;
  pathname: string;
  search: string;
  hash: string;
  original: string;
}

interface ExtractedData {
  username?: string;
  repository?: string;
  path?: string;
  query?: Record<string, string>;
}

interface PlatformEntry {
  name: string;
  regex: string;
  title: string;
  icon: string;
}
```

## Supported Platforms

GitHub, LinkedIn, Twitter/X, Instagram, Facebook, Medium, Stack Overflow, Dribbble, Behance, Credly, LeetCode, HackerRank, Codeforces, CodeChef, CodePen, Coursera, Udemy, Udacity, edX, freeCodeCamp, Google Skillshop, AWS Training, Microsoft Learn, NPTEL/SWAYAM, LinkedIn Learning, Educative, GeeksforGeeks, Pluralsight, Scrimba, Frontend Masters, Frontend Mentor, Internshala, Great Learning, UpGrad, Skillsoft, Cisco Netacad, CompTIA, Salesforce, Trailhead, MuleSoft, Workday, HubSpot, Microsoft Dynamics, Zoho, Pipedrive, Oracle, SAP, WordPress, Wappalyzer, Freelancer, Vercel, Netlify, Webflow, Google Drive, OneDrive, CS50, and a generic website catch-all.

## License

MIT
