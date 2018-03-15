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
   * @public
   * @type {string}
   * @default: null
   */
  inputId: null,

  /**
   * Label content for the choice
   *
   * @property label
   * @public
   * @type {string}
   * @default: null
   */
  label: null,

  /**
   * Component to render for the choice's label
   *
   * @property labelComponent
   * @public
   * @type {string | component}
   * @default null
   */
  labelComponent: null,

  /**
   * Error content for this choice
   *
   * @property error
   * @public
   * @type {string}
   * @default: null
   */
  error: null,

  /**
   * Flag to hide the label for this choice
   *
   * @property labelHidden
   * @public
   * @type {boolean}
   * @default: false
   */
  labelHidden: false,

  /**
   * Help text for this choice
   *
   * @property helpText
   * @public
   * @type {string}
   * @default: null
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
