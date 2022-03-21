import { findOrCreateWindow } from './windowManager';
import { join } from 'path';

export default async function createPomelloWindows(): Promise<void> {
  const appWindow = await findOrCreateWindow({
    id: 'app',
    path: 'app.html',
    options: {
      show: false,
      webPreferences: {
        preload: join(__dirname, '../../preload/dist/index.cjs'),
      },
    },
  });

  if (appWindow.isMinimized()) {
    appWindow.restore();
  }

  appWindow.focus();
}
