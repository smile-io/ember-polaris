module.exports = {
  stories: [
    '../stories/**/*.stories.js'
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  features: {
    postcss: false,
  },
  framework: "@storybook/ember",
  core: {
    builder: "webpack5",
  },
  staticDirs: ['../dist'],
};
