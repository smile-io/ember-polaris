module.exports = {
  stories: [
    '../../ember-polaris/**/*.stories.js'
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  features: {
    postcss: false,
  },
  framework: "@storybook/ember",
  core: {
    builder: "webpack5",
    disableTelemetry: true,
  },
  staticDirs: ['../dist'],
};
