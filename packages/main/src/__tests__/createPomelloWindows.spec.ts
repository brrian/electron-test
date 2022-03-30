import { vi } from 'vitest';
import createPomelloWindows from '../createPomelloWindows';
import { clearWindowCache, findOrFailWindow } from '../windowManager';

vi.mock('electron');

describe('Create Pomello Windows', () => {
  beforeEach(clearWindowCache);

  it('should create the app window', async () => {
    await createPomelloWindows();

    const appWindow = findOrFailWindow('app');

    expect(appWindow).toBeDefined();
  });

  it('should restore the app window if it is minimized', async () => {
    await createPomelloWindows();

    const appWindow = findOrFailWindow('app');
    appWindow.minimize();

    await createPomelloWindows();

    expect(appWindow.restore).toHaveBeenCalledOnce();
  });

  it('should focus the app windowo', async () => {
    await createPomelloWindows();

    const appWindow = findOrFailWindow('app');

    expect(appWindow.focus).toHaveBeenCalledOnce();
  });
});
