import { classNames, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
import layout from '../../../templates/components/polaris-page/header/action-group';

@classNames('Polaris-Header-ActionGroup')
@templateLayout(layout)
export default class ActionGroup extends Component {
  title = null;
  icon = null;
  groupActions = null;
  details = null;
}
