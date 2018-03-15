import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { isPresent, isBlank, isNone } from '@ember/utils';
import { handleMouseUpByBlurring } from '../utils/focus';
import layout from '../templates/components/polaris-button';

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

  /**
   * The content to display inside the button
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @public
   * @type {String}
   * @default null
   */
  text: null,

  /**
   * URL to link to
   *
   * @property url
   * @public
   * @type {string}
   * @default null
   */
  url: null,

  /**
   * Display as primary button
   *
   * @property primary
   * @public
   * @type {boolean}
   * @default false
   */
  primary: false,

  /**
   * Display as destructive button
   *
   * @property destructive
   * @public
   * @type {boolean}
   * @default false
   */
  destructive: false,

  /**
   * Disable button
   *
   * @property disabled
   * @public
   * @type {boolean}
   * @default false
   */
  disabled: false,

  /**
   * 	Replaces button text with a spinner while a background action is being performed
   *
   * @property loading
   * @public
   * @type {boolean}
   * @default false
   */
  loading: false,

  /**
   * Change the size of the button
   *
   * @property size
   * @public
   * @type {enum}
   * @default null
   */
  size: null,

  /**
   * Display an outlined button
   *
   * @property outline
   * @public
   * @type {boolean}
   * @default false
   */
  outline: false,

  /**
   * Display full width button
   *
   * @property fullWidth
   * @public
   * @type {boolean}
   * @default false
   */
  fullWidth: false,

  /**
   * Display button with a disclosure icon
   *
   * @property disclosure
   * @public
   * @type {boolean}
   * @default false
   */
  disclosure: false,

  /**
   * Button will submit a form
   *
   * @property submit
   * @public
   * @type {boolean}
   * @default false
   */
  submit: false,

  /**
   * Use plain button style
   *
   * @property plain
   * @public
   * @type {boolean}
   * @default false
   */
  plain: false,

  /**
   * Force url to open in a new tab
   *
   * @property external
   * @public
   * @type {boolean}
   * @default false
   */
  external: false,

  /**
   * Icon to display to the left of the button content
   *
   * @property icon
   * @public
   * @type {SVG}
   * @default null
   */
  icon: null,

  /**
   * Visually hidden text for screen readers
   *
   * @property accessibilityLabel
   * @public
   * @type {string}
   * @default null
   */
  accessibilityLabel: null,

  /**
   * ID of the element this button reveals
   *
   * @property ariaControls
   * @public
   * @type {string}
   * @default null
   */
  ariaControls: null,

  /**
   * Whether the content revealed by this button is visible
   *
   * @property ariaExpanded
   * @public
   * @type {boolean|null}
   * @default null
   */
  ariaExpanded: null,

  /**
   * Callback when clicked
   *
   * @property onClick
   * @public
   * @type {function}
   * @default null
   */
  onClick: null,

  /**
   * Callback when button becomes focussed
   *
   * @property onFocus
   * @public
   * @type {function}
   * @default null
   */
  onFocus: null,

  /**
   * Callback when focus leaves button
   *
   * @property onBlur
   * @public
   * @type {function}
   * @default null
   */
  onBlur: null,

  /**
   * Computed properties.
   */
  isDisabled: or('disabled', 'loading').readOnly(),

  buttonComponentName: computed('url', function() {
    // TODO: refactor to use polaris-unstyled-link here
    const buttonType = isNone(this.get('url')) ? 'button' : 'link';
    return `polaris-button/${buttonType}`;
  }).readOnly(),

  iconOnly: computed('icon', 'text', function() {
    return isBlank(this.get('text')) && isPresent(this.get('icon'));
  }).readOnly(),

  iconSource: computed('icon', 'loading', function() {
    return this.get('loading') ? 'placeholder' : this.get('icon');
  }).readOnly(),

  disclosureIconSource: computed('loading', function() {
    return this.get('loading') ? 'placeholder' : 'caret-down';
  }).readOnly(),

  spinnerColor: computed('primary', 'destructive', function() {
    let { primary, destructive } = this.getProperties('primary', 'destructive');
    return primary || destructive ? 'white' : 'inkLightest';
  }).readOnly(),

  ariaExpandedValue: computed('ariaExpanded', function() {
    let ariaExpanded = this.get('ariaExpanded');
    return isPresent(ariaExpanded) ? ariaExpanded.toString() : null;
  }).readOnly(),

  handleMouseUpByBlurring,
});
