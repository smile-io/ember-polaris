import Component from '@ember/component';
import layout from '../../templates/components/polaris-text-field/spinner';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * Called when the up/down icons are clicked
   *
   * @property onChange
   * @public
   * @type {Function}
   * @default noop
   */
  onChange(/* number */) {},

  /**
   * Additional callback when any icon in the component is clicked
   *
   * @property onClick
   * @public
   * @type {Function}
   * @default noop
   */
  onClick() {},

  onMouseDown(/* onChange */) {},

  onMouseUp() {},

  actions: {
    handleMouseDown(onChange, event) {
      if (event.button !== 0) {
        return;
      }
      this.onMouseDown(onChange);
    },
  },
});
