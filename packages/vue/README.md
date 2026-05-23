# @linksense/vue

Vue 3 composables for URL platform detection, normalization, and extraction. Powered by [`@linksense/core`](https://www.npmjs.com/package/@linksense/core).

## Install

```bash
npm install @linksense/vue vue
```

## Composables

### `useLinkSense(url, options?)`

Accepts a string or `Ref<string | null | undefined>`. Returns **computed refs** — use `.value` in script or auto-unwrap in templates.

```vue
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useLinkSense } from "@linksense/vue";

const url = ref("https://github.com/torvalds/linux");
const { result, isDetected, platform } = useLinkSense(url);
</script>

<template>
  <div v-if="isDetected && result">
    <span>{{ result.title }}</span>
    <Icon :icon="result.icon" width="24" height="24" />
    <a :href="url">{{ platform }}</a>
  </div>
</template>
```

**Options:** `all`, `normalize`, `extract` (same as React adapter).

```ts
const { result, results, normalized, extracted } = useLinkSense(url, {
  all: true,
  normalize: true,
  extract: true,
});
```

### `useDetectAll(url)`

```vue
<script setup lang="ts">
import { useDetectAll } from "@linksense/vue";

const { results, platforms, isDetected } = useDetectAll("https://github.com/user/repo");
</script>
```

### `useNormalizeUrl(url)`

```ts
const normalized = useNormalizeUrl(url);
// normalized.value?.hostname
```

### `useExtractFromUrl(url)`

```ts
const extracted = useExtractFromUrl(url);
// extracted.value?.username
```

## Icons (Iconify)

`result.icon` values are **Iconify** ids (`lucide:github`, `mdi:behance`, etc.). Install [`@iconify/vue`](https://www.npmjs.com/package/@iconify/vue):

```bash
npm install @iconify/vue
```

```vue
<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <Icon :icon="result.icon" width="24" height="24" />
</template>
```

## Direct core access

All `@linksense/core` functions and types are re-exported from `@linksense/vue`.

## License

MIT
