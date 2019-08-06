import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-text-field/spinner';

@tagName('')
@layout(template)
export default class SpinnerComponent extends Component {
  /**
   * Called when the up/down icons are clicked
   *
   * @property onChange
   * @public
   * @type {Function}
   * @default noop
   */
  onChange /* number */() {}

  /**
   * Additional callback when any icon in the component is clicked
   *
   * @property onClick
   * @public
   * @type {Function}
   * @default noop
   */
  onClick() {}

  onMouseDown /* onChange */() {}
  onMouseUp() {}

  @action
  handleMouseDown(onChange, event) {
    if (event.button !== 0) {
      return;
    }
    this.onMouseDown(onChange);
  }
}
