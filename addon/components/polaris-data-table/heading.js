import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-data-table/heading';

@tagName('')
@templateLayout(layout)
export default class Heading extends Component {
  /**
   * @type {String}
   * @public
   */
  heading = null;

  /**
   * @type {Number}
   * @public
   */
  headingIndex = null;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  truncate = false;

  /**
   * @type {Number[]}
   * @public
   */
  heights = null;

  /**
   * @type {boolean[]}
   * @public
   */
  sortable = null;

  /**
   * @type {Number}
   * @public
   */
  sortedColumnIndex = null;

  /**
   * @type {String}
   * @public
   */
  sortDirection = null;

  /**
   * @type {String[]}
   * @public
   */
  contentTypes = null;

  /**
   * @type {String}
   * @public
   */
  defaultSortDirection = null;

  /**
   * @type {function}
   * @default no-op
   * @public
   */
  defaultOnSort() {}

  /**
   * @type {boolean}
   * @private
   */
  @(equal('headingIndex', 0).readOnly())
  isFixed;

  /**
   * @type {Number}
   * @private
   */
  @(computed('truncate', 'heights.[]').readOnly())
  get height() {
    return !this.truncate ? this.heights.firstObject : undefined;
  }

  /**
   * @type {String}
   * @private
   */
  @(computed('isSorted', 'sortDirection').readOnly())
  get direction() {
    return this.isSorted ? this.sortDirection : 'none';
  }
}
