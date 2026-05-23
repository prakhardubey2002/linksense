import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : "/remotes/react/",
  plugins: [
    react(),
    federation({
      name: "linksense_react",
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/mount.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
    origin: "http://localhost:5173",
    cors: true,
  },
  preview: {
    port: 5173,
  },
  build: {
    target: "esnext",
    modulePreload: false,
  },
  optimizeDeps: {
    include: ["@linksense/react", "@linksense/core"],
  },
}));
