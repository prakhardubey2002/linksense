import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { federation } from "@module-federation/vite";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : "/remotes/preact/",
  plugins: [
    preact(),
    federation({
      name: "linksense_preact",
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/mount.tsx",
      },
      shared: {
        preact: { singleton: true },
      },
    }),
  ],
  server: {
    port: 5174,
    strictPort: true,
    origin: "http://localhost:5174",
    cors: true,
  },
  preview: {
    port: 5174,
  },
  build: {
    target: "esnext",
    modulePreload: false,
  },
  optimizeDeps: {
    include: ["@linksense/preact", "@linksense/core"],
  },
}));
