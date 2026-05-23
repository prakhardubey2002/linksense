import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, "../packages/core/src/data/platforms.json");

const requiredFields = ["name", "regex", "title", "icon"];

function validate() {
  let raw;
  try {
    raw = readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error(`❌ Cannot read platforms.json: ${err.message}`);
    process.exit(1);
  }

  let platforms;
  try {
    platforms = JSON.parse(raw);
  } catch (err) {
    console.error(`❌ platforms.json is not valid JSON: ${err.message}`);
    process.exit(1);
  }


  const names = new Set();

  for (let i = 0; i < platforms.length; i++) {
    const entry = platforms[i];
    const prefix = `Entry [${i}] (${entry.name || "unnamed"})`;

    for (const field of requiredFields) {
      if (typeof entry[field] !== "string" || entry[field].trim() === "") {
        console.error(`❌ ${prefix}: missing or invalid required field "${field}"`);
        process.exit(1);
      }
    }


    try {
      new RegExp(entry.regex);
    } catch (err) {
      console.error(`❌ ${prefix}: invalid regex - ${err.message}`);
      process.exit(1);
    }

    if (names.has(entry.name)) {
      console.error(`❌ ${prefix}: duplicate platform name "${entry.name}"`);
      process.exit(1);
    }
    names.add(entry.name);
  }

  console.log(`✅ platforms.json is valid (${platforms.length} entries)`);
}

validate();
