import Component from '@ember/component';
import layout from '../../templates/components/polaris-form-layout/group';

export default Component.extend({
  attributeBindings: ['role'],

  classNameBindings: ['condensed:Polaris-FormLayout--condensed'],

  layout,

  /**
   * Elements to display inside group item
   *
   * @property text
   * @type {string}
   * @default null
   * @public
   */
  text: null,

  /**
   * Condensed field group
   *
   * @property condensed
   * @type {boolean}
   * @default false
   * @public
   */
  condensed: false,

  /**
   * @private
   */
  role: 'group',

  didRender() {
    this._super(...arguments);

    // Wrap each element that isn't already an item.
    this.$('div.Polaris-FormLayout__Items')
      .children()
      .not('div.Polaris-FormLayout__Item')
      .wrap('<div class="Polaris-FormLayout__Item"></div>');
  },
});
