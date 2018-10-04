/* jshint node:true */

// For details on each option run `ember help release`
module.exports = {
  local: false,
  remote: 'origin',
  annotation: 'Release %@',
  message: 'Bumped version to %@',
  manifest: ['package.json'],
  // Don't publish to npm
  publish: false,
  strategy: 'semver',
};
