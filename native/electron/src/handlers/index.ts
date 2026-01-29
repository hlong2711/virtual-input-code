import { ipcMain } from "electron/main";

export function registerHandler() {
  console.log('Handler registered');
  
  ipcMain.on("log-message", (event, msg?: string) => {
    console.log("From Renderer:", msg);
  });
}