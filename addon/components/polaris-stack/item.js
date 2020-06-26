import Component from '@ember/component';
import { computed } from '@ember/object';
import { deprecate } from '@ember/application/deprecations';
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

  @computed('fill', 'class')
  get classes() {
    let classNames = ['Polaris-Stack__Item'];
    if (this.fill) {
      classNames.push('Polaris-Stack__Item--fill');
    }
    if (this.class) {
      classNames.push(this.class);
    }

    return classNames.join(' ');
  }

  init() {
    super.init(...arguments);

    deprecate(
      `[polaris-stack/item] Passing 'class' is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.class,
      {
        id: 'ember-polaris.polaris-stack-item.class-arg',
        until: '7.0.0',
      }
    );
  }
}
