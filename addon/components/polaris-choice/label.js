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
   * @type {String}
   * @default: null
   * @public
   */
  inputId: null,

  /**
   * Label content for the choice this label belongs to.
   *
   * @property label
   * @type {String}
   * @default: null
   * @public
   */
  label: null,

  /**
   * Component to render for the label
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
});
