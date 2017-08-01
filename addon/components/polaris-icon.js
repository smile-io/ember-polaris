import Ember from 'ember';
import layout from '../templates/components/polaris-icon';

const {
  Component,
  computed,
  isEmpty,
  isPresent,
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

  /**
   * Path under which `ember-svg-jar` serves the Polaris SVG icons
   */
  sourcePath: 'polaris',

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

  iconSource: computed('sourcePath', 'source', function() {
    let sourcePath = this.get('sourcePath');
    sourcePath = isEmpty(sourcePath) ? '' : `${ sourcePath }/`;
    return `${ sourcePath }${ this.get('source') }`;
  }).readOnly(),

  /*
   * Lifecycle hooks.
   */
  didInsertElement() {
    this._super(...arguments);

    // Some of the Polaris SVG files have a greyish fill applied by default which
    // prevents the color attribute working. These steps work around the known issues...
    if (isPresent(this.get('color'))) {
      this.$('g').removeAttr('fill');
      this.$('path').css({
        fill: 'inherit'
      });
    }
  }
});
