import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-form-layout';
import AutoWrapper from '../-private/auto-wrapper';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

/**
 * Polaris form layout component.
 * See https://polaris.shopify.com/components/forms/form-layout
 *
 * @component polaris-form-layout
 */
@tagName('')
@templateLayout(layout)
export default class PolarisFormLayout extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * The content to display inside the layout
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  @action
  setupAutoWrapper(formLayoutElement) {
    this.autoWrapper = new AutoWrapper(
      formLayoutElement,
      'Polaris-FormLayout__Item',
      {
        'data-test-form-layout-item': '',
      },
      (elem) => {
        return (
          !elem.classList.contains('Polaris-FormLayout__Item') &&
          elem.getAttribute('role') !== 'group'
        );
      }
    );
  }

  @action
  teardownAutoWrapper() {
    this.autoWrapper.teardown();
  }
}
