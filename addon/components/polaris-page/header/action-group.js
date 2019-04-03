import Component from '@ember/component';
import layout from '../../../templates/components/polaris-page/header/action-group';

export default Component.extend({
  classNames: ['Polaris-Header-ActionGroup'],

  layout,

  title: null,
  icon: null,
  groupActions: null,
  details: null,
});
