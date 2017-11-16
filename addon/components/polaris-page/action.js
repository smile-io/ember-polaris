import Component from '@ember/component';
import layout from '../../templates/components/polaris-page/action';
import { handleMouseUpByBlurring } from '../../utils/focus';
import mapEventToAction from '../../utils/map-event-to-action';

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
  mouseUp: handleMouseUpByBlurring,
  click: mapEventToAction('action.action'),
});
