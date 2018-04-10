import Ember from 'ember';

export default Ember.Controller.extend({
  year: 2018,
  month: 2,
  selected: null,

  actions: {
    onMonthChange(month, year) {
      this.setProperties({
        year,
        month
      });
    },

    onChange(selected) {
      this.set('selected', selected);
    }
  }
})
