import Component from '@ember/component';
import { computed } from '@ember/object';
import { layout, tagName } from '@ember-decorators/component';
import template from '../../templates/components/polaris-stack/item';

@tagName('')
@layout(template)
export default class StackItemComponent extends Component {
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
  fill = false;

  @computed('fill')
  get classes() {
    let classNames = ['Polaris-Stack__Item'];
    if (this.fill) {
      classNames.push('Polaris-Stack__Item--fill');
    }

    return classNames.join(' ').trim();
  }
}
