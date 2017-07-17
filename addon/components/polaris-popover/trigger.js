import Ember from 'ember';
import layout from '../../templates/components/polaris-popover/trigger';

const {
  Component,
  computed,
  String: EmberString,
} = Ember;

const {
  htmlSafe,
} = EmberString;

export default Component.extend({
  tagName: '',

  layout,

  /*
   * Public attributes.
   */
  /**
   * Trigger component.
   *
   * @property triggerComponent
   * @type {component}
   * @default: null
   */
  triggerComponent: null,

  /*
   * Internal properties.
   */
  triggerStyle: computed(function() {
    return htmlSafe(`
      display: inline-block;
      overflow: inherit;
      border: none;
    `);
  }).readOnly(),
});
