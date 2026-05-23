import { useState } from "preact/hooks";
import { Icon } from "@iconify/react";
import { useLinkSense } from "@linksense/preact";
import "./demo.css";

const SAMPLE_URLS = [
  "https://github.com/torvalds/linux",
  "https://www.linkedin.com/in/johndoe",
  "https://x.com/openai",
  "https://leetcode.com/u/johndoe",
];

export function App() {
  const [url, setUrl] = useState(SAMPLE_URLS[0] ?? "");
  const { result, isDetected, platform } = useLinkSense(url);

  return (
    <main class="demo">
      <h1>LinkSense Preact</h1>
      <p class="subtitle">Paste a URL to detect its platform</p>

      <label for="url">URL</label>
      <input
        id="url"
        type="url"
        value={url}
        onInput={(e) => setUrl((e.target as HTMLInputElement).value)}
        placeholder="https://github.com/user/repo"
      />

      <div class="samples">
        {SAMPLE_URLS.map((sample) => (
          <button key={sample} type="button" onClick={() => setUrl(sample)}>
            {sample.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
          </button>
        ))}
      </div>

      {!isDetected || !result ? (
        <div class="card empty">No platform detected for this URL.</div>
      ) : (
        <div class="card">
          <div class="row">
            <Icon icon={result.icon} width={40} height={40} />
            <div class="meta">
              <div class="platform">{platform}</div>
              <div class="title">{result.title}</div>
            </div>
          </div>
          {result.matches.length > 0 && (
            <div class="matches">
              Captured: {result.matches.join(" · ")}
            </div>
          )}
        </div>
      )}

      <span class="badge">@linksense/preact</span>
    </main>
  );
}
