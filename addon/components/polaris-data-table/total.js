import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-data-table/total';

@tagName('')
@templateLayout(layout)
export default class Total extends Component {
  /**
   * @type {String|Number|Component}
   * @public
   */
  total = null;

  /**
   * @type {Number}
   * @public
   */
  index = null;

  /**
   * @type {Number[]}
   * @public
   */
  heights = null;

  /**
   * @type {boolean}
   * @default false
   * @public
   */
  truncate = false;

  /**
   * @type {String}
   * @public
   */
  totalsRowHeading = null;

  @computed('total', 'index')
  get contentType() {
    let { total, index } = this;

    if (total !== '' && index > 0) {
      return 'numeric';
    }

    return null;
  }
}
