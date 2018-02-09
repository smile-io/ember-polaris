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
   * If the source doesn't have a slash in the name, it will look for Polaris
   * icons in the namespace specified by `sourcePath` property.
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
  showPlaceholder: equal('source', 'placeholder').readOnly(),

  colorClass: computed('color', function() {
    const color = this.get('color');

    if (isEmpty(color)) {
      return null;
    }

    return `Polaris-Icon--color${classify(color)}`;
  }).readOnly(),

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
