import Ember from 'ember';
import layout from '../templates/components/polaris-icon';

const {
  Component,
  computed,
  isEmpty,
  String: EmberString,
} = Ember;

const {
  classify,
} = EmberString;

// TODO: look into importing icons properly.
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Icon'],
  classNameBindings: [
    'colorClass',
    'backdrop:Polaris-Icon--hasBackdrop'
  ],
  attributeBindings: [
    'accessibilityLabel:aria-label',
  ],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The SVG contents to display in the icon
   *
   * @property source
   * @type {string}
   * @default null
   */
  source: null,

  /**
   * Sets the color for the SVG fill
   *
   * @property color
   * @type {string}
   * @default null
   */
  color: null,

  /**
   * Show a backdrop behind the icon
   *
   * @property backdrop
   * @type {boolean}
   * @default false
   */
  backdrop: false,

  /**
   * Descriptive text to be read to screenreaders
   *
   * @property accessibilityLabel
   * @type {string}
   * @default null
   */
  accessibilityLabel: null,

  /*
   * Internal properties.
   */
  colorClass: computed('color', function() {
    const color = this.get('color');

    if (isEmpty(color)) {
      return null;
    }

    return `Polaris-Icon--color${classify(color)}`;
  }).readOnly(),

  /*
   * Lifecycle hooks.
   */
  didInsertElement() {
    this._super(...arguments);

    // The SVG path rendered seems to have a greyish fill applied by default
    // which prevents the color attribute working. This works around that...
    this.$('path').css({
      fill: 'inherit'
    });
  }
});
