import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-connected/item';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisConnectedItem extends Component {
  /**
   * The position of the item.
   *
   * Allowed values: 'left', 'right', or 'primary'
   *
   * @type {String}
   * @default null
   * @public
   */
  position = null;

  /**
   * Whether or not the item is focused.
   *
   * @type {Boolean}
   * @default false
   */
  focused = false;

  @equal('position', 'left')
  left;

  @equal('position', 'right')
  right;

  @equal('position', 'primary')
  primary;

  @computed('focused', 'primary', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-Connected__Item'];
    if (this.focused) {
      cssClasses.push('Polaris-Connected__Item--focused');
    }
    if (this.primary) {
      cssClasses.push('Polaris-Connected__Item--primary');
    } else {
      cssClasses.push('Polaris-Connected__Item--connection');
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
