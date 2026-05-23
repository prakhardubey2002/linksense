import { useState } from "react";
import { Icon } from "@iconify/react";
import { useLinkSense } from "@linksense/react";
import type { ExtractedData, NormalizedUrl } from "@linksense/core";
import { SAMPLE_URLS } from "../../shared/samples";
import { REACT_SNIPPET } from "./snippets";
import "../../shared/demo.css";

function ExtractedDetails({ extracted }: { extracted: ExtractedData | null }) {
  if (!extracted) return null;
  const rows: { label: string; value: string }[] = [];
  if (extracted.username) rows.push({ label: "Username", value: extracted.username });
  if (extracted.repository)
    rows.push({ label: "Repository", value: extracted.repository });
  if (extracted.path) rows.push({ label: "Path", value: extracted.path });
  if (extracted.query && Object.keys(extracted.query).length > 0) {
    rows.push({
      label: "Query",
      value: Object.entries(extracted.query)
        .map(([k, v]) => `${k}=${v}`)
        .join(", "),
    });
  }
  if (rows.length === 0) return null;

  return (
    <dl className="demo-details">
      {rows.map(({ label, value }) => (
        <div key={label} className="demo-detail-row">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function NormalizedDetails({
  normalized,
}: {
  normalized: NormalizedUrl | null;
}) {
  if (!normalized) return null;
  return (
    <dl className="demo-details">
      <div className="demo-detail-row">
        <dt>Hostname</dt>
        <dd>{normalized.hostname}</dd>
      </div>
      <div className="demo-detail-row">
        <dt>Path</dt>
        <dd>{normalized.pathname || "/"}</dd>
      </div>
    </dl>
  );
}

function App() {
  const [url, setUrl] = useState(SAMPLE_URLS[0]?.url ?? "");
  const { result, isDetected, platform, normalized, extracted } = useLinkSense(
    url,
    { normalize: true, extract: true },
  );

  return (
    <div className="demo-shell" data-framework="react">
      <div className="demo-inner">
        <header className="demo-hero">
          <span className="demo-pill">@linksense/react</span>
          <h1>LinkSense React</h1>
          <p>
            Detect platforms from URLs with hooks — live preview and a minimal
            usage example below.
          </p>
        </header>

        <div className="demo-grid">
          <section className="demo-panel">
            <h2>Live preview</h2>
            <label className="demo-label" htmlFor="url">
              Paste a URL
            </label>
            <input
              id="url"
              className="demo-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/user/repo"
            />

            <div className="demo-chips">
              {SAMPLE_URLS.map(({ label, url: sample }) => (
                <button
                  key={sample}
                  type="button"
                  className={
                    url === sample ? "demo-chip is-active" : "demo-chip"
                  }
                  onClick={() => setUrl(sample)}
                >
                  {label}
                </button>
              ))}
            </div>

            {!isDetected || !result ? (
              <div className="demo-result is-empty">
                No platform detected — try another URL or pick a sample.
              </div>
            ) : (
              <div className="demo-result">
                <div className="demo-result-head">
                  <div className="icon-wrap">
                    <Icon icon={result.icon} width={32} height={32} />
                  </div>
                  <div className="demo-result-meta">
                    <span className="demo-platform-tag">{platform}</span>
                    <p className="demo-result-title">{result.title}</p>
                    <p className="demo-result-url">{result.url}</p>
                  </div>
                </div>
                {result.matches.length > 0 && (
                  <dl className="demo-details">
                    <div className="demo-detail-row">
                      <dt>Captured</dt>
                      <dd>{result.matches.join(" · ")}</dd>
                    </div>
                  </dl>
                )}
                <NormalizedDetails normalized={normalized} />
                <ExtractedDetails extracted={extracted} />
              </div>
            )}
          </section>

          <section className="demo-panel">
            <h2>Usage</h2>
            <div className="demo-code-wrap">
              <span className="demo-code-lang">tsx</span>
              <pre>
                <code>{REACT_SNIPPET}</code>
              </pre>
            </div>
            <p className="demo-hint">
              Icons use <code>result.icon</code> with{" "}
              <code>@iconify/react</code>. Enable <code>normalize</code> and{" "}
              <code>extract</code> for hostname and path data.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
