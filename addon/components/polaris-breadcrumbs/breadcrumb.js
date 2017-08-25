import Ember from 'ember';
import layout from '../../templates/components/polaris-breadcrumbs/breadcrumb';

const {
  computed,
  isArray,
  LinkComponent,
} = Ember;

export default LinkComponent.extend({
  classNames: ['Polaris-Breadcrumbs__Breadcrumb'],
  attributeBindings: ['dataPolarisUnstyled:data-polaris-unstyled'],

  layout,

  dataPolarisUnstyled: 'true',

  breadcrumb: null,

  params: computed('breadcrumb.{content,route,@each}', function() {
    // Because we extend LinkComponent and don't yield, hasBlock is false
    // so LinkComponent expects the link title as the first parameter.
    let { content, route, models = [] } = this.get('breadcrumb');

    let params = [ content, route ];
    if (isArray(models)) {
      params.push(...models);
    } else {
      params.push(models);
    }

    return params;
  }).readOnly(),
});
