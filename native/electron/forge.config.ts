import type { ForgeConfig } from '@electron-forge/shared-types';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import * as fs from 'fs/promises';

module.exports = {
  packagerConfig: {
    asar: true,
    ignore: [
      "src",
      "tsconfig.json",
      "forge.config.ts",
      "index.html",
      ".gitignore"
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  hooks: {
    preStart: async (forgeCnf) => {
      console.log(`>>> election preStart hook`);
      await fs.cp('../../build/web-mobile/', './dist/web-mobile/', {recursive: true});
      
      // inject renderer script
      const script = `<script>
    System.import('./../renderer.js')
    .then(function() {
      console.log('load electron renderer done!')
    })
    .catch(function(err) {console.error(err);})
</script>`;

      const indexPath = './dist/web-mobile/index.html';
      let indexContent = await fs.readFile(indexPath, { encoding: 'utf-8' });
      indexContent = indexContent.replace('</body>', `${script}\n</body>`);
      await fs.writeFile(indexPath, indexContent, { encoding: 'utf-8' });

      console.log(`>>> injected renderer script into ${indexPath}`);
    },
  }
} as ForgeConfig;
