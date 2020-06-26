import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-card/section-header';

@tagName('')
@layout(template)
export default class CardSectionHeaderComponent extends Component {
  /**
   * Title for the section
   *
   * @type {String|Component}
   * @default: null
   * @public
   */
  title = null;

  /**
   * Inner content of the section
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default: null
   * @public
   */
  text = null;
}
