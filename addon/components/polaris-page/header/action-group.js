import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../../templates/components/polaris-page/header/action-group';
import deprecateClassArgument from '../../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisPageHeaderActionGroup extends Component {
  title = null;
  icon = null;
  groupActions = null;
  details = null;
}
