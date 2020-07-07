import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../../templates/components/polaris-page/header/rollup';

@tagName('')
@layout(template)
export default class PolarisPageHeaderRollup extends Component {
  hasRollup = null;
  secondaryActions = null;
  actionGroupSections = null;
}
