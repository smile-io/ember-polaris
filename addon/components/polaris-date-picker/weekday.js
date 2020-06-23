import Component from '@ember/component';
import {
  classNames,
  attributeBindings,
  classNameBindings,
  layout as templateLayout,
} from '@ember-decorators/component';
import layout from '../../templates/components/polaris-date-picker/weekday';

@attributeBindings('label:aria-label')
@classNames('Polaris-DatePicker__Weekday')
@classNameBindings('current:Polaris-DatePicker__Weekday--current')
@templateLayout(layout)
export default class PolarisDatePickerWeekday extends Component {
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

  'data-test-date-picker-weekday' = true;
}
