import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-layout/section';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@templateLayout(layout)
export default class PolarisLayoutSection extends Component.extend(
  TaglessCssDeprecation
) {
  text = null;
  secondary = false;
  fullWidth = false;
  oneHalf = false;
  oneThird = false;

  @computed('secondary', 'fullWidth', 'oneHalf', 'oneThird', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-Layout__Section'];
    if (this.secondary) {
      cssClasses.push('Polaris-Layout__Section--secondary');
    }
    if (this.fullWidth) {
      cssClasses.push('Polaris-Layout__Section--fullWidth');
    }
    if (this.oneHalf) {
      cssClasses.push('Polaris-Layout__Section--oneHalf');
    }
    if (this.oneThird) {
      cssClasses.push('Polaris-Layout__Section--oneThird');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }
}
