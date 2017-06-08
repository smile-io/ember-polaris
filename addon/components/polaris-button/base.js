import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';

const {
  Component,
  computed,
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
    invokeAction(this, 'onClick');
  },

  focusIn() {
    invokeAction(this, 'onFocus');
  },

  focusOut() {
    invokeAction(this, 'onBlur');
  },
});
