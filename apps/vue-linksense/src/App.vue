<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useLinkSense } from "@linksense/vue";

const SAMPLE_URLS = [
  "https://github.com/torvalds/linux",
  "https://www.linkedin.com/in/johndoe",
  "https://x.com/openai",
  "https://leetcode.com/u/johndoe",
];

const url = ref(SAMPLE_URLS[0] ?? "");
const { result, isDetected, platform } = useLinkSense(url);
</script>

<template>
  <main class="demo">
    <h1>LinkSense Vue</h1>
    <p class="subtitle">Paste a URL to detect its platform</p>

    <label for="url">URL</label>
    <input
      id="url"
      v-model="url"
      type="url"
      placeholder="https://github.com/user/repo"
    />

    <div class="samples">
      <button
        v-for="sample in SAMPLE_URLS"
        :key="sample"
        type="button"
        @click="url = sample"
      >
        {{ sample.replace(/^https?:\/\/(www\.)?/, "").split("/")[0] }}
      </button>
    </div>

    <div v-if="!isDetected || !result" class="card empty">
      No platform detected for this URL.
    </div>
    <div v-else class="card">
      <div class="row">
        <Icon :icon="result.icon" width="40" height="40" />
        <div class="meta">
          <div class="platform">{{ platform }}</div>
          <div class="title">{{ result.title }}</div>
        </div>
      </div>
      <div v-if="result.matches.length" class="matches">
        Captured: {{ result.matches.join(" · ") }}
      </div>
    </div>

    <span class="badge">@linksense/vue</span>
  </main>
</template>

<style src="./demo.css"></style>
