import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import { warn } from '@ember/debug';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-thumbnail';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

const allowedSizes = ['small', 'medium', 'large'];
const defaultSize = 'medium';

/**
 * Polaris thumbnail component.
 * See https://polaris.shopify.com/components/images-and-icons/thumbnail
 */
@tagName('')
@layout(template)
export default class PolarisThumbnailComponent extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * Size of thumbnail
   *
   * @type {String}
   * @default 'medium'
   * @public
   */
  size = defaultSize;

  /**
   * URL for the image
   *
   * @type {String}
   * @default null
   * @public
   */
  source = null;

  /**
   * Alt text for the thumbnail image
   *
   * @type {String}
   * @default null
   * @public
   */
  alt = null;

  @computed('size')
  get sizeClass() {
    let { size } = this;
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
      warn(
        `Unsupported 'size' attribute for 'polaris-thumbnail'. Supported values: ${allowedSizes.join(
          ', '
        )}.`,
        { id: 'ember-polaris.polaris-thumbnail.unsupported-size' }
      );
    }

    return `Polaris-Thumbnail--size${classify(size)}`;
  }
}
