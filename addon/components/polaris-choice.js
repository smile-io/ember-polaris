import Ember from 'ember';
import layout from '../templates/components/polaris-choice';

const {
  Component,
  computed,
} = Ember;

const {
  or,
} = computed;

/**
 * Polaris choice component.
 * Wrapper for checkbox and radiobutton components.
 */
export default Component.extend({
  // Tagless component since sometimes we need to wrap the label in a div.
  tagName: '',

  layout,

  /*
   * Public attributes.
   */
  /**
   * ID of the choice's input
   *
   * @property inputId
   * @type {string}
   * @default: null
   */
  inputId: null,

  /**
   * Label content for the choice
   *
   * @property label
   * @type {string}
   * @default: null
   */
  label: null,

  /**
   * Error content for this choice
   *
   * @property error
   * @type {string}
   * @default: null
   */
  error: null,

  /**
   * Flag to hide the label for this choice
   *
   * @property labelHidden
   * @type {boolean}
   * @default: false
   */
  labelHidden: false,

  /**
   * Help text for this choice
   *
   * @property helpText
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
