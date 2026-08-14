import { createApp, type App as VueApp } from "vue";
import App from "./App.vue";

export function mount(container: HTMLElement): () => void {
  const app: VueApp = createApp(App);
  app.mount(container);
  return () => {
    app.unmount();
  };
}
