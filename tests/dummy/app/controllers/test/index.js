import Controller from '@ember/controller';

export default Controller.extend({
  selected: false,
  selectMode: false,
  disabled: false,

  actions: {
    log(str) {
      console.log(str);
    },
  },
});
