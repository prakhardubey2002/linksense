import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const REMOTES = [
  { app: "linksense-react", dest: "react" },
  { app: "preact-linksense", dest: "preact" },
  { app: "vue-linksense", dest: "vue" },
];

const hostDist = resolve(root, "apps/playground/dist");

if (!existsSync(hostDist)) {
  console.error(
    "❌ apps/playground/dist not found. Run: pnpm build:federation",
  );
  process.exit(1);
}

mkdirSync(resolve(hostDist, "remotes"), { recursive: true });

for (const { app, dest } of REMOTES) {
  const src = resolve(root, `apps/${app}/dist`);
  const target = resolve(hostDist, `remotes/${dest}`);

  if (!existsSync(src)) {
    console.error(`❌ Missing ${src}`);
    console.error("   Run: pnpm build:federation");
    process.exit(1);
  }

  if (!existsSync(resolve(src, "remoteEntry.js"))) {
    console.error(`❌ Missing remoteEntry.js in apps/${app}/dist`);
    process.exit(1);
  }

  rmSync(target, { recursive: true, force: true });
  cpSync(src, target, { recursive: true });
  console.log(`✓ staged apps/${app}/dist → apps/playground/dist/remotes/${dest}`);
}

console.log("\n✓ Federation remotes staged.");
console.log("  Preview: pnpm preview:federation");
