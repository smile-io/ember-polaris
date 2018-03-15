import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { notEmpty } from '@ember/object/computed';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-badge';

/**
 * Polaris badge component.
 * See https://polaris.shopify.com/components/images-and-icons/badge
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Badge'],
  classNameBindings: ['statusClass', 'progressClass'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The content to display inside the badge.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {string}
   * @default: null
   */
  text: null,

  /**
   * Set the color of the badge for the given status.
   *
   * @property status
   * @type {string}
   * @default: null
   */
  status: null,

  /**
   * Render a pip showing the progress of a given task.
   *
   * @property progress
   * @type {string}
   * @default: null
   */
  progress: null,

  /*
   * Internal properties.
   */
  hasStatus: notEmpty('status'),
  hasProgress: notEmpty('progress'),

  statusDescription: computed('status', function() {
    const status = this.get('status');
    if (isBlank(status) || status === 'default') {
      return null;
    }

    return classify(status);
  }).readOnly(),

  statusClass: computed('statusDescription', function() {
    const statusDescription = this.get('statusDescription');
    if (isBlank(statusDescription)) {
      return null;
    }

    return `Polaris-Badge--status${statusDescription}`;
  }).readOnly(),

  progressDescription: computed('progress', function() {
    const progress = this.get('progress');
    if (isBlank(progress) || progress === 'default') {
      return null;
    }

    return classify(progress);
  }).readOnly(),

  progressClass: computed('progressDescription', function() {
    const progressDescription = this.get('progressDescription');
    if (isBlank(progressDescription)) {
      return null;
    }

    return `Polaris-Badge--progress${progressDescription}`;
  }).readOnly(),
});
