import Component from '@ember/component';
import layout from '../../templates/components/polaris-form-layout/group';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import { idVariation, helpTextId } from '../../utils/id';

export default Component.extend({
  attributeBindings: [
    'role',
    'titleID:aria-labelledby',
    'helpTextID:aria-describedby',
  ],

  classNameBindings: [
    'condensed:Polaris-FormLayout--condensed:Polaris-FormLayout--grouped',
  ],

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
   * Form layout group title
   *
   * @property title
   * @type {String}
   * @default null
   * @public
   */
  title: null,

  /**
   * Form layout help text
   *
   * @property helpText
   * @type {String|Component}
   * @default null
   * @public
   */
  helpText: null,

  /**
   * @private
   */
  role: 'group',

  'data-test-form-layout-group': true,

  titleID: computed('title', function() {
    if (isBlank(this.get('title'))) {
      return;
    }

    return idVariation(this.get('elementId'), 'Title');
  }).readOnly(),

  helpTextID: computed('helpText', function() {
    if (isBlank(this.get('helpText'))) {
      return;
    }

    return helpTextId(this.get('elementId'));
  }).readOnly(),

  didRender() {
    this._super(...arguments);

    // Wrap each element that isn't already an item.
    let children = this.element.querySelectorAll('.Polaris-FormLayout__Items');
    let wrapper;
    let childNode;

    for (var i = children.length - 1; i >= 0; i--) {
      childNode = children[i];

      if (!childNode.classList.contains('Polaris-FormLayout__Item')) {
        wrapper = document.createElement('div');
        wrapper.classList.add('Polaris-FormLayout__Item');
        wrapper.setAttribute('data-test-form-layout-item', true);
        childNode.parentNode.insertBefore(wrapper, childNode);
        wrapper.appendChild(childNode);
      }
    }
  },
});
