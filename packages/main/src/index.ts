import { app, dialog, ipcMain, Notification } from 'electron';
import logger from 'electron-log';
import path from 'path';
import createPomelloWindows from './createPomelloWindows';
import { findOrFailWindow } from './windowManager';

logger.transports.file.resolvePath = () => path.join(app.getPath('userData'), 'logs/main.log');

const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.on('second-instance', createPomelloWindows);

app.on('window-all-closed', () => {
  app.quit();
});

app
  .whenReady()
  .then(() => {
    createPomelloWindows();

    ipcMain.handle('open-file-dialog', async () => {
      const foo = new Notification({
        title: 'Open File Dialog',
        body: 'Hello from the main process!',
      });

      foo.show();

      return;

      const { canceled, filePaths } = await dialog.showOpenDialog(findOrFailWindow('app'), {
        properties: ['openFile'],
      });

      if (canceled) {
        return;
      }

      return filePaths[0];
    });
  })
  .catch(error => console.error('Failed to create Pomello windows:', error));

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
