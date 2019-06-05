import {
  className,
  classNames,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { classify } from '@ember/string';
import { warn } from '@ember/debug';
import layout from '../templates/components/polaris-thumbnail';

const allowedSizes = ['small', 'medium', 'large'];
const defaultSize = 'medium';

/**
 * Polaris thumbnail component.
 * See https://polaris.shopify.com/components/images-and-icons/thumbnail
 */
@tagName('span')
@classNames('Polaris-Thumbnail')
@templateLayout(layout)
export default class PolarisThumbnail extends Component {
  /**
   * Size of thumbnail
   *
   * @public
   * @property size
   * @type {String}
   * @default: 'medium'
   */
  size = defaultSize;

  /**
   * URL for the image
   *
   * @public
   * @property source
   * @type {String}
   * @default: null
   */
  source = null;

  /**
   * Alt text for the thumbnail image
   *
   * @public
   * @property alt
   * @type {String}
   * @default: null
   */
  alt = null;

  /**
   * @private
   */
  @(computed('size').readOnly())
  @className
  get sizeClass() {
    let size = this.get('size');
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
