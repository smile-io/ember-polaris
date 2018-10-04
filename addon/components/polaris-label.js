import Component from '@ember/component';
import { computedLabelId } from '@smile-io/ember-polaris/utils/id';
import layout from '../templates/components/polaris-label';

/**
 * Internal Polaris label component.
 */
export default Component.extend({
  // Tagless component so that Ember doesn't apply the `id`
  // attribute to the component's root element.
  tagName: '',

  layout,

  /**
   * A unique identifier for the label
   *
   * @type {String}
   * @public
   */
  id: null,

  /**
   * Label content
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String|Component}
   * @public
   */
  text: null,

  /**
   * Visually hide the label
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  hidden: false,

  /**
   * ID for the label element
   *
   * @type {String}
   * @private
   */
  labelId: computedLabelId('id').readOnly(),
});
