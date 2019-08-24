import Component from '@ember/component';
import { classNames, tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-heading';

/**
 * Polaris heading component.
 * See https://polaris.shopify.com/components/titles-and-text/heading
 *
 * Default inline usage:
 *
 *   {{polaris-heading text="This is a heading"}}
 *
 * Customised block usage (note the use of tagName instead of element - this is an ember thing):
 *
 *   {{#polaris-heading tagName="em"}}
 *     This is an emphasised heading
 *   {{/polaris-heading}}
 */
@tagName('h2')
@classNames('Polaris-Heading')
@layout(template)
export default class PolarisHeadingComponent extends Component {
  /**
   * The content to display inside the heading
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
}
