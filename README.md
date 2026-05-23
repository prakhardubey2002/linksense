# LinkSense

**Detect, normalize, and extract data from platform URLs** — GitHub, LinkedIn, LeetCode, Coursera, and 50+ more. Framework-agnostic core with optional hooks for React, Preact, Vue, and Angular.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm @linksense/core](https://img.shields.io/npm/v/@linksense/core?label=%40linksense%2Fcore)](https://www.npmjs.com/package/@linksense/core)
[![Node](https://img.shields.io/node/v/@linksense/core)](https://nodejs.org)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/prakhardubey2002/linksense)

## Why LinkSense?

Paste a URL into your app and you often need more than the hostname: which platform it is, a display title, an icon, normalized parts, and structured fields (username, repo, course slug). LinkSense does that in one pass with **zero runtime dependencies** in the core package and a small, tree-shakeable API.

```typescript
import { detect, normalizeUrl, extractFromUrl } from "@linksense/core";

detect("https://github.com/torvalds/linux");
// {
//   platform: "github",
//   title: "GitHub",
//   icon: "lucide:github",
//   url: "https://github.com/torvalds/linux",
//   matches: ["torvalds", "linux"]
// }

normalizeUrl("https://WWW.LinkedIn.Com/in/user/");
// { hostname: "linkedin.com", pathname: "/in/user", ... }

extractFromUrl("https://github.com/torvalds/linux?tab=readme");
// { username: "torvalds", repository: "linux", query: { tab: "readme" } }
```

## Features

- **50+ platforms** — dev tools, social, learning, certifications, CRM, hosting, and more
- **Framework-agnostic core** — use in Node, browsers, workers, or any bundler
- **First-class adapters** — React, Preact, Vue, and Angular with the same API surface
- **Normalize & extract** — consistent hostnames, paths, and structured segments
- **Batch detection** — `detectBatch()` for many URLs at once
- **Iconify-ready icons** — each platform exposes an Iconify id (`lucide:github`, `simple-icons:udemy`, …)
- **Fully typed** — TypeScript definitions included
- **MIT licensed** — use in commercial and open-source projects

## Packages

| Package | Description | Docs |
|--------|-------------|------|
| [`@linksense/core`](https://www.npmjs.com/package/@linksense/core) | Detection engine (no framework) | [README](./packages/core/README.md) |
| [`@linksense/react`](https://www.npmjs.com/package/@linksense/react) | React hooks | [README](./packages/react/README.md) |
| [`@linksense/preact`](https://www.npmjs.com/package/@linksense/preact) | Preact hooks | [README](./packages/preact/README.md) |
| [`@linksense/vue`](https://www.npmjs.com/package/@linksense/vue) | Vue composables | [README](./packages/vue/README.md) |
| [`@linksense/angular`](https://www.npmjs.com/package/@linksense/angular) | Angular service | [README](./packages/angular/README.md) |

### Install

```bash
# Core only
npm install @linksense/core

# With a framework adapter (peer deps apply)
npm install @linksense/react react react-dom
npm install @linksense/vue vue
npm install @linksense/preact preact
npm install @linksense/angular @angular/core
```

### React example

```tsx
import { Icon } from "@iconify/react";
import { useLinkSense } from "@linksense/react";

function LinkPreview({ url }: { url: string }) {
  const { result, isDetected } = useLinkSense(url, { extract: true });

  if (!isDetected || !result) return <p>Unknown link</p>;

  return (
    <div>
      <Icon icon={result.icon} width={24} />
      <strong>{result.title}</strong>
      <span>{result.matches.join(" · ")}</span>
    </div>
  );
}
```

Vue, Preact, and Angular follow the same options (`all`, `normalize`, `extract`) — see each package README.

## Supported platforms

GitHub, LinkedIn, Twitter/X, Instagram, Facebook, Medium, Stack Overflow, Dribbble, Behance, Credly, LeetCode, HackerRank, Codeforces, CodeChef, CodePen, Coursera, Udemy, Udacity, edX, freeCodeCamp, Google Skillshop, AWS Training, Microsoft Learn, NPTEL/SWAYAM, LinkedIn Learning, Educative, GeeksforGeeks, Pluralsight, Scrimba, Frontend Masters, Frontend Mentor, Internshala, Great Learning, UpGrad, Skillsoft, Cisco Netacad, CompTIA, Salesforce, Trailhead, MuleSoft, Workday, HubSpot, Microsoft Dynamics, Zoho, Pipedrive, Oracle, SAP, WordPress, Wappalyzer, Freelancer, Vercel, Netlify, Webflow, Google Drive, OneDrive, CS50, and a generic **website** fallback.

Platform rules live in [`packages/core/src/platforms.json`](./packages/core/src/platforms.json). Run `pnpm validate:platforms` after editing.

## Icons (Iconify)

`DetectResult.icon` values are **[Iconify](https://iconify.design/)** ids (`collection:name`), not CSS class names. Render them with [`@iconify/react`](https://www.npmjs.com/package/@iconify/react), [`@iconify/vue`](https://www.npmjs.com/package/@iconify/vue), or [`@iconify/iconify`](https://www.npmjs.com/package/@iconify/iconify) in vanilla HTML.

## Repository layout

```
linksense/
├── packages/
│   ├── core/          # @linksense/core — detection engine
│   ├── react/         # @linksense/react
│   ├── preact/        # @linksense/preact
│   ├── vue/           # @linksense/vue
│   └── angular/       # @linksense/angular
└── apps/
    ├── linksense-react/    # React demo (port 5173)
    ├── preact-linksense/   # Preact demo (port 5174)
    ├── vue-linksense/      # Vue demo (port 5175)
    └── playground/         # Module Federation host (port 5170)
```

## Development

**Requirements:** Node.js 18+, [pnpm](https://pnpm.io/) 9+

```bash
git clone https://github.com/prakhardubey2002/linksense.git
cd linksense
pnpm install
pnpm build
pnpm test
```

### Demo apps

Run all framework demos in parallel:

```bash
pnpm dev:demos
```

| App | URL |
|-----|-----|
| React | http://localhost:5173 |
| Preact | http://localhost:5174 |
| Vue | http://localhost:5175 |

### Module Federation playground

One host page that loads React, Preact, and Vue remotes:

```bash
pnpm dev:federation
# → http://localhost:5170
```

All four dev servers must use their default ports (5170–5175). If you see **port already in use**, stop the previous `dev:federation` session (Ctrl+C) or free those ports before restarting.

### Other scripts

| Script | Description |
|--------|-------------|
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format with Prettier |
| `pnpm validate:platforms` | Validate `platforms.json` |
| `pnpm changeset` | Create a changeset for release |
| `pnpm release` | Build and publish (maintainers) |

## Contributing

Contributions are welcome — issues, platform additions, and adapter improvements.

1. Fork the repo and create a branch from `main`
2. Add or update platform rules in `packages/core/src/platforms.json` if needed
3. Run `pnpm validate:platforms`, `pnpm test`, and `pnpm build`
4. Open a pull request with a clear description

For new platforms, include a sensible regex, human-readable `title`, and an Iconify `icon` id that exists in the [Iconify icon sets](https://icon-sets.iconify.design/).

## Author

**Prakhar Dubey** — [GitHub](https://github.com/prakhardubey2002)

## License

[MIT](./LICENSE) © Prakhar Dubey
