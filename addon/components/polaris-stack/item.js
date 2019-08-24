import Component from '@ember/component';
import { className, classNames, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-stack/item';

@classNames('Polaris-Stack__Item')
@layout(template)
export default class ItemComponent extends Component {
  /**
   * Elements to display inside stack item
   *
   * @type {string}
   * @default null
   * @public
   */
  text = null;

  /**
   * Fill the width of the stack
   *
   * @type {boolean}
   * @default false
   * @public
   */
  @className('Polaris-Stack__Item--fill')
  fill = false;

  'data-test-stack-item' = true;
}
