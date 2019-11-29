import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-button-group/item';

@tagName('')
@layout(template)
export default class Item extends Component {
  /**
   * Elements to display inside group item
   *
   * @type {string}
   * @default null
   * @public
   */
  text = null;

  /**
   * Use a plain style for the group item
   *
   * @type {boolean}
   * @default false
   * @public
   */
  plain = false;

  /**
   * Whether the group item is focused
   *
   * @type {boolean}
   * @default false
   * @private
   */
  focused = false;

  @action
  handleFocus() {
    this.set('focused', true);
  }

  @action
  handleBlur() {
    this.set('focused', false);
  }
}
