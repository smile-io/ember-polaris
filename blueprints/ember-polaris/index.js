/* eslint-env node */
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const rsvp = require('rsvp');
const writeFile = rsvp.denodeify(fs.writeFile);

module.exports = {
  description: '',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified when running `ember g ember-polaris`
    // (since that doesn't actually matter to us)
  },

  afterInstall(/* options */) {
    this.ui.writeLine('Adding `ember-cli-sass` to application');
    return this.addPackagesToProject([
      { name: 'ember-cli-sass', target: 'latest' }
    ]).then(() => {
      this.ui.writeLine('Adding Polaris styles to application');
      return this.addStyleImportToHostApp();
    });
  },

  addStyleImportToHostApp() {
    let importStatement = '\n@import "ember-polaris";\n';
    let stylePath = path.join('app', 'styles');
    let file = path.join(stylePath, 'app.scss');

    if (!fs.existsSync(stylePath)) {
      fs.mkdirSync(stylePath);
    }

    if (fs.existsSync(file)) {
      this.ui.writeLine(chalk.green(`Adding import statement to ${ file }`));
      return this.insertIntoFile(file, importStatement, {});
    } else {
      this.ui.writeLine(chalk.green(`Creating ${ file }`));
      return writeFile(file, importStatement);
    }
  },
};
