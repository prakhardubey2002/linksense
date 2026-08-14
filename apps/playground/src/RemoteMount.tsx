import { useEffect, useRef, useState } from "react";
import { loadRemoteMount } from "./mf-runtime";

interface RemoteMountProps {
  label: string;
  remoteName: string;
}

export function RemoteMount({ label, remoteName }: RemoteMountProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmount: (() => void) | undefined;
    let cancelled = false;

    setLoading(true);
    setError(null);

    loadRemoteMount(remoteName)
      .then((mount) => {
        if (cancelled || !containerRef.current) return;
        unmount = mount(containerRef.current);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof Error
            ? err.message
            : `Failed to load ${label} remote. Start all dev servers with pnpm dev:federation.`,
        );
        setLoading(false);
      });

    return () => {
      cancelled = true;
      const teardown = unmount;
      queueMicrotask(() => teardown?.());
    };
  }, [remoteName, label]);

  if (error) {
    return (
      <div className="remote-error">
        <strong>{label}</strong>
        <p>{error}</p>
        <p className="hint">
          Run <code>pnpm dev:federation</code> from the repo root (host + all
          remotes must be running).
        </p>
      </div>
    );
  }

  return (
    <div className="remote-mount">
      {loading && <p className="remote-loading">Loading {label}…</p>}
      <div ref={containerRef} className="remote-root" />
    </div>
  );
}
