import Ember from 'ember';
import mapEventToAction from '../../utils/map-event-to-action';

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
  click: mapEventToAction('onClick'),
  focusIn: mapEventToAction('onFocus'),
  focusOut: mapEventToAction('onBlur'),
});
