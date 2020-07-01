import Component from '@ember/component';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-heading';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

/**
 * Polaris heading component.
 * See https://polaris.shopify.com/components/titles-and-text/heading
 *
 * Default inline usage:
 *
 *   {{polaris-heading text="This is a heading"}}
 *
 * Customised block usage (note the use of htmlTag instead of element - this is an ember thing):
 *
 *   {{#polaris-heading htmlTag="em"}}
 *     This is an emphasised heading
 *   {{/polaris-heading}}
 */
@tagName('')
@layout(template)
export default class PolarisHeadingComponent extends Component.extend(
  TaglessCssDeprecation
) {
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

  /**
   * Name of element to use for text
   * NOTE: Matches polaris-react's `element`
   *
   * @type {String}
   * @default h2
   * @public
   */
  htmlTag = 'h2';

  init() {
    super.init(...arguments);

    deprecate(
      `[polaris-heading] Passing 'tagName' argument is deprecated! Use '@htmlTag' instead`,
      !this.tagName,
      {
        id: 'ember-polaris.polaris-heading.tagName-arg',
        until: '7.0.0',
      }
    );
  }
}
