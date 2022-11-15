module.exports = {
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: ['../dist'],
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    {
      directory: '../../ember-polaris/',
      titlePrefix: 'All components',
      files: '**/*.stories.ts',
    },
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/ember',
};
