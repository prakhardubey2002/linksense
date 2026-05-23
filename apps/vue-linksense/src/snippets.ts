export const VUE_SNIPPET = `<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useLinkSense } from "@linksense/vue";

const url = ref("https://github.com/user/repo");
const { result, isDetected, normalized, extracted } =
  useLinkSense(url, { normalize: true, extract: true });
</script>

<template>
  <article v-if="isDetected && result">
    <Icon :icon="result.icon" width="28" />
    <h3>{{ result.title }}</h3>
    <p>{{ normalized?.hostname }}</p>
    <span v-if="extracted?.username">@{{ extracted.username }}</span>
  </article>
</template>`;
