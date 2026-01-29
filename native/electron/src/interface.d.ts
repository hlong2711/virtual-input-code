
declare global {
  interface Window {
    versions: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
    };

    nativeAPI: {
      log: (msg?: string) => void;
    };
  }
}

export {}
