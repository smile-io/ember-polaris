import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-skeleton-body-text';
import deprecateClassArgument from '../utils/deprecate-class-argument';

const defaultLines = 3;

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisSkeletonBodyText extends Component {
  /**
   * Number of lines to display
   *
   * @type {Number}
   * @default 3
   * @public
   */
  lines = defaultLines;

  /**
   * Array of dummy lines to iterate over in template
   *
   * @type {Array}
   */
  @computed('lines')
  get dummyLines() {
    let lines = parseInt(this.lines);
    if (isNaN(lines)) {
      lines = defaultLines;
    }

    return new Array(Math.max(lines, 0));
  }
}
