import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-layout/section';

@tagName('')
@templateLayout(layout)
export default class PolarisLayoutSection extends Component {
  text = null;
  secondary = false;
  fullWidth = false;
  oneHalf = false;
  oneThird = false;

  @computed('secondary', 'fullWidth', 'oneHalf', 'oneThird')
  get classes() {
    let classes = ['Polaris-Layout__Section'];
    if (this.secondary) {
      classes.push('Polaris-Layout__Section--secondary');
    }
    if (this.fullWidth) {
      classes.push('Polaris-Layout__Section--fullWidth');
    }
    if (this.oneHalf) {
      classes.push('Polaris-Layout__Section--oneHalf');
    }
    if (this.oneThird) {
      classes.push('Polaris-Layout__Section--oneThird');
    }

    return classes.join(' ');
  }
}
