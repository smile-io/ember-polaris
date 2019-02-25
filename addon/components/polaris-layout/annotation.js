import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/polaris-layout/annotation';

export default Component.extend({
  classNames: ['Polaris-Layout__Annotation'],

  layout,

  /**
   * Title for the section
   *
   * @property title
   * @type {String}
   * @default null
   * @public
   */
  title: null,

  /**
   * Description for the section
   *
   * @property description
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  description: null,

  /**
   * Whether the `description` is a string
   *
   * @property hasStringDescription
   * @type {Boolean}
   * @private
   */
  hasStringDescription: computed('description', function() {
    let description = this.get('description');
    return typeof description === 'string';
  }).readOnly(),
});
