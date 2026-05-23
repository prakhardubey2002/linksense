import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

const remote = (name: string, port: number) => ({
  type: "module" as const,
  name,
  entry: `http://localhost:${port}/remoteEntry.js`,
  entryGlobalName: name,
  shareScope: "default",
});

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "linksense_playground",
      dts: false,
      remotes: {
        linksense_react: remote("linksense_react", 5173),
        linksense_preact: remote("linksense_preact", 5174),
        linksense_vue: remote("linksense_vue", 5175),
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5170,
    origin: "http://localhost:5170",
    cors: true,
  },
  preview: {
    port: 5170,
  },
  build: {
    target: "esnext",
    modulePreload: false,
  },
});
