// import { packageName } from '@embroider/shared-internals';
import { createFilter } from '@rollup/pluginutils';
import fs from 'node:fs/promises';
import path from 'node:path';
import MagicString from 'magic-string';

const PLUGIN_KEY = 'colocate-polaris-styles';
const RELEVANT_EXTENSION_REGEX = /\.scss.js$/;

export default function colocatePolarisStyles() {
  return {
    name: 'rollup-plugin-colocate-polaris-styles',

    /**
     * Instead of going with the default resolver for Polaris .scss.js imports, we resolve these
     * ourselves.
     */
    async resolveId(source, importer, options) {
      let resolution = await this.resolve(source, importer, {
        ...options,
        skipSelf: true,
      });

      if (resolution && RELEVANT_EXTENSION_REGEX.test(resolution.id)) {
        return {
          ...resolution,
          external: false,
          meta: { [PLUGIN_KEY]: { originalId: resolution.id } },
        };
      }

      return resolution;
    },

    /**
     * Handles loading of for the .scss.js files by inlining them while also updating the prefix
     * from `Polaris-` to `New-Polaris`.
     */
    async load(id) {
      let originalId =
        this.getModuleInfo(id)?.meta?.[PLUGIN_KEY]?.originalId ?? id;

      if (!RELEVANT_EXTENSION_REGEX.test(originalId)) {
        return;
      }

      const code = await fs.readFile(`${originalId}`, 'utf-8');
      const magicString = new MagicString(code);
      if (process.env.RENAME_POLARIS_STYLES) {
        magicString.replace(/Polaris-/g, 'New-Polaris-');
      }

      return { code: magicString.toString() };
    },
  };
}
