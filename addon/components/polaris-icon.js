import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isNone, isEmpty } from '@ember/utils';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-icon';

// TODO: look into importing icons properly.
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Icon'],
  classNameBindings: [
    'colorClass',
    'isColored:Polaris-Icon--isColored',
    'backdrop:Polaris-Icon--hasBackdrop'
  ],
  attributeBindings: [
    'accessibilityLabel:aria-label',
  ],

  layout,

  /**
   * The SVG contents to display in the icon
   * If the source doesn't have a slash in the name, it will look for Polaris
   * icons in the namespace specified by `sourcePath` property.
   *
   * @property source
   * @public
   * @type {string}
   * @default null
   */
  source: null,

  /**
   * Sets the color for the SVG fill
   *
   * @property color
   * @public
   * @type {string}
   * @default null
   */
  color: null,

  /**
   * Show a backdrop behind the icon
   *
   * @property backdrop
   * @public
   * @type {boolean}
   * @default false
   */
  backdrop: false,

  /**
   * Descriptive text to be read to screenreaders
   *
   * @property accessibilityLabel
   * @public
   * @type {string}
   * @default null
   */
  accessibilityLabel: null,

  /**
   * Path under which `ember-svg-jar` serves the Polaris SVG icons
   *
   * @property sourcePath
   * @public
   * @type {string}
   * @default 'polaris'
   */
  sourcePath: 'polaris',

  /**
   * Whether the component should leave space for an icon
   *
   * @property showPlaceholder
   * @private
   * @type {boolean}
   */
  showPlaceholder: equal('source', 'placeholder').readOnly(),

  /**
   * Class to apply to color the icon
   *
   * @property colorClass
   * @private
   * @type {string}
   */
  colorClass: computed('color', function() {
    let color = this.get('color');

    if (isEmpty(color)) {
      return null;
    }

    return `Polaris-Icon--color${classify(color)}`;
  }).readOnly(),

  /**
   * Whether a color has been specified for the icon
   *
   * @property isColored
   * @private
   * @type {boolean}
   */
  isColored: computed('color', function() {
    let color = this.get('color');

    if (isEmpty(color)) {
      return false;
    }

    return color !== 'white';
  }).readOnly(),

  /**
   * Final source for the icon SVG
   *
   * @property iconSource
   * @private
   * @type {string}
   */
  iconSource: computed('sourcePath', 'source', function() {
    let source = this.get('source');
    source = source.indexOf('/') === -1 ? `${ this.get('sourcePath') }/${ source }` : source;

    return source;
  }).readOnly(),

  removeSvgFills(elem) {
    if (isNone(elem)) {
      return;
    }

    if (!elem.hasChildNodes) {
        return;
    }

    let children = elem.childNodes;
    for (let i = 0, len = children.length; i < len; i++) {
      let child = children[i];
      if (child.tagName === 'g') {
        child.removeAttribute('fill');
        this.removeSvgFills(child);
      } else {
        let fill = child.getAttribute('fill');
        // This is what Shopify does too in @shopify/images/icon-loader.js
        let newFill = fill && fill.indexOf('#FFF') !== -1 ? 'currentColor' : '';
        child.setAttribute('fill', newFill);
      }
    }
  },

  /*
   * Lifecycle hooks.
   */
  didInsertElement() {
    this._super(...arguments);
    this.removeSvgFills(this.$('svg')[0]);
  }
});
