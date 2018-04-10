/* eslint-env node */
const rsvp = require('rsvp');
const fs = require('fs-extra');
const path = require('path');
const writeFile = rsvp.denodeify(fs.writeFile);

module.exports = {
  description: '',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified when running `ember g ember-polaris`
    // (since that doesn't actually matter to us)
  },

  afterInstall(/* options */) {
    return this.addPackagesToProject([
      { name: 'ember-cli-sass', target: 'latest' }
    ]).then(() => {
      return this.addStyleImportToHostApp();
    });
  },

  addStyleImportToHostApp() {
    let importStatement = '@import "ember-polaris";\n';
    let stylePath = path.join('app', 'styles');
    let file = path.join(stylePath, 'app.scss');

    if (!fs.existsSync(stylePath)) {
      fs.mkdirSync(stylePath);
    }

    if (fs.existsSync(file)) {
      return this.insertIntoFile(file, `\n${ importStatement }`, {});
      this.ui.writeLine(chalk.green(`Added import statement to ${ file }`));
    } else {
      return writeFile(file, importStatement);
      this.ui.writeLine(chalk.green(`Created ${ file }`));
    }
  },
};
