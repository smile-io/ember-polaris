import Component from '@ember/component';
import layout from '../../templates/components/polaris-choice/label';

export default Component.extend({
  tagName: 'label',

  attributeBindings: ['inputId:for'],

  classNames: ['Polaris-Choice'],

  classNameBindings: [
    'labelHidden:Polaris-Choice--labelHidden',
    'disabled:Polaris-Choice--disabled',
  ],

  layout,

  /**
   * ID of the input this label is for.
   *
   * @property inputId
   * @type {String}
   * @default: null
   * @public
   */
  inputId: null,

  /**
   * Label content for the choice this label belongs to.
   *
   * @property label
   * @type {String|Component}
   * @default: null
   * @public
   */
  label: null,

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
  labelComponent: null,

  /**
   * Flag to hide the label
   *
   * @property labelHidden
   * @type {Boolean}
   * @default: false
   * @public
   */
  labelHidden: false,

  /**
   * Whether the associated form control is disabled
   *
   * @property disabled
   * @type {Boolean}
   * @default: null
   * @public
   */
  disabled: null,

  'data-test-polaris-choice': true,
});
