import Component from '@glimmer/component';

/**
 * Polaris Visually hidden component.
 * See https://polaris.shopify.com/components/titles-and-text/visually-hidden
 */
export default class PolarisVisuallyHidden extends Component {
  /**
   * The content to be hidden visually
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @public
   */
  text;
}
