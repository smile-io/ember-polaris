import Component from '@ember/component';
import layout from '../../templates/components/polaris-text-field/connected';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * An element connected to the left of the yielded content
   *
   * @property left
   * @public
   * @type {String|Component}
   * @default null
   */
  left: null,

  /**
   * An element connected to the right of the yielded content
   *
   * @property right
   * @public
   * @type {String|Component}
   * @default null
   */
  right: null,
});
