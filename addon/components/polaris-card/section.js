import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-card/section';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisCardSection extends Component {
  /**
   * Title for the section
   *
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * A less prominent section
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  subdued = false;

  /**
   * A full-width section without any padding
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  fullWidth = false;

  /**
   * Inner content of the section
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  @computed('subdued', 'fullWidth', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-Card__Section'];
    if (this.subdued) {
      cssClasses.push('Polaris-Card__Section--subdued');
    }
    if (this.fullWidth) {
      cssClasses.push('Polaris-Card__Section--fullWidth');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }
}
