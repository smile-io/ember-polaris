/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified when running `ember g ember-polaris`
    // (since that doesn't actually matter to us)
  },

  afterInstall: function(/* options */) {
    return this.addPackagesToProject([
      { name: 'ember-cli-sass', target: 'latest' }
    ]);
  }
};
