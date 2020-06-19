import Component from '@ember/component';
import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import layout from '../../templates/components/polaris-form-layout/item';

@classNames('Polaris-FormLayout__Item')
@templateLayout(layout)
export default class PolarisFormLayoutItem extends Component {
  'data-test-form-layout-item' = true;
}
