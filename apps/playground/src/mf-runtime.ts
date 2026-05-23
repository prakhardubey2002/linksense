export type MountFn = (container: HTMLElement) => () => void;

const remoteLoaders: Record<string, () => Promise<unknown>> = {
  linksense_react: () => import("linksense_react/mount"),
  linksense_preact: () => import("linksense_preact/mount"),
  linksense_vue: () => import("linksense_vue/mount"),
};

export async function loadRemoteMount(remoteName: string): Promise<MountFn> {
  const loader = remoteLoaders[remoteName];
  if (!loader) {
    throw new Error(`Unknown remote: ${remoteName}`);
  }
  const mod = await loader();
  return resolveMount(mod);
}

async function resolveMount(mod: unknown): Promise<MountFn> {
  if (typeof mod === "function") {
    const loaded = await (mod as () => Promise<unknown>)();
    return resolveMount(loaded);
  }

  if (mod && typeof mod === "object") {
    const record = mod as Record<string, unknown>;

    if (typeof record.get === "function") {
      const loaded = await (record.get as () => Promise<unknown>)();
      return resolveMount(loaded);
    }

    if (typeof record.mount === "function") {
      return record.mount as MountFn;
    }

    if (typeof record.default === "function") {
      return record.default as MountFn;
    }

    if (record.default && typeof record.default === "object") {
      const nested = record.default as Record<string, unknown>;
      if (typeof nested.mount === "function") {
        return nested.mount as MountFn;
      }
      if (typeof nested.get === "function") {
        const loaded = await (nested.get as () => Promise<unknown>)();
        return resolveMount(loaded);
      }
    }
  }

  throw new Error("Remote module does not export mount()");
}
