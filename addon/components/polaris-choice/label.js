import Component from '@ember/component';
import layout from '../../templates/components/polaris-choice/label';

export default Component.extend({
  tagName: 'label',
  classNames: ['Polaris-Choice'],
  classNameBindings: ['labelHidden:Polaris-Choice--labelHidden'],
  attributeBindings: ['inputId:for'],

  layout,

  /**
   * ID of the input this label is for.
   *
   * @property inputId
   * @public
   * @type {string}
   * @default: null
   */
  inputId: null,

  /**
   * Label content for the choice this label belongs to.
   *
   * @property label
   * @public
   * @type {string}
   * @default: null
   */
  label: null,

  /**
   * Component to render for the label
   *
   * @property labelComponent
   * @public
   * @type {string | component}
   * @default null
   */
  labelComponent: null,

  /**
   * Flag to hide the label
   *
   * @property labelHidden
   * @public
   * @type {boolean}
   * @default: false
   */
  labelHidden: false,
});
