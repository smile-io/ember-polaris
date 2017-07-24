import Ember from 'ember';
import layout from '../templates/components/polaris-button';

const {
  Component,
  computed,
  isNone,
  isBlank,
  isPresent,
} = Ember;

/**
 * Polaris button component.
 * See https://polaris.shopify.com/components/actions/button
 */
export default Component.extend({
  // Polaris react behaviour is to render an anchor element if a URL is provided,
  // or a button element otherwise. Ember components can't support dynamic tagNames,
  // so we reproduce this behaviour using a dynamic component in block form in our template.
  tagName: '',

  layout,

  /*
   * Public attributes.
   */
  /**
   * The content to display inside the button
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default null
   */
  text: null,

  /**
   * URL to link to
   *
   * @property url
   * @type {string}
   * @default null
   */
  url: null,

  /**
   * Display as primary button
   *
   * @property primary
   * @type {boolean}
   * @default false
   */
  primary: false,

  /**
   * Display as destructive button
   *
   * @property destructive
   * @type {boolean}
   * @default false
   */
  destructive: false,

  /**
   * Disable button
   *
   * @property disabled
   * @type {boolean}
   * @default false
   */
  disabled: false,

  /**
   * Change the size of the button
   *
   * @property size
   * @type {enum}
   * @default null
   */
  size: null,

  /**
   * Display an outlined button
   *
   * @property outline
   * @type {boolean}
   * @default false
   */
  outline: false,

  /**
   * Display full width button
   *
   * @property fullWidth
   * @type {boolean}
   * @default false
   */
  fullWidth: false,

  /**
   * Display button with a disclosure icon (`caret-down`)
   *
   * @property disclosure
   * @type {boolean}
   * @default false
   */
  disclosure: false,

  /**
   * Button will submit a form
   *
   * @property submit
   * @type {boolean}
   * @default false
   */
  submit: false,

  /**
   * Use plain button style
   *
   * @property plain
   * @type {boolean}
   * @default false
   */
  plain: false,

  /**
   * Force url to open in a new tab
   *
   * @property external
   * @type {boolean}
   * @default false
   */
  external: false,

  /**
   * Icon to display in the banner
   *
   * @property icon
   * @type {SVG}
   * @default null
   */
  icon: null,

  /**
   * Visually hidden text for screen readers
   *
   * @property accessibilityLabel
   * @type {string}
   * @default null
   */
  accessibilityLabel: null,

  /**
   * Callback when clicked
   *
   * @property onClick
   * @type {function}
   * @default null
   */
  onClick: null,

  /**
   * Callback when button becomes focussed
   *
   * @property onFocus
   * @type {function}
   * @default null
   */
  onFocus: null,

  /**
   * Callback when focus leaves button
   *
   * @property onBlur
   * @type {function}
   * @default null
   */
  onBlur: null,

  /**
   * Computed properties.
   */
  buttonComponentName: computed('url', function() {
    // TODO: refactor to use polaris-unstyled-link here
    const buttonType = isNone(this.get('url')) ? 'button' : 'link';
    return `polaris-button/${buttonType}`;
  }).readOnly(),

  iconOnly: computed('icon', 'text', function() {
    return isBlank(this.get('text')) && isPresent(this.get('icon'));
  }).readOnly(),
});
