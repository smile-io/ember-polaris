import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-form-layout/item';

@tagName('')
@templateLayout(layout)
export default class PolarisFormLayoutItem extends Component {}
