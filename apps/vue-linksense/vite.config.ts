import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : "/remotes/vue/",
  plugins: [
    vue(),
    federation({
      name: "linksense_vue",
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/mount.ts",
      },
      shared: {
        vue: { singleton: true },
      },
    }),
  ],
  server: {
    port: 5175,
    strictPort: true,
    origin: "http://localhost:5175",
    cors: true,
  },
  preview: {
    port: 5175,
  },
  build: {
    target: "esnext",
    modulePreload: false,
  },
  optimizeDeps: {
    include: ["@linksense/vue", "@linksense/core"],
  },
}));
