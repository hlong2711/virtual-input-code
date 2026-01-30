import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import * as path from 'path';

// Create a directory symlink. On Windows use a 'junction' (safer for dirs).
async function linkFolder(src: string, dest: string) {
  const absSrc = path.resolve(src);
  const absDest = path.resolve(dest);

  if (!existsSync(absSrc)) {
    console.error(`Source folder "${absSrc}" does not exist.`);
    return;
  }

  try {
    if (existsSync(absDest)) {
      await fs.rm(absDest, { recursive: true, force: true });
    }

    const type = process.platform === 'win32' ? 'junction' : 'dir';
    await fs.symlink(absSrc, absDest, type);
  } catch (error) {
    console.error(`Error link folder from "${absSrc}" to "${absDest}":`, error);
  }
}

(async () => linkFolder('../../../build/web-mobile', 'web-link'))();
