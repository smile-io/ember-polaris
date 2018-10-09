import Controller, { inject } from '@ember/controller';

export default Controller.extend({
  applicationController: inject('application'),

  actions: {
    toggleMagicSection() {
      this.applicationController.set(
        'hideMagicSection',
        !this.applicationController.hideMagicSection
      );
    },
  },
});
