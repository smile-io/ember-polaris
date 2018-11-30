import Service from '@ember/service';

/**
 * Service intended to replicate the context behaviour
 * used in the React implementation of the resource
 * list component.
 */
export default Service.extend({
  /**
   * @property selectMode
   * @type {Boolean}
   * @default false
   * @public
   */
  selectMode: false,

  /**
   * @property selectable
   * @type {Boolean}
   * @default false
   * @public
   */
  selectable: false,

  /**
   * @property selectedItems
   * @type {Object[]}
   * @default null
   * @public
   */
  selectedItems: null,

  /**
   * Object with `singular` and `plural` properties.
   *
   * @property resourceName
   * @type {Object}
   * @default null
   * @public
   */
  resourceName: null,

   /**
   * @property loading
   * @type {Boolean}
   * @default false
   * @public
   */
  loading: false,

  /**
   * @property onSelectionChange
   * @type {Function}
   * @default null
   * @public
   */
  onSelectionChange: null,
});
