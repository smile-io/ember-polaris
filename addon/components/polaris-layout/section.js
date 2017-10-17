import Component from '@ember/component';
import layout from '../../templates/components/polaris-layout/section';

export default Component.extend({
  classNames: ['Polaris-Layout__Section'],
  classNameBindings: ['secondary:Polaris-Layout__Section--secondary'],

  layout,

  text: null,
  secondary: false,
});
