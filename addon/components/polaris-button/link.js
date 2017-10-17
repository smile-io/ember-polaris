import { computed } from '@ember/object';
import BaseComponent from './base';
import mapEventToAction from '../../utils/map-event-to-action';

export default BaseComponent.extend({
  tagName: 'a',
  attributeBindings: [
    'url:href',
    'dataPolarisUnstyled:data-polaris-unstyled',
    'target',
    'rel',
  ],

  dataPolarisUnstyled: 'true',

  target: computed('external', function() {
    return this.get('external') ? '_blank' : null;
  }),

  rel: computed('external', function() {
    return this.get('external') ? 'noopener noreferrer' : null;
  }).readOnly(),

  /**
   * Action handlers.
   */
  //  Allow click to perform its default action.
  click: mapEventToAction('onClick', { preventDefault: false }),
});
