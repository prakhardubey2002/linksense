import { createRoot, type Root } from "react-dom/client";
import App from "./App";

let root: Root | null = null;

export function mount(container: HTMLElement): () => void {
  root = createRoot(container);
  root.render(<App />);
  return () => {
    root?.unmount();
    root = null;
  };
}
