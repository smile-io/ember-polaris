import Ember from 'ember';
import layout from '../../templates/components/polaris-breadcrumbs/breadcrumb';

const {
  computed,
  LinkComponent,
} = Ember;

export default LinkComponent.extend({
  classNames: ['Polaris-Breadcrumbs__Breadcrumb'],
  attributeBindings: ['dataPolarisUnstyled:data-polaris-unstyled'],

  layout,

  dataPolarisUnstyled: 'true',

  breadcrumb: null,

  params: computed('breadcrumb.route', function() {
    return [
      this.get('breadcrumb.route'),
    ];
  }).readOnly(),
});
