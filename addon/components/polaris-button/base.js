import Component from '@ember/component';
import { computed } from '@ember/object';
import mapEventToAction from '../../utils/map-event-to-action';

export default Component.extend({
  classNames: ['Polaris-Button'],
  classNameBindings: [
    'primary:Polaris-Button--primary',
    'destructive:Polaris-Button--destructive',
    'disabled:Polaris-Button--disabled',
    'loading:Polaris-Button--loading',
    'outline:Polaris-Button--outline',
    'fullWidth:Polaris-Button--fullWidth',
    'plain:Polaris-Button--plain',
    'iconOnly:Polaris-Button--iconOnly',
    'sizeClass',
  ],
  attributeBindings: [
    'disabled',
    'accessibilityLabel:aria-label',
    'ariaControls:aria-controls',
    'ariaExpanded:aria-expanded',
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

  /*
   * When we have an icon and no text.
   *
   * @private
   * @property iconOnly
   * @type {Boolean}
   * @default false
   */
  iconOnly: false,

  /**
   * Action handlers.
   */
  click: mapEventToAction('onClick'),
  focusIn: mapEventToAction('onFocus'),
  focusOut: mapEventToAction('onBlur'),
});
