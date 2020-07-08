import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-page/action-icon';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisPageActionIcon extends Component {
  /**
   * The icon to display
   *
   * @type {String}
   * @default null
   */
  icon = null;
}
