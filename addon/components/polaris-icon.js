import Ember from 'ember';
import layout from '../templates/components/polaris-icon';

const {
  Component,
  computed,
} = Ember;

export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Icon'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The SVG contents to display in the icon
   *
   * @property source
   * @type SVGSource
   * @default null
   */
  source: null,

  /**
   * Sets the color for the SVG fill
   *
   * @property color
   * @type Color
   * @default null
   * TODO: not implemented
   */
  color: null,

  /**
   * Show a backdrop behind the icon
   *
   * @property backdrop
   * @type boolean
   * @default null
   * TODO: not implemented
   */
  backdrop: null,

  /**
   * Descriptive text to be read to screenreaders
   *
   * @property accessibilityLabel
   * @type string
   * @default null
   * TODO: not implemented
   */
  accessibilityLabel: null,

  /*
   * Internal properties.
   */
  iconSource: computed('source', function() {
    return `ember-polaris/icons/${this.get('source')}.svg`;
  }),
});
