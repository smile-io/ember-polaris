import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank, isPresent } from '@ember/utils';
import { notEmpty } from '@ember/object/computed';
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
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Badge'],
  classNameBindings: ['statusClass', 'progressClass', 'sizeClass'],

  layout,

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
  text: null,

  /**
   * Set the color of the badge for the given status.
   *
   * @property status
   * @type {String}
   * @default: null
   * @public
   */
  status: null,

  /**
   * Render a pip showing the progress of a given task.
   *
   * @property progress
   * @type {String}
   * @default: null
   * @public
   */
  progress: null,

  /**
   * Medium or small size. Use `small` only in the main navigation of an app frame..
   *
   * @property size
   * @type {String}
   * @default: 'medium'
   * @public
   */
  size: DEFAULT_SIZE,

  /**
   * @private
   */
  hasProgress: notEmpty('progress'),

  /**
   * @private
   */
  hasStatus: notEmpty('status'),

  /**
   * @private
   */
  progressDescription: computed('progress', function() {
    const progress = this.get('progress');
    if (isBlank(progress) || progress === 'default') {
      return null;
    }

    return PROGRESS_LABELS[progress];
  }).readOnly(),

  /**
   * @private
   */
  progressClass: computed('progress', function() {
    const progress = this.get('progress');
    if (isBlank(progress) || progress === 'default') {
      return null;
    }

    return `Polaris-Badge--progress${classify(progress)}`;
  }).readOnly(),

  /**
   * @private
   */
  sizeClass: computed('size', function() {
    const size = this.get('size');
    if (isPresent(size) && size !== DEFAULT_SIZE) {
      return `Polaris-Badge--size${classify(size)}`;
    }

    return null;
  }).readOnly(),

  /**
   * @private
   */
  statusDescription: computed('status', function() {
    const status = this.get('status');
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return STATUS_LABELS[status];
  }).readOnly(),

  /**
   * @private
   */
  statusClass: computed('status', function() {
    const status = this.get('status');
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return `Polaris-Badge--status${classify(status)}`;
  }).readOnly(),
});
