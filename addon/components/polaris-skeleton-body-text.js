import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/polaris-skeleton-body-text';

const defaultLines = 3;

@classNames('Polaris-SkeletonBodyText__SkeletonBodyTextContainer')
@templateLayout(layout)
export default class PolarisSkeletonBodyText extends Component {
  /**
   * Number of lines to display
   *
   * @property lines
   * @public
   * @type {Number}
   * @default 3
   */
  lines = defaultLines;

  /**
   * Array of dummy lines to iterate over in template
   *
   * @property dummyLines
   * @private
   * @type {Array}
   */
  @(computed('lines').readOnly())
  get dummyLines() {
    let lines = parseInt(this.get('lines'));
    if (isNaN(lines)) {
      lines = defaultLines;
    }

    return new Array(Math.max(lines, 0));
  }
}
