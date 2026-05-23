declare module "linksense_react/mount" {
  export function mount(container: HTMLElement): () => void;
}

declare module "linksense_preact/mount" {
  export function mount(container: HTMLElement): () => void;
}

declare module "linksense_vue/mount" {
  export function mount(container: HTMLElement): () => void;
}
