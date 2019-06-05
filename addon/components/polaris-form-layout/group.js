import {
  attribute,
  className,
  layout as templateLayout,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-form-layout/group';
import { isBlank } from '@ember/utils';
import { idVariation, helpTextId } from '../../utils/id';
import { wrapChildren, rejectNodesByClassName } from '../../utils/dom';

@templateLayout(layout)
export default class Group extends Component {
  /**
   * Elements to display inside group item
   *
   * @property text
   * @type {string}
   * @default null
   * @public
   */
  text = null;

  /**
   * Condensed field group
   *
   * @property condensed
   * @type {boolean}
   * @default false
   * @public
   */
  @className('Polaris-FormLayout--condensed', 'Polaris-FormLayout--grouped')
  condensed = false;

  /**
   * Form layout group title
   *
   * @property title
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * Form layout help text
   *
   * @property helpText
   * @type {String|Component}
   * @default null
   * @public
   */
  helpText = null;

  /**
   * @private
   */
  @attribute
  role = 'group';

  'data-test-form-layout-group' = true;

  @(computed('title').readOnly())
  @attribute('aria-labelledby')
  get titleID() {
    if (isBlank(this.get('title'))) {
      return null;
    }

    return idVariation(this.get('elementId'), 'Title');
  }

  @(computed('helpText').readOnly())
  @attribute('aria-describedby')
  get helpTextID() {
    if (isBlank(this.get('helpText'))) {
      return null;
    }

    return helpTextId(this.get('elementId'));
  }

  didRender() {
    super.didRender(...arguments);

    let itemsContainer = this.element.querySelector(
      '.Polaris-FormLayout__Items'
    );

    let nodesToWrap = rejectNodesByClassName(
      itemsContainer.children,
      'Polaris-FormLayout__Item'
    );
    let wrapper = document.createElement('div');

    wrapper.classList.add('Polaris-FormLayout__Item');
    wrapper.setAttribute('data-test-form-layout-item', true);
    wrapChildren(nodesToWrap, wrapper);
  }
}
