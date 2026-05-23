import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

const remote = (
  name: string,
  port: number,
  path: string,
  isDev: boolean,
) => ({
  type: "module" as const,
  name,
  entry: isDev
    ? `http://localhost:${port}/remoteEntry.js`
    : `${path}/remoteEntry.js`,
  entryGlobalName: name,
  shareScope: "default",
});

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [
      react(),
      federation({
        name: "linksense_playground",
        dts: false,
        remotes: {
          linksense_react: remote(
            "linksense_react",
            5173,
            "/remotes/react",
            isDev,
          ),
          linksense_preact: remote(
            "linksense_preact",
            5174,
            "/remotes/preact",
            isDev,
          ),
          linksense_vue: remote(
            "linksense_vue",
            5175,
            "/remotes/vue",
            isDev,
          ),
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
  };
});
