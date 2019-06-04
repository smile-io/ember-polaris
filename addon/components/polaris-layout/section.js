import { className, classNames, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-layout/section';

@classNames('Polaris-Layout__Section')
@templateLayout(layout)
export default class Section extends Component {
  text = null;

  @className("Polaris-Layout__Section--secondary")
  secondary = false;

  @className("Polaris-Layout__Section--fullWidth")
  fullWidth = false;

  @className("Polaris-Layout__Section--oneHalf")
  oneHalf = false;

  @className("Polaris-Layout__Section--oneThird")
  oneThird = false;
}
