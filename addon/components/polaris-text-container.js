import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-text-container';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

const allowedSpacings = ['tight', 'loose'];

/**
 * Undocumented Polaris text container component.
 */
@tagName('')
@templateLayout(layout)
export default class PolarisTextContainer extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * The text to display.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @public
   */
  text;

  /**
   * The amount of vertical spacing children will get between them.
   *
   * @type {String}
   * @public
   */
  spacing;

  @computed('spacing')
  get spacingClass() {
    if (allowedSpacings.indexOf(this.spacing) > -1) {
      return `Polaris-TextContainer--spacing${classify(this.spacing)}`;
    }

    return null;
  }
}
