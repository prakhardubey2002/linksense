import { useState } from "preact/hooks";
import { Icon } from "@iconify/react";
import { useLinkSense } from "@linksense/preact";
import type { ExtractedData, NormalizedUrl } from "@linksense/core";
import { SAMPLE_URLS } from "../../shared/samples";
import { PREACT_SNIPPET } from "./snippets";
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
    <dl class="demo-details">
      {rows.map(({ label, value }) => (
        <div key={label} class="demo-detail-row">
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
    <dl class="demo-details">
      <div class="demo-detail-row">
        <dt>Hostname</dt>
        <dd>{normalized.hostname}</dd>
      </div>
      <div class="demo-detail-row">
        <dt>Path</dt>
        <dd>{normalized.pathname || "/"}</dd>
      </div>
    </dl>
  );
}

export function App() {
  const [url, setUrl] = useState(SAMPLE_URLS[0]?.url ?? "");
  const { result, isDetected, platform, normalized, extracted } = useLinkSense(
    url,
    { normalize: true, extract: true },
  );

  return (
    <div class="demo-shell" data-framework="preact">
      <div class="demo-inner">
        <header class="demo-hero">
          <span class="demo-pill">@linksense/preact</span>
          <h1>LinkSense Preact</h1>
          <p>
            Same hooks API as React — lightweight and ideal for embeddable UIs.
          </p>
        </header>

        <div class="demo-grid">
          <section class="demo-panel">
            <h2>Live preview</h2>
            <label class="demo-label" for="url">
              Paste a URL
            </label>
            <input
              id="url"
              class="demo-input"
              type="url"
              value={url}
              onInput={(e) =>
                setUrl((e.target as HTMLInputElement).value)
              }
              placeholder="https://github.com/user/repo"
            />

            <div class="demo-chips">
              {SAMPLE_URLS.map(({ label, url: sample }) => (
                <button
                  key={sample}
                  type="button"
                  class={url === sample ? "demo-chip is-active" : "demo-chip"}
                  onClick={() => setUrl(sample)}
                >
                  {label}
                </button>
              ))}
            </div>

            {!isDetected || !result ? (
              <div class="demo-result is-empty">
                No platform detected — try another URL or pick a sample.
              </div>
            ) : (
              <div class="demo-result">
                <div class="demo-result-head">
                  <div class="icon-wrap">
                    <Icon icon={result.icon} width={32} height={32} />
                  </div>
                  <div class="demo-result-meta">
                    <span class="demo-platform-tag">{platform}</span>
                    <p class="demo-result-title">{result.title}</p>
                    <p class="demo-result-url">{result.url}</p>
                  </div>
                </div>
                {result.matches.length > 0 && (
                  <dl class="demo-details">
                    <div class="demo-detail-row">
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

          <section class="demo-panel">
            <h2>Usage</h2>
            <div class="demo-code-wrap">
              <span class="demo-code-lang">tsx</span>
              <pre>
                <code>{PREACT_SNIPPET}</code>
              </pre>
            </div>
            <p class="demo-hint">
              Import from <code>@linksense/preact</code> — works with Preact 10+
              and <code>@iconify/react</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
