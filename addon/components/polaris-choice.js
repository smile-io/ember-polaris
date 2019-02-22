import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import layout from '../templates/components/polaris-choice';

/**
 * Polaris choice component.
 * Wrapper for checkbox and radiobutton components.
 */
export default Component.extend({
  // Tagless component since sometimes we need to wrap the label in a div.
  tagName: '',

  layout,

  /**
   * ID of the choice's input
   *
   * @property inputId
   * @type {String}
   * @default: null
   * @public
   */
  inputId: null,

  /**
   * Label content for the choice
   *
   * @property label
   * @type {String|Component}
   * @default: null
   * @public
   */
  label: null,

  /**
   * Component to render for the choice's label
   *
   * DEPRECATED: pass the component as `label` instead.
   *
   * @property labelComponent
   * @type {String | Component}
   * @default null
   * @public
   */
  labelComponent: null,

  /**
   * Whether the associated form control is disabled
   *
   * @property disabled
   * @type {Boolean}
   * @default: null
   * @public
   */
  disabled: null,

  /**
   * Error content for this choice
   *
   * @property error
   * @type {String|Boolean}
   * @default: null
   * @public
   */
  error: null,

  /**
   * Flag to hide the label for this choice
   *
   * @property labelHidden
   * @type {boolean}
   * @default: false
   * @public
   */
  labelHidden: false,

  /**
   * Help text for this choice
   *
   * @property helpText
   * @type {String|Component|Object}
   * @default: null
   * @public
   */
  helpText: null,

  /**
   * @private
   */
  hasDescription: or('error', 'helpText'),

  /**
   * @private
   */
  shouldRenderError: computed('error', function() {
    let error = this.get('error');

    return error && typeof error !== 'boolean';
  }),

  /**
   * @private
   */
  helpTextId: computed('inputId', function() {
    return `${this.get('inputId')}HelpText`;
  }).readOnly(),
});
