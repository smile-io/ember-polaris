import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import { Addon } from '@embroider/addon-dev/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { externals } from 'rollup-plugin-node-externals';
import replace from '@rollup/plugin-replace';

import { styles } from './config/rollup/plugin-styles.js';
import { generateScopedName } from './config/rollup/namespaced-classname.mjs';
import postcssPlugins from './config/postcss-plugins.js';
import { SHOPIFY_POLARIS_VERSION } from './config/constants.mjs';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

// Add extensions here, such as ts, gjs, etc that you may import
const extensions = ['.js', '.ts', '.gjs', '.gts', '.hbs'];

console.log(`\nSHOPIFY_POLARIS_VERSION: ${SHOPIFY_POLARIS_VERSION}\n`);

export default {
  input: './src/index.ts',

  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),
  plugins: [
    externals({ deps: true, packagePath: './package.json' }),

    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    // By default all your JavaScript modules (**/*.js) will be importable.
    // But you are encouraged to tweak this to only cover the modules that make
    // up your addon's public API. Also make sure your package.json#exports
    // is aligned to the config here.
    // See https://github.com/embroider-build/embroider/blob/main/docs/v2-faq.md#how-can-i-define-the-public-exports-of-my-addon
    addon.publicEntrypoints(['**/*.js', 'index.js', 'template-registry.js']),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports([
      'components/**/*.js',
      'helpers/**/*.js',
      'modifiers/**/*.js',
      'services/**/*.js',
    ]),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    nodeResolve({ extensions }),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    //
    // By default, this will load the actual babel config from the file
    // babel.config.json.
    babel({
      extensions,
      babelHelpers: 'bundled',
    }),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // Ensure that .gjs files are properly integrated as Javascript
    addon.gjs(),

    replace({
      '{{POLARIS_VERSION}}': SHOPIFY_POLARIS_VERSION,
      delimiters: ['', ''],
      preventAssignment: true,
    }),

    styles({
      mode: 'esnext',
      modules: {
        // We're not using hash in production as Shopify
        generateScopedName: generateScopedName({ includeHash: false }),
        globalModulePaths: [/global\.css$/],
      },
      plugins: postcssPlugins,
    }),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    // NOTE we explicitly comment this out from the official embroider blueprint
    // to ensure we process the css files as Shopify does
    // addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),

    // Copy Readme and License into published package
    copy({
      targets: [
        { src: '../../README.md', dest: '.' },
        { src: '../../LICENSE.md', dest: '.' },
      ],
    }),
  ],
};
