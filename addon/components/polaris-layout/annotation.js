import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-layout/annotation';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisLayoutAnnotation extends Component {
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
