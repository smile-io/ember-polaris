import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/polaris-labelled';

/**
 * Internal Polaris labelled component, used to add labels to form fields.
 */
export default Component.extend({
  // Tagless component so that Ember doesn't apply the `id`
  // attribute to the component's root element.
  tagName: '',

  layout,

  /**
   * Text for the label
   *
   * @type {String}
   * @public
   */
  label: null,

  /**
   * Error to display beneath the label
   *
   * @type {String|Component}
   * @public
   */
  error: null,

  /**
   * An action
   *
   * @type {Object}
   * @public
   */
  action: null,

  /**
   * Additional hint text to display
   *
   * @type {String|Component}
   * @public
   */
  helpText: null,

  /**
   * Visually hide the label
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  labelHidden: false,

  /**
   * A unique identifier for the label
   * Note that we default this to Ember's GUID for this component instance,
   * but the value can be overridden by the outside world.
   *
   * @type {String}
   * @public
   */
  id: computed(function() {
    return guidFor(this);
  }),

  /**
   * ID for the error message div
   *
   * @type {String}
   * @private
   */
  errorId: computed('id', function() {
    return `${ this.get('id') }Error`;
  }).readOnly(),

  /**
   * ID for the help text div
   *
   * @type {String}
   * @private
   */
  helpTextId: computed('id', function() {
    return `${ this.get('id') }HelpText`;
  }).readOnly(),
});
