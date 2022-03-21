import { BrowserWindow, BrowserWindowConstructorOptions, OpenDevToolsOptions } from 'electron';

interface FindOrCreateWindowOptions {
  devTools?: false | OpenDevToolsOptions;
  id: string;
  options?: BrowserWindowConstructorOptions;
  path: string;
  showOnReady?: boolean;
}

const windows: Map<string, BrowserWindow> = new Map();

export async function findOrCreateWindow({
  devTools = { mode: 'detach' },
  id,
  options,
  path,
  showOnReady = true,
}: FindOrCreateWindowOptions): Promise<BrowserWindow> {
  const window = windows.get(id);

  if (window) {
    return window;
  }

  const browserWindow = new BrowserWindow(options);

  browserWindow.on('ready-to-show', () => {
    if (showOnReady) {
      browserWindow.show();
    }

    if (import.meta.env.DEV && devTools !== false) {
      browserWindow.webContents.openDevTools(devTools);
    }
  });

  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? `${import.meta.env.VITE_DEV_SERVER_URL}/${path}`
      : new URL(`../renderer/dist/${path}`, `file://${__dirname}`).toString();

  await browserWindow.loadURL(pageUrl);

  windows.set(id, browserWindow);

  return browserWindow;
}

export function findOrFailWindow(id: string) {
  const window = windows.get(id);

  if (!window) {
    throw new Error(`Unable to find window with id "${id}".`);
  }

  return window;
}
