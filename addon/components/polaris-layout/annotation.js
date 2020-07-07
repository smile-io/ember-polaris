import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-layout/annotation';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@templateLayout(layout)
export default class PolarisLayoutAnnotation extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * Title for the section
   *
   * @type {String}
   * @public
   */
  title;

  /**
   * Description for the section
   *
   * @type {String|Component|Object}
   * @public
   */
  description;

  @(computed('description').readOnly())
  get hasStringDescription() {
    return typeof this.description === 'string';
  }
}
