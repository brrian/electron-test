import { app, ipcMain } from 'electron';
import logger from 'electron-log';
import createPomelloWindows from './createPomelloWindows';
import handleOpenFileDialog from './handleOpenFileDialog';

const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.on('second-instance', createPomelloWindows);

app.on('window-all-closed', () => {
  app.quit();
});

app.whenReady().then(() => {
  if (process.platform === 'win32') {
    app.setAppUserModelId(import.meta.env.VITE_APP_ID);
  }

  ipcMain.handle('open-file-dialog', handleOpenFileDialog);

  createPomelloWindows().catch(error => console.error('Failed to create Pomello windows:', error));
});

if (import.meta.env.DEV) {
  app
    .whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) => {
      installExtension(REACT_DEVELOPER_TOOLS);
    });
}

if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => {
      autoUpdater.channel = 'alpha';

      autoUpdater.logger = logger;

      autoUpdater.setFeedURL(import.meta.env.VITE_AUTO_UPDATE_URL);

      autoUpdater.checkForUpdatesAndNotify();
    })
    .catch(error => console.error('Failed to check for updates:', error));
}
