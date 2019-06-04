import { className, classNames, tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import { notEmpty } from "@ember/object/computed";
import Component from '@ember/component';
import { isBlank, isPresent } from '@ember/utils';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-badge';

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
@tagName('span')
@classNames('Polaris-Badge')
@templateLayout(layout)
export default class PolarisBadge extends Component {
  /**
   * The content to display inside the badge.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default: null
   * @public
   */
  text = null;

  /**
   * Set the color of the badge for the given status.
   *
   * @property status
   * @type {String}
   * @default: null
   * @public
   */
  status = null;

  /**
   * Render a pip showing the progress of a given task.
   *
   * @property progress
   * @type {String}
   * @default: null
   * @public
   */
  progress = null;

  /**
   * Medium or small size. Use `small` only in the main navigation of an app frame..
   *
   * @property size
   * @type {String}
   * @default: 'medium'
   * @public
   */
  size = DEFAULT_SIZE;

  /**
   * @private
   */
  @notEmpty('progress')
  hasProgress;

  /**
   * @private
   */
  @notEmpty('status')
  hasStatus;

  /**
   * @private
   */
  @(computed('progress').readOnly())
  get progressDescription() {
    const progress = this.get('progress');
    if (isBlank(progress) || progress === 'default') {
      return null;
    }

    return PROGRESS_LABELS[progress];
  }

  /**
   * @private
   */
  @(computed('progress').readOnly())
  @className
  get progressClass() {
    const progress = this.get('progress');
    if (isBlank(progress) || progress === 'default') {
      return null;
    }

    return `Polaris-Badge--progress${classify(progress)}`;
  }

  /**
   * @private
   */
  @(computed('size').readOnly())
  @className
  get sizeClass() {
    const size = this.get('size');
    if (isPresent(size) && size !== DEFAULT_SIZE) {
      return `Polaris-Badge--size${classify(size)}`;
    }

    return null;
  }

  /**
   * @private
   */
  @(computed('status').readOnly())
  get statusDescription() {
    const status = this.get('status');
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return STATUS_LABELS[status];
  }

  /**
   * @private
   */
  @(computed('status').readOnly())
  @className
  get statusClass() {
    const status = this.get('status');
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return `Polaris-Badge--status${classify(status)}`;
  }
}
