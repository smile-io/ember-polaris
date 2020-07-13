import Component from '@ember/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import { isBlank, isPresent } from '@ember/utils';
import { classify } from '@ember/string';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-badge';
import deprecateClassArgument from '../utils/deprecate-class-argument';

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
@deprecateClassArgument
@tagName('')
@layout(template)
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
  text = null;

  /**
   * Set the color of the badge for the given status.
   *
   * @type {String}
   * @default null
   * @public
   */
  status = null;

  /**
   * Render a pip showing the progress of a given task.
   *
   * @type {String}
   * @default null
   * @public
   */
  progress = null;

  /**
   * Medium or small size. Use `small` only in the main navigation of an app frame..
   *
   * @type {String}
   * @default 'medium'
   * @public
   */
  size = DEFAULT_SIZE;

  @notEmpty('progress')
  hasProgress;

  @notEmpty('status')
  hasStatus;

  @computed('progress')
  get progressDescription() {
    const { progress } = this;
    if (isBlank(progress) || progress === 'default') {
      return null;
    }

    return PROGRESS_LABELS[progress];
  }

  @computed('progress')
  get progressClass() {
    const { progress } = this;
    if (isBlank(progress) || progress === 'default') {
      return null;
    }

    return `Polaris-Badge--progress${classify(progress)}`;
  }

  @computed('size')
  get sizeClass() {
    const { size } = this;
    if (isPresent(size) && size !== DEFAULT_SIZE) {
      return `Polaris-Badge--size${classify(size)}`;
    }

    return null;
  }

  @computed('status')
  get statusDescription() {
    const { status } = this;
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return STATUS_LABELS[status];
  }

  @computed('status')
  get statusClass() {
    const { status } = this;
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return `Polaris-Badge--status${classify(status)}`;
  }
}
