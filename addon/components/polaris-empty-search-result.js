import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/polaris-empty-search-result';

@tagName('')
@templateLayout(layout)
export default class PolarisEmptySearchResult extends Component {
  /**
   * @type {String}
   * @default null
   * @property title
   * @public
   */
  title = null;

  /**
   * @type {String}
   * @default null
   * @property description
   * @public
   */
  description = null;

  /**
   * @type {Boolean}
   * @default false
   * @property withIllustration
   * @public
   */
  withIllustration = false;
}
