import Component from '@ember/component';
import {
  classNames,
  classNameBindings,
  layout as templateLayout,
} from '@ember-decorators/component';
import layout from '../../templates/components/polaris-layout/section';

@classNames('Polaris-Layout__Section')
@classNameBindings(
  'secondary:Polaris-Layout__Section--secondary',
  'fullWidth:Polaris-Layout__Section--fullWidth',
  'oneHalf:Polaris-Layout__Section--oneHalf',
  'oneThird:Polaris-Layout__Section--oneThird'
)
@templateLayout(layout)
export default class Section extends Component {
  text = null;
  secondary = false;
  fullWidth = false;
  oneHalf = false;
  oneThird = false;
}
