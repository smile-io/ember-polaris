import Component from '@ember/component';
import {
  classNames,
  classNameBindings,
  layout,
} from '@ember-decorators/component';
import template from '../templates/components/polaris-button-group';
import { wrapChildren, rejectNodesByClassName } from '../utils/dom';

/**
 * Polaris button group component.
 * See https://polaris.shopify.com/components/actions/button-group
 */
@classNames('Polaris-ButtonGroup')
@classNameBindings(
  'segmented:Polaris-ButtonGroup--segmented',
  'fullWidth:Polaris-ButtonGroup--fullWidth',
  'connectedTop:Polaris-ButtonGroup--connectedTop'
)
@layout(template)
export default class PolarisButtonGroup extends Component {
  /**
   * Button components
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * Join buttons as segmented group
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  segmented = false;

  /**
   * Buttons will stretch/shrink to occupy the full width
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  fullWidth = false;

  /**
   * Remove top left and right border radius
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  connectedTop = false;

  'data-test-button-group' = true;

  didRender() {
    super.didRender(...arguments);

    // Wrap each child element that isn't already a group item.
    let nodesToWrap = rejectNodesByClassName(
      this.element.children,
      'Polaris-ButtonGroup__Item'
    );
    let wrapper = document.createElement('div');

    wrapper.classList.add('Polaris-ButtonGroup__Item');
    wrapper.setAttribute('data-test-button-group-item', true);
    wrapChildren(nodesToWrap, wrapper);
  }
}
