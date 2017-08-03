import Ember from 'ember';
import layout from '../../templates/components/polaris-choice/label';

const {
  Component,
} = Ember;

export default Component.extend({
  tagName: 'label',
  classNames: ['Polaris-Choice'],
  classNameBindings: ['labelHidden:Polaris-Choice--labelHidden'],
  attributeBindings: ['id:for'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * ID of the choice this label is for.
   *
   * @property id
   * @type {string}
   * @default: null
   */
  id: null,

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
