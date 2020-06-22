import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-connected/item';

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

  @computed('focused', 'primary')
  get classes() {
    let classes = ['Polaris-Connected__Item'];
    if (this.focused) {
      classes.push('Polaris-Connected__Item--focused');
    }
    if (this.primary) {
      classes.push('Polaris-Connected__Item--primary');
    } else {
      classes.push('Polaris-Connected__Item--connection');
    }

    return classes.join(' ');
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
