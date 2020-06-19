import Component from '@ember/component';
import { computed } from '@ember/object';
import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import layout from '../../templates/components/polaris-layout/annotation';

@classNames('Polaris-Layout__Annotation')
@templateLayout(layout)
export default class Annotation extends Component {
  /**
   * Title for the section
   *
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * Description for the section
   *
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  description = null;

  @(computed('description').readOnly())
  get hasStringDescription() {
    let description = this.get('description');
    return typeof description === 'string';
  }
}
