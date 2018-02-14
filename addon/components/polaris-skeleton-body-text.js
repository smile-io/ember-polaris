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
   * Array of dummy lines to iterate over in template
   *
   * @property dummyLines
   * @private
   * @type {Array}
   */
  dummyLines: computed('lines', function() {
    let lines = parseInt(this.get('lines'));
    if (isNaN(lines)) {
      lines = defaultLines;
    }

    return new Array(Math.max(lines, 0));
  }).readOnly(),
});
