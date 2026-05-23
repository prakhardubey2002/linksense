<script setup lang="ts">
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useLinkSense } from "@linksense/vue";
import { SAMPLE_URLS } from "../../shared/samples";
import { VUE_SNIPPET } from "./snippets";
import "../../shared/demo.css";

const url = ref<string>(SAMPLE_URLS[0]?.url ?? "");
const { result, isDetected, platform, normalized, extracted } = useLinkSense(
  url,
  { normalize: true, extract: true },
);

const extractedRows = computed(() => {
  const data = extracted.value;
  if (!data) return [];
  const rows: { label: string; value: string }[] = [];
  if (data.username) rows.push({ label: "Username", value: data.username });
  if (data.repository)
    rows.push({ label: "Repository", value: data.repository });
  if (data.path) rows.push({ label: "Path", value: data.path });
  if (data.query && Object.keys(data.query).length > 0) {
    rows.push({
      label: "Query",
      value: Object.entries(data.query)
        .map(([k, v]) => `${k}=${v}`)
        .join(", "),
    });
  }
  return rows;
});

function isActive(sample: string) {
  return url.value === sample;
}
</script>

<template>
  <div class="demo-shell" data-framework="vue">
    <div class="demo-inner">
      <header class="demo-hero">
        <span class="demo-pill">@linksense/vue</span>
        <h1>LinkSense Vue</h1>
        <p>
          Composables with <code>ComputedRef</code> results — reactive URL
          detection in your Vue 3 apps.
        </p>
      </header>

      <div class="demo-grid">
        <section class="demo-panel">
          <h2>Live preview</h2>
          <label class="demo-label" for="url">Paste a URL</label>
          <input
            id="url"
            v-model="url"
            class="demo-input"
            type="url"
            placeholder="https://github.com/user/repo"
          />

          <div class="demo-chips">
            <button
              v-for="{ label, url: sample } in SAMPLE_URLS"
              :key="sample"
              type="button"
              :class="['demo-chip', { 'is-active': isActive(sample) }]"
              @click="url = sample"
            >
              {{ label }}
            </button>
          </div>

          <div v-if="!isDetected || !result" class="demo-result is-empty">
            No platform detected — try another URL or pick a sample.
          </div>
          <div v-else class="demo-result">
            <div class="demo-result-head">
              <div class="icon-wrap">
                <Icon :icon="result.icon" width="32" height="32" />
              </div>
              <div class="demo-result-meta">
                <span class="demo-platform-tag">{{ platform }}</span>
                <p class="demo-result-title">{{ result.title }}</p>
                <p class="demo-result-url">{{ result.url }}</p>
              </div>
            </div>

            <dl v-if="result.matches.length" class="demo-details">
              <div class="demo-detail-row">
                <dt>Captured</dt>
                <dd>{{ result.matches.join(" · ") }}</dd>
              </div>
            </dl>

            <dl v-if="normalized" class="demo-details">
              <div class="demo-detail-row">
                <dt>Hostname</dt>
                <dd>{{ normalized.hostname }}</dd>
              </div>
              <div class="demo-detail-row">
                <dt>Path</dt>
                <dd>{{ normalized.pathname || "/" }}</dd>
              </div>
            </dl>

            <dl v-if="extractedRows.length" class="demo-details">
              <div
                v-for="row in extractedRows"
                :key="row.label"
                class="demo-detail-row"
              >
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section class="demo-panel">
          <h2>Usage</h2>
          <div class="demo-code-wrap">
            <span class="demo-code-lang">vue</span>
            <pre><code>{{ VUE_SNIPPET }}</code></pre>
          </div>
          <p class="demo-hint">
            Pass a <code>ref</code> to <code>useLinkSense</code>. Icons render
            with <code>@iconify/vue</code> via <code>result.icon</code>.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
