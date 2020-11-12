import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import { isBlank, isPresent } from '@ember/utils';
import { classify } from '@ember/string';

const PROGRESS_LABELS = {
  incomplete: 'Incomplete',
  partiallyComplete: 'Partially complete',
  complete: 'Complete',
};

const STATUS_LABELS = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
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
  size;

  @notEmpty('progress')
  hasProgress;

  @notEmpty('status')
  hasStatus;

  get progressDescription() {
    const { progress } = this.args;
    if (isBlank(progress) || progress === 'default') {
      return null;
    }

    return PROGRESS_LABELS[progress];
  }

  get progressClass() {
    const { progress } = this.args;
    if (isBlank(progress) || progress === 'default') {
      return null;
    }

    return `Polaris-Badge--progress${classify(progress)}`;
  }

  get sizeClass() {
    const { size } = this.args;
    if (isPresent(size) && size !== DEFAULT_SIZE) {
      return `Polaris-Badge--size${classify(size)}`;
    }

    return null;
  }

  get statusDescription() {
    const { status } = this.args;
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return STATUS_LABELS[status];
  }

  get statusClass() {
    const { status } = this.args;
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return `Polaris-Badge--status${classify(status)}`;
  }
}
