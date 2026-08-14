# @linksense/angular

Angular injectable service for URL platform detection. Powered by [`@linksense/core`](https://www.npmjs.com/package/@linksense/core).

## Install

```bash
npm install @linksense/angular @angular/core
```

`@linksense/core` is installed automatically as a dependency.

## Usage

```typescript
import { Component, inject } from "@angular/core";
import { LinkSenseService } from "@linksense/angular";

@Component({
  selector: "app-link-card",
  template: `
    @if (isDetected && result) {
      <span>{{ result.title }}</span>
      <span class="iconify" [attr.data-icon]="result.icon"></span>
      <a [href]="url">{{ result.platform }}</a>
    }
  `,
})
export class LinkCardComponent {
  private linkSense = inject(LinkSenseService);
  url = "https://github.com/torvalds/linux";

  get result() {
    return this.linkSense.detect(this.url);
  }

  get isDetected() {
    return this.result !== null;
  }
}
```

## `LinkSenseService` API

| Method | Description |
|--------|-------------|
| `detect(url)` | First matching platform |
| `detectAll(url)` | All matching platforms |
| `detectBatch(urls)` | Map of URL → result |
| `getPlatforms()` | Full platform registry |
| `normalizeUrl(url)` | Normalized URL object |
| `extractFromUrl(url)` | Username, repo, path, query |
| `parseUrl(url)` | Raw URL components |
| `normalizeHostname(hostname)` | Strip www, lowercase |
| `removeTrailingSlash(path)` | Path cleanup |
| `isValidUrl(url)` | Boolean URL check |

`providedIn: 'root'` — register once, inject anywhere.

## Icons (Iconify)

`result.icon` values are **Iconify** ids (`lucide:github`, `simple-icons:udemy`, etc.), not Lucide CSS classes. Use the Iconify SVG framework [`@iconify/iconify`](https://www.npmjs.com/package/@iconify/iconify):

```bash
npm install @iconify/iconify
```

In `angular.json` or `index.html`, load Iconify once, then bind `data-icon` in templates:

```html
<span class="iconify" [attr.data-icon]="result?.icon"></span>
```

```typescript
// main.ts (bundled apps)
import "@iconify/iconify";
```

See [Iconify SVG framework](https://iconify.design/docs/icon-components/svg-framework/) for setup details.

## Direct core access

Core functions and types are also exported from `@linksense/angular`.

## License

MIT
