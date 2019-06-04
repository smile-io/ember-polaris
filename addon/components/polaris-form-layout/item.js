import { classNames, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-form-layout/item';

@classNames('Polaris-FormLayout__Item')
@templateLayout(layout)
export default class Item extends Component {
  'data-test-form-layout-item' = true;
}
