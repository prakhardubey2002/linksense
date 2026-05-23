# @linksense/preact

Preact hooks for URL platform detection, normalization, and extraction. Powered by [`@linksense/core`](https://www.npmjs.com/package/@linksense/core).

## Install

```bash
# npm
npm install @linksense/preact preact

# pnpm
pnpm add @linksense/preact preact

# yarn
yarn add @linksense/preact preact
```

## Hooks

### `useLinkSense(url, options?)`

The main hook — detects which platform a URL belongs to.

```tsx
import { useLinkSense } from "@linksense/preact";

function LinkCard({ url }: { url: string }) {
  const { result, isDetected, platform } = useLinkSense(url);

  if (!isDetected) return <p>Unknown link</p>;

  return (
    <div>
      <span>{result.title}</span>
      <span>{result.icon}</span>
      <a href={url}>{platform}</a>
    </div>
  );
}
```

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `all` | `boolean` | `false` | Return all matching platforms |
| `normalize` | `boolean` | `false` | Include normalized URL data |
| `extract` | `boolean` | `false` | Include extracted path/query data |

```tsx
const { result, results, normalized, extracted } = useLinkSense(url, {
  all: true,
  normalize: true,
  extract: true,
});
```

**Returns `UseLinkSenseResult`:**

| Field | Type | Description |
|---|---|---|
| `result` | `DetectResult \| null` | First matching platform |
| `results` | `DetectResult[]` | All matching platforms (when `all: true`) |
| `isDetected` | `boolean` | Whether any platform matched |
| `platform` | `string \| null` | Name of the first matched platform |
| `normalized` | `NormalizedUrl \| null` | Normalized URL (when `normalize: true`) |
| `extracted` | `ExtractedData \| null` | Extracted data (when `extract: true`) |

### `useDetectAll(url)`

Returns all platforms that match a URL.

```tsx
import { useDetectAll } from "@linksense/preact";

function PlatformTags({ url }: { url: string }) {
  const { results, platforms, isDetected } = useDetectAll(url);

  return (
    <ul>
      {results.map((r) => (
        <li key={r.platform}>{r.title}</li>
      ))}
    </ul>
  );
}
```

### `useNormalizeUrl(url)`

Normalizes a URL — strips `www.`, lowercases hostname, removes trailing slashes.

```tsx
import { useNormalizeUrl } from "@linksense/preact";

function NormalizedDisplay({ url }: { url: string }) {
  const normalized = useNormalizeUrl(url);

  if (!normalized) return null;
  return <code>{normalized.hostname}{normalized.pathname}</code>;
}
```

### `useExtractFromUrl(url)`

Extracts structured data (username, repository, path, query) from a URL.

```tsx
import { useExtractFromUrl } from "@linksense/preact";

function UserInfo({ url }: { url: string }) {
  const data = useExtractFromUrl(url);

  if (!data) return null;
  return (
    <div>
      <p>User: {data.username}</p>
      {data.repository && <p>Repo: {data.repository}</p>}
    </div>
  );
}
```

## Direct Core Access

All `@linksense/core` functions and types are re-exported for convenience:

```tsx
import {
  detect,
  detectAll,
  detectBatch,
  getPlatforms,
  normalizeUrl,
  extractFromUrl,
  isValidUrl,
} from "@linksense/preact";

import type {
  DetectResult,
  NormalizedUrl,
  ExtractedData,
  PlatformEntry,
} from "@linksense/preact";
```

## License

MIT
