import { className, classNames, layout as templateLayout } from "@ember-decorators/component";
import { equal } from "@ember/object/computed";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-connected/item';

@classNames('Polaris-Connected__Item')
@templateLayout(layout)
export default class Item extends Component {
  /**
   * The position of the item.
   *
   * Allowed values: 'left', 'right', or 'primary'
   *
   * @property position
   * @public
   * @type {String}
   * @default null
   */
  position = null;

  /**
   * Whether or not the item is focused.
   *
   * @property focused
   * @private
   * @type {Boolean}
   * @default false
   */
  @className("Polaris-Connected__Item--focused")
  focused = false;

  @(equal('position', 'left').readOnly())
  @className("Polaris-Connected__Item--connection")
  left;

  @(equal('position', 'right').readOnly())
  @className("Polaris-Connected__Item--connection")
  right;

  @(equal('position', 'primary').readOnly())
  @className("Polaris-Connected__Item--primary")
  primary;

  focusIn() {
    this.set('focused', true);
  }

  focusOut() {
    this.set('focused', false);
  }
}
