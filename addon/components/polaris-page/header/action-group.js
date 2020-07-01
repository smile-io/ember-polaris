import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../../templates/components/polaris-page/header/action-group';
import TaglessCssDeprecation from '../../../mixins/tagless-css-deprecation';

@tagName('')
@layout(template)
export default class ActionGroupComponent extends Component.extend(
  TaglessCssDeprecation
) {
  title = null;
  icon = null;
  groupActions = null;
  details = null;
}
