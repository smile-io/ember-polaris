import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-empty-search-result';

@tagName('')
@templateLayout(layout)
export default class PolarisEmptySearchResult extends Component {
  /**
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  description = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  withIllustration = false;
}
