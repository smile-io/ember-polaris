import Component from '@ember/component';
import layout from '../../templates/components/polaris-page/action';
import { handleMouseUpByBlurring } from '../../utils/focus';
import mapEventToAction from '../../utils/map-event-to-action';

export default Component.extend({
  tagName: 'button',
  classNames: [ 'Polaris-Page__Action' ],
  classNameBindings: [ 'action.disabled:Polaris-Page--disabled', ],
  attributeBindings: [
    'type',
    'action.disabled:disabled',
    'action.ariaLabel:aria-label'
  ],

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

  type: 'button',

  /*
   * Action handlers.
   */
  mouseUp: handleMouseUpByBlurring,
  click: mapEventToAction('action.action'),
});
