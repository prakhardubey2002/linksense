import { useState } from "react";
import { Icon } from "@iconify/react";
import { useLinkSense } from "@linksense/react";
import "./demo.css";

const SAMPLE_URLS = [
  "https://github.com/torvalds/linux",
  "https://www.linkedin.com/in/johndoe",
  "https://x.com/openai",
  "https://leetcode.com/u/johndoe",
];

function App() {
  const [url, setUrl] = useState(SAMPLE_URLS[0] ?? "");
  const { result, isDetected, platform } = useLinkSense(url);

  return (
    <main className="demo">
      <h1>LinkSense React</h1>
      <p className="subtitle">Paste a URL to detect its platform</p>

      <label htmlFor="url">URL</label>
      <input
        id="url"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://github.com/user/repo"
      />

      <div className="samples">
        {SAMPLE_URLS.map((sample) => (
          <button key={sample} type="button" onClick={() => setUrl(sample)}>
            {sample.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
          </button>
        ))}
      </div>

      {!isDetected || !result ? (
        <div className="card empty">No platform detected for this URL.</div>
      ) : (
        <div className="card">
          <div className="row">
            <Icon icon={result.icon} width={40} height={40} />
            <div className="meta">
              <div className="platform">{platform}</div>
              <div className="title">{result.title}</div>
            </div>
          </div>
          {result.matches.length > 0 && (
            <div className="matches">
              Captured: {result.matches.join(" · ")}
            </div>
          )}
        </div>
      )}

      <span className="badge">@linksense/react</span>
    </main>
  );
}

export default App;
