import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-list';

const allowedListTypes = [
  'bullet',
  'number'
];
const defaultListType = 'bullet';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * Type of list to display
   *
   * @property type
   * @public
   * @type {String}
   * @default 'bullet'
   */
  type: defaultListType,

  /**
   * Flag to determine whether to render an ordered or unordered list
   *
   * @property isBulletListType
   * @private
   * @type {boolean}
   */
  isBulletListType: equal('listType', 'bullet').readOnly(),

  /**
   * Actual list type for internal use
   *
   * @property listType
   * @private
   * @type {String}
   */
  listType: computed('type', function() {
    let type = this.get('type');
    if (allowedListTypes.indexOf(type) === -1) {
      type = defaultListType;
    }

    return type;
  }).readOnly(),

  /**
   * Class for list element
   *
   * @property listElementClass
   * @private
   * @type {String}
   */
  listElementClass: computed('listType', function() {
    let classNames = [
      'Polaris-List'
    ];

    let type = this.get('listType');
    classNames.push(`Polaris-List--type${ classify(type) }`);

    return classNames.join(' ');
  }).readOnly(),
});
