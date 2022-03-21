import { dialog } from 'electron';
import { vi } from 'vitest';
import createPomelloWindows from '../createPomelloWindows';
import handleOpenFileDialog from '../handleOpenFileDialog';
import { clearWindowCache } from '../windowManager';

vi.mock('electron');

describe('Handle Open File Dialog', () => {
  beforeEach(createPomelloWindows);

  afterEach(() => {
    clearWindowCache();

    vi.restoreAllMocks();
  });

  it('should return a path when a file has been selected', async () => {
    const path = 'foo/bar.txt';

    vi.spyOn(dialog, 'showOpenDialog').mockResolvedValue({
      canceled: false,
      filePaths: [path],
    });

    const result = await handleOpenFileDialog();

    expect(result).toEqual(path);
  });

  it('should return undefined when no file has been selected', async () => {
    vi.spyOn(dialog, 'showOpenDialog').mockResolvedValue({
      canceled: true,
      filePaths: [],
    });

    const result = await handleOpenFileDialog();

    expect(result).toBeUndefined();
  });
});
