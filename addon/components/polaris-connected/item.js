import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import layout from '../../templates/components/polaris-connected/item';

export default Component.extend({
  classNames: ['Polaris-Connected__Item'],
  classNameBindings: [
    'focused:Polaris-Connected__Item--focused',
    'left:Polaris-Connected__Item--connection',
    'right:Polaris-Connected__Item--connection',
    'primary:Polaris-Connected__Item--primary'
  ],

  layout,

  left: equal('position', 'left').readOnly(),
  right: equal('position', 'right').readOnly(),
  primary: equal('position', 'primary').readOnly(),

  focused: false,

  focusIn() {
    this.set('focused', true);
  },

  focusOut() {
    this.set('focused', false);
  }
});
