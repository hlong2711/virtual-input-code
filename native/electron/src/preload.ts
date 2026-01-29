import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("nativeAPI", {
  log: (msg?: string) => {
    console.log(`Preload call log: ${msg}`);
    ipcRenderer.send("log-message", msg);
  }
})
