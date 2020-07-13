import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-choice/label';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisChoiceLabel extends Component {
  @computed('labelHidden', 'disabled', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-Choice'];
    if (this.labelHidden) {
      cssClasses.push('Polaris-Choice--labelHidden');
    }
    if (this.disabled) {
      cssClasses.push('Polaris-Choice--disabled');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }
}
