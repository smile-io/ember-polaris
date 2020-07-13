import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-resource-list/loading-overlay';

/**
 * Internal component used to DRY up rendering resource list loading state.
 */
@tagName('')
@templateLayout(layout)
export default class PolarisResourceListLoadingOverlay extends Component {
  loading = false;
  spinnerStyle = null;
  spinnerSize = null;
}
