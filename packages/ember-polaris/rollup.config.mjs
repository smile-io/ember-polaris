import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import alias from '@rollup/plugin-alias';
import { Addon } from '@embroider/addon-dev/rollup';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { glimmerTemplateTag } from 'rollup-plugin-glimmer-template-tag';
import colocatePolarisStyles from './config/rollup/rollup-colocate-polaris-styles.mjs';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

// Add extensions here, such as ts, gjs, etc that you may import
const extensions = ['.js', '.ts', '.gjs', '.gts', '.hbs'];

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // Copy Polaris styles into our project.
    // Temporarily renaming all classes from using `Polaris-` prefix -> `New-Polaris-`.
    // TODO
    // make this renaming optional
    // remove following 2 lines from the main styles that conflict with existing version of the library (is there a better way to use them in parallel?!?)
    // - html, body { font-size: var(--p-font-size-100); line-height: var(--p-font-line-height-2); font-weight: var(--p-font-weight-regular); letter-spacing: initial; font-weight: var(--p-font-weight-regular); color: var(--p-color-text); }
    // html { position: relative; font-size: 100%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; text-rendering: optimizeLegibility; }
    copy({
      targets: [
        {
          src: './node_modules/@shopify/polaris/build/esm/styles.css',
          dest: './assets',
          transform: (contents /* , filename */) => {
            contents = contents.toString();
            if (process.env.RENAME_POLARIS_STYLES) {
              contents = contents.replace(/\.Polaris-/g, '.New-Polaris-');
            }
            if (process.env.SKIP_GLOBAL_STYLES) {
              contents = contents
                .replace(
                  'html { position: relative; font-size: 100%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; text-rendering: optimizeLegibility; }',
                  '',
                )
                .replace(
                  'html, body { font-size: var(--p-font-size-100); line-height: var(--p-font-line-height-2); font-weight: var(--p-font-weight-regular); letter-spacing: initial; font-weight: var(--p-font-weight-regular); color: var(--p-color-text); }',
                  '',
                );
            }

            return contents;
          },
        },
      ],
    }),
    colocatePolarisStyles(),

    alias({
      entries: [
        {
          find: '@shopify/polaris',
          replacement: path.resolve(
            'node_modules',
            '@shopify/polaris/build/esm',
          ),
        },
      ],
    }),

    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints([
      'components/**/*.js',
      'index.js',
      'template-registry.js',
    ]),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(['components/**/*.js']),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    glimmerTemplateTag(),
    nodeResolve({ extensions }),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    //
    // By default, this will load the actual babel config from the file
    // babel.config.json.
    babel({
      extensions,
      babelHelpers: 'inline',
    }),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // Ensure that .gjs files are properly integrated as Javascript
    // addon.gjs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),

    // Copy Readme and License into published package
    copy({
      targets: [
        { src: '../README.md', dest: '.' },
        { src: '../LICENSE.md', dest: '.' },
        // {
        //   src: './node_modules/@shopify/polaris/build/esm/styles.css',
        //   dest: './assets',
        // },
      ],
    }),
  ],
};
