import Component from '@ember/component';
import layout from '../../../templates/components/polaris-page/header/action-group';

export default Component.extend({
  classNames: ['Polaris-Page-Header__ActionGroup'],

  layout,

  title: null,
  icon: null,
  actions: null,
  details: null,
});
