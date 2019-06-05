import {
  attribute,
  classNames,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/polaris-subheading';

/**
 * Polaris subheading component.
 * See https://polaris.shopify.com/components/titles-and-text/subheading
 *
 * Default inline usage:
 *
 *   {{polaris-subheading text="This is a subheading"}}
 *
 * Customised block usage (note the use of tagName instead of element - this is an ember thing):
 *
 *   {{#polaris-subheading tagName="u"}}
 *     This is an underlined subheading
 *   {{/polaris-subheading}}
 */
@tagName('h3')
@classNames('Polaris-Subheading')
@templateLayout(layout)
export default class PolarisSubheading extends Component {
  /**
   * The content to display inside the heading
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * @private
   */
  @attribute('aria-label')
  ariaLabel = null;

  didRender() {
    super.didRender(...arguments);

    // Update ariaLabel with the new content.
    this.set('ariaLabel', this.element.textContent.trim());
  }
}
