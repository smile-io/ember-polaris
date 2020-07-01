import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-date-picker/weekday';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@templateLayout(layout)
export default class PolarisDatePickerWeekday extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * @type {String}
   * @default null
   * @public
   */
  label = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  current = false;
}
