import { app, BrowserWindow } from 'electron';
import * as path from 'node:path';
import { registerHandler } from './handlers';

const createWindow = (): void => {
  const win = new BrowserWindow({
    width: 540,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setAspectRatio(9 / 16);
  win.loadFile(path.join(__dirname, 'web-mobile/index.html'));
  // win.loadURL("http://localhost:7456")

  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  registerHandler();

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
