import Component from '@ember/component';
import layout from '../../templates/components/polaris-layout/section';

export default Component.extend({
  classNames: ['Polaris-Layout__Section'],
  classNameBindings: [
    'secondary:Polaris-Layout__Section--secondary',
    'fullWidth:Polaris-Layout__Section--fullWidth',
    'oneHalf:Polaris-Layout__Section--oneHalf',
    'oneThird:Polaris-Layout__Section--oneThird',
  ],

  layout,

  text: null,
  secondary: false,
  fullWidth: false,
  oneHalf: false,
  oneThird: false,
});
