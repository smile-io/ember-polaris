import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-page/action-icon';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@layout(template)
export default class ActionIconComponent extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * The icon to display
   *
   * @type {String}
   * @default null
   */
  icon = null;
}
