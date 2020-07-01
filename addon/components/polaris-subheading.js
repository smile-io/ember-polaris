import Component from '@ember/component';
import { action } from '@ember/object';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-subheading';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

/**
 * Polaris subheading component.
 * See https://polaris.shopify.com/components/titles-and-text/subheading
 *
 * Default inline usage:
 *
 *   {{polaris-subheading text="This is a subheading"}}
 *
 * Customised block usage (note the use of htmlTag instead of element - this is an ember thing):
 *
 *   {{#polaris-subheading htmlTag="u"}}
 *     This is an underlined subheading
 *   {{/polaris-subheading}}
 */
@tagName('')
@templateLayout(layout)
export default class PolarisSubheadingComponent extends Component.extend(
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

  init() {
    super.init(...arguments);

    deprecate(
      `[polaris-subheading] Passing 'tagName' argument is deprecated! Use '@htmlTag' instead`,
      !this.tagName,
      {
        id: 'ember-polaris.polaris-subheading.tagName-arg',
        until: '7.0.0',
      }
    );
  }

  @action
  setAriaLabel(element) {
    this.set('_subheadingElement', element);
    this.updateAriaLabel();
  }

  @action
  updateAriaLabel() {
    if (!this._subheadingElement) {
      return;
    }

    // Update ariaLabel with the new content.
    this.set('ariaLabel', this._subheadingElement.textContent.trim());
  }
}
