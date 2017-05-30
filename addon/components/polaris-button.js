import Ember from 'ember';
import layout from '../templates/components/polaris-button';

const {
  Component,
  computed,
  isNone,
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
   * children
   * string
   * The content to display inside the button
   */
  children: null,

  /**
   * url
   * string
   * URL to link to
   */
  url: null,

  /**
   * primary
   * boolean
   * Display as primary button
   */
  primary: null,

  /**
   * destructive
   * boolean
   * Display as destructive button
   */
  destructive: null,

  /**
   * disabled
   * boolean
   * Display as destructive button
   */
  disabled: null,

  /**
   * size
   * enum
   * Change the size of the button
   */
  size: null,

  /**
   * outline
   * boolean
   * Display an outlined button
   */
  outline: null,

  /**
   * fullWidth
   * boolean
   * Display full width button
   */
  fullWidth: null,

  /**
   * disclosure
   * boolean
   * Display button with a disclosure icon
   */
  //  TODO: needs polaris-icon component.
  disclosure: null,

  /**
   * submit
   * boolean
   * Button will submit a form
   */
  submit: null,

  /**
   * plain
   * boolean
   * Use plain button style
   */
  plain: null,

  /**
   * external
   * boolean
   * Force url to open in a new tab
   */
  external: null,

  /**
   * icon
   * SVG
   * Icon to display in the banner
   */
  //  TODO: implement this.
  icon: null,

  /**
   * accessibilityLabel
   * string
   * Visually hidden text for screen readers
   */
  accessibilityLabel: null,

  /**
   * onClick
   * function
   * Callback when clicked
   */
  onClick: null,

  /**
   * onFocus
   * function
   * Callback when button becomes focussed
   */
  onFocus: null,

  /**
   * onBlur
   * function
   * Callback when focus leaves button
   */
  onBlur: null,

  /**
   * Computed properties.
   */
  buttonComponentName: computed('url', function() {
    return `polaris-button/${isNone(this.get('url')) ? 'button' : 'link'}`;
  }).readOnly(),
});
