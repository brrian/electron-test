import { contextBridge } from 'electron';

export default function exposeInMainWorld<TKey extends keyof Exposed & string>(
  key: TKey,
  api: Exposed[TKey]
) {
  return contextBridge.exposeInMainWorld(key, api);
}
