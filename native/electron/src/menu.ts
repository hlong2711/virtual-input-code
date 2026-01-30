import { BrowserWindow, Menu } from "electron/main";

export function setAppMenu() {

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { role: 'about' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'about' },
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}