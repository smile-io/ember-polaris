import classic from 'ember-classic-decorator';
import {
  classNames,
  attributeBindings,
  classNameBindings,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/weekday';

@classic
@attributeBindings('label:aria-label')
@classNames('Polaris-DatePicker__Weekday')
@classNameBindings('current:Polaris-DatePicker__Weekday--current')
@templateLayout(layout)
export default class PolarisDatePickerWeekday extends Component {
  /**
   * @property label
   * @public
   * @type {String}
   * @default null
   */
  label = null;

  /**
   * @property title
   * @public
   * @type {String}
   * @default null
   */
  title = null;

  /**
   * @property current
   * @public
   * @type {Boolean}
   * @default false
   */
  current = false;

  'data-test-date-picker-weekday' = true;
}
