import Component from '@ember/component';
import { computed } from '@ember/object';
import { layout, tagName } from '@ember-decorators/component';
import template from '../../templates/components/polaris-stack/item';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@layout(template)
export default class StackItemComponent extends Component.extend(
  TaglessCssDeprecation
) {
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
  get cssClasses() {
    let cssClasses = ['Polaris-Stack__Item'];
    if (this.fill) {
      cssClasses.push('Polaris-Stack__Item--fill');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }
}
