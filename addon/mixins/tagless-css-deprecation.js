import Mixin from '@ember/object/mixin';
import { deprecate } from '@ember/application/deprecations';
import { dasherize } from '@ember/string';

// eslint-disable-next-line ember/no-new-mixins
export default Mixin.create({
  init() {
    this._super(...arguments);

    let componentName = this.constructor?.name;
    deprecate(
      `[${componentName}] Passing 'class' argument is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.class,
      {
        id: `ember-polaris.${dasherize(componentName)}.class-arg`,
        until: '7.0.0',
      }
    );
  },
});
