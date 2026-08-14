import { spawnSync } from "node:child_process";

const env = { ...process.env, STAGE_FEDERATION: "1" };

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("→ Building packages (@linksense/*)…");
run("pnpm", ["build"]);

console.log("→ Building federation apps (production remotes)…");
const turboArgs = [
  "turbo",
  "run",
  "build",
  "--filter=linksense-react",
  "--filter=preact-linksense",
  "--filter=vue-linksense",
  "--filter=playground",
];

// Avoid stale Turbo cache serving a dev build with localhost remotes on Vercel
if (process.env.VERCEL) {
  turboArgs.push("--force");
  console.log("  (VERCEL=1 → turbo --force)");
}

run("pnpm", turboArgs);

console.log("\n✓ Federation build complete.");
console.log("  Stage remotes: pnpm stage:federation");
console.log("  Or preview:    pnpm preview:federation");
