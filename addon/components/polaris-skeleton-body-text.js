import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/polaris-skeleton-body-text';

const defaultLines = 3;

export default Component.extend({
  classNames: ['Polaris-SkeletonBodyText__SkeletonBodyTextContainer'],

  layout,

  /**
   * Number of lines to display
   *
   * @property lines
   * @public
   * @type {Number}
   * @default 3
   */
  lines: defaultLines,

  /**
   * Array to iterate over in template
   *
   * @property linesArray
   * @private
   * @type {Array}
   */
  linesArray: computed('lines', function() {
    let lines = parseInt(this.get('lines'));
    if (isNaN(lines)) {
      lines = defaultLines;
    }

    return new Array(Math.max(lines, 0));
  }).readOnly(),
});
