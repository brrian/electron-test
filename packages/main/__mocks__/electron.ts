import { vi } from 'vitest';

type CallbackFunction = () => void;

export const BrowserWindow = vi.fn(() => {
  const listenersMap = new Map<string, CallbackFunction[]>();

  let isMinimized = false;

  return {
    emit: (event: string) => {
      const listeners = listenersMap.get(event);

      listeners?.forEach(callback => callback());
    },
    isMinimized: vi.fn(() => isMinimized),
    focus: vi.fn(),
    show: vi.fn(),
    minimize: vi.fn(() => {
      isMinimized = !isMinimized;
    }),
    on: vi.fn((event: string, callback: CallbackFunction) => {
      const listeners = listenersMap.get(event) ?? [];

      listeners.push(callback);
      listenersMap.set(event, listeners);
    }),
    restore: vi.fn(),
    loadURL: vi.fn(),
    webContents: {
      openDevTools: vi.fn(),
    },
  };
});
