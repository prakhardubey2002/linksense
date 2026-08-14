import { render } from "preact";
import { App } from "./app";

export function mount(container: HTMLElement): () => void {
  render(<App />, container);
  return () => {
    render(null, container);
  };
}
