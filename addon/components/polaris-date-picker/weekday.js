import {
  attribute,
  className,
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-date-picker/weekday';

@classNames('Polaris-DatePicker__Weekday')
@templateLayout(layout)
export default class Weekday extends Component {
  /**
   * @property label
   * @public
   * @type {String}
   * @default null
   */
  @attribute('aria-label')
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
  @className('Polaris-DatePicker__Weekday--current')
  current = false;

  'data-test-date-picker-weekday' = true;
}
