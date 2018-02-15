import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-text-container';

const allowedSpacings = [
  'tight',
  'loose'
];

/**
 * Undocumented Polaris text container component.
 */
export default Component.extend({
  classNames: ['Polaris-TextContainer'],
  classNameBindings: ['spacingClass'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The text to display.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {string}
   * @default null
   */
  text: null,

  /**
   * The amount of vertical spacing children will get between them.
   *
   * @property spacing
   * @type {string}
   * @default null
   */
  spacing: null,

  /*
   * Internal properties.
   */
  spacingClass: computed('spacing', function() {
    let spacing = this.get('spacing');
    if (allowedSpacings.indexOf(spacing) > -1) {
      return `Polaris-TextContainer--spacing${ classify(spacing) }`;
    }

    return null;
  }).readOnly(),
});
