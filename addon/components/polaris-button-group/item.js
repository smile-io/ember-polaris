import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-button-group/item';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@layout(template)
export default class PolarisButtonGroupItem extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * Elements to display inside group item
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * Use a plain style for the group item
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  plain = false;

  /**
   * Whether the group item is focused
   *
   * @type {Boolean}
   * @default false
   */
  focused = false;

  @computed('plain', 'focused', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-ButtonGroup__Item'];
    if (this.plain) {
      cssClasses.push('Polaris-ButtonGroup__Item--plain');
    }
    if (this.focused) {
      cssClasses.push('Polaris-ButtonGroup__Item--focused');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }

  @action
  handleFocus() {
    this.set('focused', true);
  }

  @action
  handleBlur() {
    this.set('focused', false);
  }
}
