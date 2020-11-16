import Component from '@glimmer/component';
import { notEmpty } from '@ember/object/computed';
import { isBlank, isPresent } from '@ember/utils';
import { classify } from '@ember/string';
import { argWithDefault } from '../utils/decorators/arg-with-default';

const PROGRESS_LABELS = {
  incomplete: 'Incomplete',
  partiallyComplete: 'Partially complete',
  complete: 'Complete',
};

const STATUS_LABELS = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  critical: 'Critical',
  attention: 'Attention',
  new: 'New',
};

const SIZES = {
  small: 'small',
  medium: 'medium',
};

const DEFAULT_SIZE = SIZES.medium;

/**
 * Polaris badge component.
 * See https://polaris.shopify.com/components/images-and-icons/badge
 */
export default class PolarisBadge extends Component {
  /**
   * The content to display inside the badge.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   * @public
   */
  text;

  /**
   * Set the color of the badge for the given status.
   *
   * @type {String}
   * @default null
   * @public
   */
  status;

  /**
   * Render a pip showing the progress of a given task.
   *
   * @type {String}
   * @default null
   * @public
   */
  progress;

  /**
   * Medium or small size. Use `small` only in the main navigation of an app frame..
   *
   * @type {String}
   * @default null
   * @public
   */
  @argWithDefault(DEFAULT_SIZE)
  size;

  @notEmpty('progress')
  hasProgress;

  @notEmpty('status')
  hasStatus;

  get progressDescription() {
    return this.args.progress ? PROGRESS_LABELS[this.args.progress] : null;
  }

  get progressClass() {
    return this.args.progress
      ? `Polaris-Badge--progress${classify(this.args.progress)}`
      : null;
  }

  get sizeClass() {
    const size = this.args.size || this.size;
    if (isPresent(size) && size !== DEFAULT_SIZE) {
      return `Polaris-Badge--size${classify(size)}`;
    }

    return null;
  }

  get statusDescription() {
    return this.args.status ? STATUS_LABELS[this.args.status] : null;
  }

  get statusClass() {
    return this.args.status
      ? `Polaris-Badge--status${classify(this.args.status)}`
      : null;
  }
}
