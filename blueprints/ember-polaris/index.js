/* eslint-env node */
module.exports = {
  description: ''

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(options) {
    var _this = this;
    return this.addPackagesToProject([
      { name: 'ember-cli-sass', target: 'latest' }
    ]);
  }
  }
};
