import { computed } from '@ember/object';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import {
  attributeBindings,
  classNameBindings,
  layout as templateLayout,
} from '@ember-decorators/component';
import layout from '../../templates/components/polaris-form-layout/group';
import { idVariation, helpTextId } from '../../utils/id';
import { wrapChildren, rejectNodesByClassName } from '../../utils/dom';

@attributeBindings(
  'role',
  'titleID:aria-labelledby',
  'helpTextID:aria-describedby'
)
@classNameBindings(
  'condensed:Polaris-FormLayout--condensed:Polaris-FormLayout--grouped'
)
@templateLayout(layout)
export default class PolarisFormLayoutGroup extends Component {
  /**
   * Elements to display inside group item
   *
   * @type {string}
   * @default null
   * @public
   */
  text = null;

  /**
   * Condensed field group
   *
   * @type {boolean}
   * @default false
   * @public
   */
  condensed = false;

  /**
   * Form layout group title
   *
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * Form layout help text
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  helpText = null;

  role = 'group';
  'data-test-form-layout-group' = true;

  @(computed('elementId', 'title').readOnly())
  get titleID() {
    if (isBlank(this.title)) {
      return null;
    }

    return idVariation(this.elementId, 'Title');
  }

  @(computed('elementId', 'helpText').readOnly())
  get helpTextID() {
    if (isBlank(this.helpText)) {
      return null;
    }

    return helpTextId(this.elementId);
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
