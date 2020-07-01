import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { classify } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-list';

const defaultListType = 'bullet';
const allowedListTypes = [defaultListType, 'number'];

@tagName('')
@templateLayout(layout)
export default class PolarisList extends Component {
  /**
   * Type of list to display
   *
   * @type {String}
   * @default 'bullet'
   * @public
   */
  type = defaultListType;

  /**
   * Flag to determine whether to render an ordered or unordered list
   * @type {boolean}
   */
  @(equal('listType', defaultListType).readOnly())
  isBulletListType;

  /**
   * Actual list type for internal use
   * @type {String}
   */
  @(computed('type').readOnly())
  get listType() {
    let { type } = this;
    if (allowedListTypes.indexOf(type) === -1) {
      type = defaultListType;
    }

    return type;
  }

  /**
   * Class for list element
   * @type {String}
   */
  @(computed('listType').readOnly())
  get listElementClass() {
    let cssClasses = ['Polaris-List'];
    let { listType } = this;
    cssClasses.push(`Polaris-List--type${classify(listType)}`);

    return cssClasses.join(' ');
  }
}
