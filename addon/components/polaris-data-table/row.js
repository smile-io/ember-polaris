import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-data-table/row';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@templateLayout(layout)
export default class Row extends Component.extend(TaglessCssDeprecation) {
  /**
   * @type {Array}
   * @public
   */
  row = null;

  /**
   * @type {Number}
   * @public
   */
  index = null;

  /**
   * @type {Number[]}
   * @public
   */
  totals = null;

  /**
   * @type {Number[]}
   * @public
   */
  heights = null;

  /**
   * @type {String|Number|Component}
   * @public
   */
  footerContent = null;

  /**
   * @type {String[]}
   * @public
   */
  contentTypes = null;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  truncate = false;

  /**
   * @type {Number[]}
   */
  @(computed('totals.[]', 'heights.[]', 'footerContent').readOnly())
  get bodyCellHeights() {
    let { totals, heights, footerContent } = this;

    let bodyCellHeights = isPresent(totals)
      ? heights.slice(2)
      : heights.slice(1);

    if (footerContent) {
      bodyCellHeights.pop();
    }

    return bodyCellHeights;
  }
}
