import Controller from '@ember/controller';

export default Controller.extend({
  selected: false,
  selectMode: true,
  disabled: false,

  actions: {
    log(str) {
      console.log(str);
    },
  },
});
