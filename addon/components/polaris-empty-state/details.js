import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-empty-state/details';

@tagName('')
@templateLayout(layout)
export default class PolarisEmptyStateDetails extends Component {}
