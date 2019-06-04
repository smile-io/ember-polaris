import { tagName, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
import layout from '../../../templates/components/polaris-page/header/rollup';

@tagName('')
@templateLayout(layout)
export default class Rollup extends Component {
  hasRollup = null;
  secondaryActions = null;
  actionGroupSections = null;
}
