import { ipcRenderer } from 'electron';
import exposeInMainWorld from './exposeInMainWorld';

exposeInMainWorld('openFileDialog', openFileDialog);

export default function openFileDialog(): Promise<string[] | void> {
  return ipcRenderer.invoke('open-file-dialog');
}
