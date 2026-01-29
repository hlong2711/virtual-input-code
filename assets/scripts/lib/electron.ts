export class Electron { 

  // Singleton instance
  private static instance: Electron;

  private constructor() {
  }

  public static getInstance(): Electron {
    if (!Electron.instance) {
      Electron.instance = new Electron();
    }

    if (!window.nativeAPI) {
      console.warn("nativeAPI is not available in the renderer process.");
    }
    return Electron.instance;
  }
  
  getApi() {
    return window.nativeAPI;
  }

  log(msg?: string) {
    const api = this.getApi();
    api?.log(msg);
  }
  
}

export const electron = Electron.getInstance();
