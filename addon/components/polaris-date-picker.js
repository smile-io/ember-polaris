import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/polaris-date-picker';

export default Component.extend({
  classNames: ['Polaris-DatePicker'],

  layout,

  /**
   * Accessibility labels for the next/previous month buttons.
   * @type {String}
   * @private
   */
  previousMonthLabel: computed('previousMonthName', 'showPreviousYear', function() {
    return `Show previous month, ${ this.get('previousMonthName') } ${ this.get('showPreviousYear') }`;
  }).readOnly(),

  nextMonthLabel: computed('nextMonth', 'nextYear', function() {
    return `Show next month, ${ this.get('nextMonth') } ${ this.get('nextYear') }`;
  }).readOnly(),

  /**
   * Actions.
   */
  // TODO date-picker: keyDown/keyUp aren't being fired and need implementing.
  keyDown() {
    console.log('keyDown');
  },

  keyUp() {
    console.log('keyUp');
  },

  actions: {
    handleMonthChangeClick(month, year) {
      // TODO date-picker: implement handleMonthChangeClick
    }
  }
});
