import { useState } from "react";
import { RemoteMount } from "./RemoteMount";
import "./playground.css";

type Tab = "react" | "preact" | "vue";

const TABS: { id: Tab; label: string; remote: string }[] = [
  { id: "react", label: "React", remote: "linksense_react" },
  { id: "preact", label: "Preact", remote: "linksense_preact" },
  { id: "vue", label: "Vue", remote: "linksense_vue" },
];

function App() {
  const [tab, setTab] = useState<Tab>("react");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="playground">
      <header className="playground-header">
        <h1>LinkSense Playground</h1>
        <p>
          One host, three remotes — switch tabs to compare React, Preact, and Vue
          demos side by side.
        </p>
      </header>

      <nav className="tabs" aria-label="Framework demos">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "tab active" : "tab"}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <section className="panel">
        <RemoteMount label={active.label} remoteName={active.remote} />
      </section>
    </div>
  );
}

export default App;
