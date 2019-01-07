import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    change(value) {
      console.log(`${value}`);
    },
  },
});
