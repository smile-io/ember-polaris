import Component from '@ember/component';
import { classNames, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-card/section-header';

@classNames('Polaris-Card__SectionHeader')
@layout(template)
export default class CardSectionHeaderComponent extends Component {
  /**
   * Title for the section
   *
   * @property title
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
   * @property text
   * @type {String}
   * @default: null
   * @public
   */
  text = null;
}
