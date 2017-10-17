import Component from '@ember/component';
import layout from '../../templates/components/polaris-choice/label';

export default Component.extend({
  tagName: 'label',
  classNames: ['Polaris-Choice'],
  classNameBindings: ['labelHidden:Polaris-Choice--labelHidden'],
  attributeBindings: ['inputId:for'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * ID of the input this label is for.
   *
   * @property inputId
   * @type {string}
   * @default: null
   */
  inputId: null,

  /**
   * Label content for the choice this label belongs to.
   *
   * @property label
   * @type {string}
   * @default: null
   */
  label: null,

  /**
   * Flag to hide the label
   *
   * @property labelHidden
   * @type {boolean}
   * @default: false
   */
  labelHidden: false,
});
