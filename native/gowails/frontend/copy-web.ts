import * as fs from 'fs/promises';
import { existsSync } from 'fs';

// function to copy from src to dest
async function copyFolder(src: string, dest: string) {
  if (!existsSync(src)) {
    console.error(`Source folder "${src}" does not exist.`);
    return;
  }

  
  try {
    await fs.cp(src, dest, { recursive: true })
  } catch (error) {
    console.error(`Error copying folder from "${src}" to "${dest}":`, error);
  }
}

(() => copyFolder('../../../build/web-mobile/', 'dist/'))()
