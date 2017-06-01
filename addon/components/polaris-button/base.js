import Ember from 'ember';

const {
  Component,
  computed,
  typeOf,
 } = Ember;

export default Component.extend({
  classNames: ['Polaris-Button'],
  classNameBindings: [
    'primary:Polaris-Button--primary',
    'destructive:Polaris-Button--destructive',
    'disabled:Polaris-Button--disabled',
    'outline:Polaris-Button--outline',
    'fullWidth:Polaris-Button--fullWidth',
    'plain:Polaris-Button--plain',
    'sizeClass',
  ],
  attributeBindings: [
    'disabled',
    'accessibilityLabel:aria-label',
  ],

  /*
   * Computed properties.
   */
  sizeClass: computed('size', function() {
    switch (this.get('size')) {
      case 'slim':
        return 'Polaris-Button--sizeSlim';

      case 'large':
        return 'Polaris-Button--sizeLarge';

      default:
        return null;
    }
  }).readOnly(),

  /**
   * Action handlers.
   */
  click() {
    const handler = this.get('onClick');
    if (typeOf(handler) === 'function') {
      return handler();
    }
  },

  focusIn() {
    const handler = this.get('onFocus');
    if (typeOf(handler) === 'function') {
      return handler();
    }
  },

  focusOut() {
    const handler = this.get('onBlur');
    if (typeOf(handler) === 'function') {
      return handler();
    }
  },
});
