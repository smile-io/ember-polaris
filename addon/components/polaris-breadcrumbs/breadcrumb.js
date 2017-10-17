import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import LinkComponent from '@ember/routing/link-component';
import layout from '../../templates/components/polaris-breadcrumbs/breadcrumb';

export default LinkComponent.extend({
  classNames: ['Polaris-Breadcrumbs__Breadcrumb'],
  attributeBindings: ['dataPolarisUnstyled:data-polaris-unstyled'],

  layout,

  dataPolarisUnstyled: 'true',

  breadcrumb: null,

  params: computed('breadcrumb.{content,route,models.@each.id}', function() {
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
