import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import layout from '../../templates/components/polaris-page/action';
import { handleMouseUpByBlurring } from '../../utils/focus';
import mapEventToAction from '../../utils/map-event-to-action';

export default Component.extend({
  tagName: 'button',

  attributeBindings: ['type', 'disabled', 'accessibilityLabel:aria-label'],

  classNames: ['Polaris-Header-Action'],
  classNameBindings: [
    'disabled:Polaris-Header-Action--disabled',
    'isIconOnly:Polaris-Header-Action--iconOnly',
  ],

  layout,

  /**
   * @property text
   * @type {String}
   * @default null
   * @public
   */
  text: null,

  /**
   * @property disclosure
   * @type {Boolean}
   * @default false
   * @public
   */
  disclosure: false,

  /**
   * @property url
   * @type {String}
   * @default null
   * @public
   * TODO: not implemented
   */
  url: null,

  /**
   * @property external
   * @type {Boolean}
   * @default false
   * @public
   * TODO: not implemented
   */
  external: false,

  /**
   * @property icon
   * @type {String}
   * @default null
   * @public
   */
  icon: null,

  /**
   * @property accessibilityLabel
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel: null,

  /**
   * @property disabled
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled: false,

  /**
   * @property onAction
   * @type {Function}
   * @default noop
   * @public
   */
  onAction() {},

  type: 'button',

  mouseUp: handleMouseUpByBlurring,
  click: mapEventToAction('onAction'),

  isIconOnly: computed('text', 'icon', function() {
    return this.get('icon') && isBlank(this.get('text'));
  }).readOnly(),
});
