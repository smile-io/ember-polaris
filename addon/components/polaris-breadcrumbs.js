import Component from '@ember/component';
import { computed, get } from '@ember/object';
import layout from '../templates/components/polaris-breadcrumbs';

export default Component.extend({
  tagName: 'nav',
  attributeBindings: ['role'],

  layout,

  /**
   * Collection of breadcrumbs
   *
   * @property breadcrumbs
   * @public
   * @type {Array}
   * @default null
   */
  breadcrumbs: null,

  /**
   * Role attribute
   *
   * @property role
   * @private
   * @type {String}
   * @default 'navigation'
   */
  role: 'navigation',

  /**
   * The breadcrumb to render (the last of the list)
   * We're not always guaranteed to get an Ember array,
   * so we can't just use `breadcrumbs.lastObject` in the template.
   *
   * @property breadcrumb
   * @private
   * @type {Object}
   */
  breadcrumb: computed('breadcrumbs.[]', function() {
    let breadcrumbs = this.get('breadcrumbs') || [];
    let breadcrumbsCount = get(breadcrumbs, 'length');
    return breadcrumbsCount && breadcrumbsCount > 0 ?
      breadcrumbs[breadcrumbsCount - 1] :
      null;
  }).readOnly(),
});
