import Ember from 'ember';
import layout from '../../templates/components/polaris-layout/section';

const {
  Component,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-Layout__Section'],
  classNameBindings: ['secondary:Polaris-Layout__Section--secondary'],

  layout,

  text: null,
  secondary: false,
});
