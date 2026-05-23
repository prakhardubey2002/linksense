export const PREACT_SNIPPET = `import { Icon } from "@iconify/react";
import { useLinkSense } from "@linksense/preact";

export function LinkPreview({ url }: { url: string }) {
  const { result, isDetected, normalized, extracted } =
    useLinkSense(url, { normalize: true, extract: true });

  if (!isDetected || !result) return <p>Unknown link</p>;

  return (
    <article>
      <Icon icon={result.icon} width={28} />
      <h3>{result.title}</h3>
      <p>{normalized?.hostname}</p>
      {extracted?.username && <span>@{extracted.username}</span>}
    </article>
  );
}`;
