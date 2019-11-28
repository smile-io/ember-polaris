import Component from '@ember/component';
import {
  classNames,
  classNameBindings,
  layout,
} from '@ember-decorators/component';
import template from '../../templates/components/polaris-button-group/item';

@classNames('Polaris-ButtonGroup__Item')
@classNameBindings(
  'plain:Polaris-ButtonGroup__Item--plain',
  'focused:Polaris-ButtonGroup__Item--focused'
)
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

  'data-test-button-group-item' = true;

  /**
   * Events.
   */
  focusIn() {
    this.set('focused', true);
  }

  focusOut() {
    this.set('focused', false);
  }
}
