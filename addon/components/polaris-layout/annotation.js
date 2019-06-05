import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-layout/annotation';

@classNames('Polaris-Layout__Annotation')
@templateLayout(layout)
export default class Annotation extends Component {
  /**
   * Title for the section
   *
   * @property title
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * Description for the section
   *
   * @property description
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  description = null;

  /**
   * Whether the `description` is a string
   *
   * @property hasStringDescription
   * @type {Boolean}
   * @private
   */
  @(computed('description').readOnly())
  get hasStringDescription() {
    let description = this.get('description');
    return typeof description === 'string';
  }
}
