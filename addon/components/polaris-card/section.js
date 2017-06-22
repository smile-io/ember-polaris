import Ember from 'ember';
import layout from '../../templates/components/polaris-card/section';

const {
  Component,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-Card__Section'],
  classNameBindings: [
    'subdued:Polaris-Card__Section--subdued',
  ],

  layout,

  title: null,
  subdued: false,
  text: null,
});
