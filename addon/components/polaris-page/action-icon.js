import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-page/action-icon';

@tagName('')
@layout(template)
export default class ActionIconComponent extends Component {
  /**
   * The icon to display
   *
   * @type {String}
   * @default null
   */
  icon = null;
}
