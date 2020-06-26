import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-visually-hidden';

/**
 * Polaris Visually hidden component.
 * See https://polaris.shopify.com/components/titles-and-text/visually-hidden
 */
@tagName('')
@layout(template)
export default class PolarisVisuallyHiddenComponent extends Component {
  /**
   * The content to be hidden visually
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {string}
   * @default: null
   * @public
   */
  text = null;
}
