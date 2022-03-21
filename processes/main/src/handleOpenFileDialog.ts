import { dialog, Notification } from 'electron';
import { findOrFailWindow } from './windowManager';

const handleOpenFileDialog = async (): Promise<string | void> => {
  new Notification({ title: 'Foo', body: 'Hello darkness my old friend' }).show();

  return;
  const appWindow = findOrFailWindow('app');

  const { canceled, filePaths } = await dialog.showOpenDialog(appWindow, {
    properties: ['openFile'],
  });

  if (canceled) {
    return;
  }

  return filePaths[0];
};

export default handleOpenFileDialog;
