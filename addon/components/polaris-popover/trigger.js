import Ember from 'ember';
import layout from '../../templates/components/polaris-popover/trigger';

const {
  Component,
} = Ember;

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
});
