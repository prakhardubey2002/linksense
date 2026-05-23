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

console.log("→ Building federation apps (STAGE_FEDERATION=1)…");
run("pnpm", [
  "turbo",
  "run",
  "build",
  "--filter=linksense-react",
  "--filter=preact-linksense",
  "--filter=vue-linksense",
  "--filter=playground",
]);

console.log("\n✓ Federation build complete.");
console.log("  Stage remotes: pnpm stage:federation");
console.log("  Or preview:    pnpm preview:federation");
