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
    'action.accessibilityLabel:aria-label'
  ],

  layout,

  /**
   * The action to render. The following properties can be set:
   *  - text
   *  - icon
   *  - accessibilityLabel
   *  - disabled
   *  - onAction
   *
   * These properties are available in the React component
   * but are not yet implemented in `ember-polaris`:
   *  - url
   *  - external
   *  - disclosure
   *
   * @property action
   * @public
   * @type {Object}
   * @default null
   */
  action: null,

  type: 'button',

  /*
   * Action handlers.
   */
  mouseUp: handleMouseUpByBlurring,
  click: mapEventToAction('action.onAction'),
});
