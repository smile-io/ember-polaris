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
   * @type {String}
   * @default: null
   * @public
   */
  label: null,

  /**
   * Component to render for the choice's label
   *
   * @property labelComponent
   * @type {String | Component}
   * @default null
   * @public
   */
  labelComponent: null,

  /**
   * Error content for this choice
   *
   * @property error
   * @type {String}
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
   * @type {String}
   * @default: null
   * @public
   */
  helpText: null,

  /*
   * Internal properties.
   */
  hasDescription: or('error', 'helpText'),

  errorId: computed('inputId', function() {
    return `${ this.get('inputId') }Error`;
  }).readOnly(),

  helpTextId: computed('inputId', function() {
    return `${ this.get('inputId') }HelpText`;
  }).readOnly(),
});
