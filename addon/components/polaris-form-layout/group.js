import Component from '@ember/component';
import layout from '../../templates/components/polaris-form-layout/group';

export default Component.extend({
  classNameBindings: ['condensed:Polaris-FormLayout--condensed'],
  attributeBindings: ['role'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Elements to display inside group item
   *
   * @property text
   * @type {string}
   * @default null
   */
  text: null,

  /**
   * Condensed field group
   *
   * @property condensed
   * @type {boolean}
   * @default false
   */
  condensed: false,

  /*
   * Internal properties.
   */
   role: 'group',

   /**
    * Lifecycle hooks.
    */
   didRender() {
     this._super(...arguments);

     // Wrap each element that isn't already an item.
     this.$('div.Polaris-FormLayout__Items').children()
       .not('div.Polaris-FormLayout__Item')
       .wrap('<div class="Polaris-FormLayout__Item"></div>');
   },
});
