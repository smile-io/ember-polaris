import Ember from 'ember';
import layout from '../templates/components/polaris-page';

const {
  Component,
  computed,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-Page'],
  layout,

  hasActions: computed.or('primaryAction', 'secondaryActions'),
});
