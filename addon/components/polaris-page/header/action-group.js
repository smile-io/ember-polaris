import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../../templates/components/polaris-page/header/action-group';

@tagName('')
@layout(template)
export default class ActionGroupComponent extends Component {
  title = null;
  icon = null;
  groupActions = null;
  details = null;
}
