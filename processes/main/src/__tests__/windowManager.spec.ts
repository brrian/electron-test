import { BrowserWindow } from 'electron';
import { vi } from 'vitest';
import { clearWindowCache, findOrCreateWindow, findOrFailWindow } from '../windowManager';

vi.mock('electron');

describe('Window Manager', () => {
  beforeEach(clearWindowCache);

  it('should create a single BrowserWindow for each id', async () => {
    const browserWindow = vi.mocked(BrowserWindow);

    await findOrCreateWindow({ id: 'foo', path: 'foo.html' });

    await findOrCreateWindow({ id: 'foo', path: 'foo.html' });

    expect(browserWindow).toHaveBeenCalledOnce();
  });

  it('should return an existing window by id', async () => {
    const window = await findOrCreateWindow({ id: 'bar', path: 'bar.html' });

    expect(findOrFailWindow('bar')).toBe(window);
  });

  it('should show the window when ready', async () => {
    const window = await findOrCreateWindow({ id: 'bar', path: 'bar.html' });
    window.emit('ready-to-show');

    expect(window.show).toHaveBeenCalledOnce();
  });

  it('should not show the window when ready if showOnReady is false', async () => {
    const window = await findOrCreateWindow({
      id: 'bar',
      path: 'bar.html',
      showOnReady: false,
    });
    window.emit('ready-to-show');

    expect(window.show).not.toHaveBeenCalled();
  });

  it('should throw an error if the window id does not exist', () => {
    expect(() => findOrFailWindow('unknown')).toThrowError();
  });
});
