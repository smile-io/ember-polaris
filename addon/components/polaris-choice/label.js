import {
  attribute,
  className,
  classNames,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-choice/label';

@tagName('label')
@classNames('Polaris-Choice')
@templateLayout(layout)
export default class Label extends Component {
  /**
   * ID of the input this label is for.
   *
   * @property inputId
   * @type {String}
   * @default: null
   * @public
   */
  @attribute('for')
  inputId = null;

  /**
   * Label content for the choice this label belongs to.
   *
   * @property label
   * @type {String|Component}
   * @default: null
   * @public
   */
  label = null;

  /**
   * Component to render for the label
   *
   * DEPRECATED: pass the component as `label` instead.
   *
   * @property labelComponent
   * @type {String | Component}
   * @default null
   * @public
   */
  labelComponent = null;

  /**
   * Flag to hide the label
   *
   * @property labelHidden
   * @type {Boolean}
   * @default: false
   * @public
   */
  @className('Polaris-Choice--labelHidden')
  labelHidden = false;

  /**
   * Whether the associated form control is disabled
   *
   * @property disabled
   * @type {Boolean}
   * @default: null
   * @public
   */
  @className('Polaris-Choice--disabled')
  disabled = null;

  'data-test-choice' = true;
}
