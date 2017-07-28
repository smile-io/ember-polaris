import Ember from 'ember';
import layout from '../../templates/components/polaris-page/action';
import mapEventToAction from '../../utils/map-event-to-action';

const {
  Component,
} = Ember;

export default Component.extend({
  tagName: 'button',
  classNames: ['Polaris-Page__Action'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The action to render
   *
   * @property action
   * @type {Object}
   * @default null
   */
  action: null,

  /*
   * Action handlers.
   */
  click: mapEventToAction('action.action'),
});
