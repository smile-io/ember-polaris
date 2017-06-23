import Ember from 'ember';
import layout from '../../templates/components/polaris-breadcrumbs/breadcrumb';

const {
  computed,
  LinkComponent,
} = Ember;

const {
  collect,
} = computed;

export default LinkComponent.extend({
  classNames: ['Polaris-Breadcrumbs__Breadcrumb'],
  attributeBindings: ['dataPolarisUnstyled:data-polaris-unstyled'],

  layout,

  dataPolarisUnstyled: 'true',

  breadcrumb: null,

  params: collect('breadcrumb.route'),
});
