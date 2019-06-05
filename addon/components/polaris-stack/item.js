import {
  className,
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-stack/item';

@classNames('Polaris-Stack__Item')
@templateLayout(layout)
export default class Item extends Component {
  /**
   * Elements to display inside stack item
   *
   * @property text
   * @type {string}
   * @default null
   * @public
   */
  text = null;

  /**
   * Fill the width of the stack
   *
   * @property fill
   * @type {boolean}
   * @default false
   * @public
   */
  @className('Polaris-Stack__Item--fill')
  fill = false;

  'data-test-stack-item' = true;
}
