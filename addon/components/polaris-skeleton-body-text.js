import Component from '@ember/component';
import { computed } from '@ember/object';
import { classNames, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-skeleton-body-text';

const defaultLines = 3;

@classNames('Polaris-SkeletonBodyText__SkeletonBodyTextContainer')
@layout(template)
export default class PolarisSkeletonBodyTextComponent extends Component {
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
    let lines = parseInt(this.get('lines'));
    if (isNaN(lines)) {
      lines = defaultLines;
    }

    return new Array(Math.max(lines, 0));
  }
}
