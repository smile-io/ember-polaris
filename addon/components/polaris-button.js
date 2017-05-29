import Ember from 'ember';
import layout from '../templates/components/polaris-button';

const {
  Component,
  RSVP: {
    resolve
  }
} = Ember;

/**
 * Polaris button component.
 * See https://polaris.shopify.com/components/actions/button
 */
export default Component.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  classNames: ['Polaris-Button'],

  layout,

  type: 'button',

  /**
   * children
   * string
   * The content to display inside the button.
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
  onClick: resolve,

  /**
   * onFocus
   * function
   * Callback when button becomes focussed
   */
  onFocus: resolve,

  /**
   * onBlur
   * function
   * Callback when focus leaves button
   */
  onBlur: resolve,
});
